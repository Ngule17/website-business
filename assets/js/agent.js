/* agent.js — the autonomous agent runtime, with team collaboration.

   Given a mission (an agent + a goal), the agent works on its own: it reasons,
   decides which tools to call, executes them, observes results, and repeats
   until it finishes. Agents can also DELEGATE a sub-task to a teammate — the
   teammate runs its own sub-mission and reports back — so a manager agent can
   coordinate a whole team.

   Two execution paths, same tool contract:
     • Live  — when an Anthropic API key is set, a real Claude tool-use loop.
     • Demo  — with no key, a role-aware simulator that drives the same tools
               (including delegation) so collaboration is fully visible. */
(function () {
  "use strict";

  const byId = (id) => Store.agentById(id); // built-in + custom agents
  const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
  const MAX_STEPS = 10;
  const MAX_DEPTH = 2; // how deep delegation can nest
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  function roster(agent, ctx) {
    return ctx.hired.filter((a) => a.id !== agent.id && !a.manager);
  }

  function systemPrompt(agent, mates) {
    const mem = Store.get().settings.teamMemory;
    const preamble = mem && mem.trim() ? "Company context (shared across the whole team):\n" + mem.trim() + "\n\n" : "";
    let s =
      preamble + agent.systemPrompt +
      "\n\nYou are operating AUTONOMOUSLY and unattended. You have tools to take real actions. " +
      "Work toward the goal step by step. Use log_decision to make key choices transparent, then act. " +
      "Do NOT ask the user questions — if something needs human judgment or authority, call escalate_to_human " +
      "and keep going where you can. When done, call finish. Be decisive and concise.";
    if (mates.length) {
      s += "\n\nYour teammates — delegate a sub-task to one with delegate_to using their exact id:\n" +
        mates.map((a) => `- ${a.id} — ${a.name}, ${a.role} (${a.industry})`).join("\n");
    } else {
      s += "\n\nYou have no teammates available to delegate to; do the work yourself.";
    }
    return s;
  }

  /* ---------------- Live path: Claude tool-use loop ---------------- */
  async function runLive(agent, goal, ctx, step, depth) {
    const mates = roster(agent, ctx);
    const messages = [{ role: "user", content: "Goal: " + goal }];

    for (let i = 0; i < MAX_STEPS; i++) {
      const res = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": ctx.settings.apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: ctx.settings.model || "claude-sonnet-5",
          max_tokens: 1024,
          system: systemPrompt(agent, mates),
          tools: Tools.specs(),
          messages: messages
        })
      });
      if (!res.ok) {
        let d = "HTTP " + res.status;
        try { const e = await res.json(); d = (e.error && e.error.message) || d; } catch (x) {}
        throw new Error(d);
      }

      const data = await res.json();
      const blocks = data.content || [];
      blocks.filter((b) => b.type === "text" && b.text.trim())
        .forEach((b) => step({ kind: "reason", text: b.text.trim() }));

      const toolUses = blocks.filter((b) => b.type === "tool_use");
      if (toolUses.length === 0) {
        const text = blocks.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
        return { outcome: "completed", summary: text || "Done." };
      }

      messages.push({ role: "assistant", content: blocks });
      const toolResults = [];
      let finished = null;

      for (const tu of toolUses) {
        if (tu.name === "delegate_to") {
          const result = await ctx.delegate(agent, tu.input.agent_id, tu.input.task, depth);
          toolResults.push({ type: "tool_result", tool_use_id: tu.id, content: result });
          continue;
        }
        if (tu.name === "finish") {
          finished = { outcome: tu.input.outcome || "completed", summary: tu.input.summary || "" };
          toolResults.push({ type: "tool_result", tool_use_id: tu.id, content: "Mission finished." });
          continue;
        }
        if (tu.name === "log_decision") {
          step({ kind: "decision", text: (tu.input.decision || "") + (tu.input.rationale ? " — " + tu.input.rationale : "") });
          toolResults.push({ type: "tool_result", tool_use_id: tu.id, content: "Decision logged." });
          continue;
        }
        let result, isError = false;
        try {
          result = await Tools.execute(tu.name, tu.input, { agentId: agent.id, missionId: ctx.missionId });
        } catch (err) {
          result = "Error: " + (err && err.message ? err.message : String(err));
          isError = true;
        }
        step({ kind: "action", tool: tu.name, input: tu.input, result: result, status: isError ? "error" : "done" });
        toolResults.push({ type: "tool_result", tool_use_id: tu.id, content: result, is_error: isError });
        await delay(120);
      }

      messages.push({ role: "user", content: toolResults });
      if (finished) return finished;
    }
    return { outcome: "partial", summary: "Reached the step limit before finishing." };
  }

  /* ---------------- Demo path: role-aware simulator ---------------- */
  function subGoalFor(mate, goal) {
    const map = {
      Sales: "Own outreach and pipeline for: ",
      Support: "Prepare customer support and comms for: ",
      Marketing: "Create the marketing and content for: ",
      Operations: "Handle the analysis and operations for: ",
      Engineering: "Scope and plan the technical work for: ",
      People: "Handle the hiring/people needs for: "
    };
    return (map[mate.department] || "Handle your part of: ") + goal;
  }

  function planFor(agent, goal, ctx) {
    const g = goal.trim();

    // Manager: decompose and delegate to teammates.
    if (agent.manager) {
      const mates = roster(agent, ctx);
      const steps = [{ decision: ["Break the goal into workstreams and assign each to a specialist", "Delegating to the right expert beats doing everything myself."] }];
      if (mates.length === 0) {
        steps.push({ tool: "create_task", input: { title: "Hire specialists so I can delegate: " + g, priority: "high" } });
        steps.push({ tool: "finish", input: { summary: "No specialists are on the team yet. Hire a few teammates and re-run this goal to watch me delegate.", outcome: "blocked" } });
        return steps;
      }
      const chosen = mates.slice(0, 3);
      chosen.forEach((mate) => steps.push({ delegate: { agentId: mate.id, task: subGoalFor(mate, g) } }));
      steps.push({ tool: "finish", input: { summary: "Coordinated the team on \"" + g + "\": delegated " + chosen.length + " workstream" + (chosen.length > 1 ? "s" : "") + " to " + chosen.map((m) => m.name).join(", ") + ", then synthesized their results. (Demo mode — add an API key for live reasoning.)", outcome: "completed" } });
      return steps;
    }

    const plans = {
      Sales: [
        { decision: ["Prioritize outreach for this goal", "A personalized first touch converts better than a generic blast."] },
        { tool: "research", input: { subject: g, focus: "buying signals and best angle" } },
        { tool: "send_email", input: { to: "prospect", subject: "Quick idea for your team", body: "Hi there,\n\nRe: " + g + " — a short idea on how we could help. Worth a 15-min chat this week?\n\nBest,\n" + agent.name } },
        { tool: "add_lead", input: { name: "New prospect", company: "Acme Co", note: "Opened by: " + g, status: "contacted" } },
        { tool: "create_task", input: { title: "Follow up in 3 days if no reply", priority: "high" } }
      ],
      Support: [
        { decision: ["Resolve the customer issue directly", "Fast, empathetic resolution protects the relationship."] },
        { tool: "send_email", input: { to: "customer", subject: "Re: your request", body: "Hi,\n\nThanks for flagging this. Here's what I've done about \"" + g + "\" and the next step on our side.\n\n— " + agent.name } },
        { tool: "create_task", input: { title: "Root-cause: " + g, priority: "medium" } },
        { decision: ["Check if this needs a policy exception", "Goodwill credits beyond policy need a human sign-off."] },
        { tool: "escalate_to_human", input: { reason: "Possible policy exception", question: "Approve a goodwill credit for this customer?" } }
      ],
      Marketing: [
        { decision: ["Plan content around the goal", "Clear audience + hook first, draft second."] },
        { tool: "research", input: { subject: g, focus: "audience and hook" } },
        { tool: "create_task", input: { title: "Draft: " + g, priority: "high" } },
        { tool: "create_task", input: { title: "Schedule + repurpose to social", priority: "low" } }
      ],
      Operations: [
        { decision: ["Define the exact question before touching data", "Avoids answering the wrong thing."] },
        { tool: "research", input: { subject: g, focus: "which metric answers this" } },
        { tool: "create_task", input: { title: "Pull data & analyze: " + g, priority: "high" } }
      ],
      Engineering: [
        { decision: ["Reproduce before fixing", "A fix without a repro is a guess."] },
        { tool: "create_task", input: { title: "Reproduce: " + g, priority: "high" } },
        { tool: "create_task", input: { title: "Write test + fix for: " + g, priority: "high" } }
      ],
      People: [
        { decision: ["Source and warm up candidates for this goal", "Personalized outreach beats a job-board blast."] },
        { tool: "research", input: { subject: g, focus: "ideal candidate profile" } },
        { tool: "send_email", input: { to: "candidate", subject: "Opportunity that fits your background", body: "Hi,\n\nRe: " + g + " — your experience stood out. Open to a quick intro call?\n\n— " + agent.name } },
        { tool: "create_task", input: { title: "Schedule screening call", priority: "medium" } }
      ]
    };
    const steps = (plans[agent.department] || plans.Operations).slice();
    steps.push({ tool: "finish", input: { summary: agent.name + " worked the goal autonomously and queued follow-ups. (Demo mode — add an API key for live reasoning.)", outcome: agent.department === "Support" || agent.department === "Operations" ? "partial" : "completed" } });
    return steps;
  }

  async function runDemo(agent, goal, ctx, step, depth) {
    step({ kind: "reason", text: `${agent.name} here (${agent.role}). Working the goal autonomously and logging each decision.` });
    await delay(depth ? 250 : 450);

    const steps = planFor(agent, goal, ctx);
    let finished = { outcome: "completed", summary: "Done." };

    for (const s of steps) {
      await delay(depth ? 350 : 600);
      if (s.decision) {
        step({ kind: "decision", text: s.decision[0] + " — " + s.decision[1] });
        continue;
      }
      if (s.delegate) {
        await ctx.delegate(agent, s.delegate.agentId, s.delegate.task, depth);
        continue;
      }
      if (s.tool === "finish") {
        finished = { outcome: s.input.outcome || "completed", summary: s.input.summary };
        continue;
      }
      let result, isError = false;
      try {
        result = await Tools.execute(s.tool, s.input, { agentId: agent.id, missionId: ctx.missionId });
      } catch (err) {
        result = "Error: " + (err && err.message ? err.message : String(err));
        isError = true;
      }
      step({ kind: "action", tool: s.tool, input: s.input, result: result, status: isError ? "error" : "done" });
    }
    return finished;
  }

  function runAgentLoop(agent, goal, ctx, step, depth) {
    return ctx.settings.apiKey ? runLive(agent, goal, ctx, step, depth) : runDemo(agent, goal, ctx, step, depth);
  }

  /* ---------------- Public API ---------------- */
  const Agent = {
    /** Run a mission autonomously. onStep receives each log entry live. */
    async run(mission, agent, onStep) {
      const settings = Store.get().settings;
      const hired = Store.get().hired.map(byId).filter(Boolean);

      const baseStep = (entry) => {
        entry.ts = Date.now();
        Store.appendMissionLog(mission.id, entry);
        if (onStep) onStep(entry);
      };
      // Bind each log entry to the agent that produced it and its nesting depth.
      const mkStep = (actor, depth) => (entry) => {
        entry.agentId = actor.id; entry.agentName = actor.name;
        entry.avatar = actor.avatar; entry.accent = actor.accent; entry.depth = depth || 0;
        baseStep(entry);
      };

      const ctx = {
        missionId: mission.id, settings: settings, hired: hired,
        // Delegation: spawn and run a teammate's sub-mission, streaming its
        // steps into the same log, and return its result to the delegator.
        async delegate(fromAgent, targetId, subGoal, depth) {
          const fromStep = mkStep(fromAgent, depth);
          const target = byId(targetId);
          if (!target) { const m = `Can't delegate: no teammate with id "${targetId}".`; fromStep({ kind: "error", text: m }); return m; }
          if (target.id === fromAgent.id) { const m = "Can't delegate to yourself."; fromStep({ kind: "error", text: m }); return m; }
          if (!Store.isHired(target.id)) { const m = `Can't delegate: ${target.name} isn't on the team.`; fromStep({ kind: "error", text: m }); return m; }
          if (depth >= MAX_DEPTH) { const m = "Delegation depth limit reached; handling directly."; fromStep({ kind: "error", text: m }); return m; }

          fromStep({ kind: "delegate", text: subGoal, toId: target.id, toName: target.name, toAvatar: target.avatar });
          const subStep = mkStep(target, depth + 1);
          const outcome = await runAgentLoop(target, subGoal, ctx, subStep, depth + 1);
          fromStep({ kind: "delegate_return", text: outcome.summary, toName: target.name, outcome: outcome.outcome });
          return `${target.name} completed the sub-task (${outcome.outcome}): ${outcome.summary}`;
        }
      };

      Store.updateMission(mission.id, { status: "running" });
      const rootStep = mkStep(agent, 0);
      rootStep({ kind: "status", text: settings.apiKey ? "Agent started (live)." : "Agent started (demo mode)." });

      try {
        const outcome = await runAgentLoop(agent, mission.goal, ctx, rootStep, 0);
        rootStep({ kind: "finish", text: outcome.summary, outcome: outcome.outcome });
        Store.updateMission(mission.id, { status: "done", finishedAt: Date.now(), result: outcome });
        return outcome;
      } catch (err) {
        const msg = (err && err.message) ? err.message : String(err);
        rootStep({ kind: "error", text: msg });
        Store.updateMission(mission.id, { status: "failed", finishedAt: Date.now(), result: { outcome: "blocked", summary: msg } });
        throw err;
      }
    }
  };

  window.Agent = Agent;
})();
