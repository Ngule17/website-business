/* agent.js — the autonomous agent runtime.

   Given a mission (an agent + a goal), the agent works on its own: it reasons,
   decides which tools to call, executes them (real side effects via tools.js),
   observes the results, and repeats until it calls finish or hits a step cap.

   Two execution paths, same tool contract:
     • Live  — when an Anthropic API key is set, runs a real Claude tool-use loop.
     • Demo  — with no key, a role-aware simulator drives the same tools so the
               autonomy (decisions + actions + logged reasoning) is fully visible. */
(function () {
  "use strict";

  const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
  const MAX_STEPS = 10;
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  function systemPrompt(agent) {
    return (
      agent.systemPrompt +
      "\n\nYou are now operating AUTONOMOUSLY and unattended. You have tools to take real actions. " +
      "Work toward the goal step by step. Use log_decision to make your key choices transparent before acting, " +
      "then take concrete actions with your tools. Do NOT ask the user questions — if something genuinely requires " +
      "human judgment or authority, call escalate_to_human with a specific question and keep going where you can. " +
      "When the goal is achieved (or no further autonomous action is appropriate), call finish. Be decisive and concise."
    );
  }

  /* ---------------- Live path: Claude tool-use loop ---------------- */
  async function runLive(agent, goal, ctx, step, settings) {
    const messages = [{ role: "user", content: "Goal: " + goal }];

    for (let i = 0; i < MAX_STEPS; i++) {
      const res = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": settings.apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: settings.model || "claude-sonnet-5",
          max_tokens: 1024,
          system: systemPrompt(agent),
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

      // Surface the agent's reasoning.
      blocks.filter((b) => b.type === "text" && b.text.trim())
        .forEach((b) => step({ kind: "reason", text: b.text.trim() }));

      const toolUses = blocks.filter((b) => b.type === "tool_use");
      if (toolUses.length === 0) {
        // Model responded with prose and no action — treat as completion.
        const text = blocks.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
        return { outcome: "completed", summary: text || "Done." };
      }

      messages.push({ role: "assistant", content: blocks });
      const toolResults = [];
      let finished = null;

      for (const tu of toolUses) {
        let result, isError = false;
        try {
          result = await Tools.execute(tu.name, tu.input, ctx);
        } catch (err) {
          result = "Error: " + (err && err.message ? err.message : String(err));
          isError = true;
        }
        if (tu.name === "log_decision") {
          step({ kind: "decision", text: (tu.input.decision || "") + (tu.input.rationale ? " — " + tu.input.rationale : "") });
        } else {
          step({ kind: "action", tool: tu.name, input: tu.input, result: result, status: isError ? "error" : "done" });
        }
        if (tu.name === "finish" && !isError) finished = { outcome: tu.input.outcome || "completed", summary: tu.input.summary || "" };
        toolResults.push({ type: "tool_result", tool_use_id: tu.id, content: result, is_error: isError });
        await delay(150);
      }

      messages.push({ role: "user", content: toolResults });
      if (finished) return finished;
    }
    return { outcome: "partial", summary: "Reached the step limit before finishing." };
  }

  /* ---------------- Demo path: role-aware simulator ---------------- */
  function planFor(agent, goal) {
    const g = goal.trim();
    const dept = agent.department;
    const plans = {
      Sales: [
        { decision: ["Prioritize outreach for this goal", "A personalized first touch converts better than a generic blast."] },
        { tool: "research", input: { subject: g, focus: "buying signals and best angle" } },
        { tool: "send_email", input: { to: "prospect", subject: "Quick idea for your team", body: "Hi there,\n\nRe: " + g + " — I put together a short idea on how we could help. Worth a 15-min chat this week?\n\nBest,\n" + agent.name } },
        { tool: "add_lead", input: { name: "New prospect", company: "Acme Co", note: "Opened by mission: " + g, status: "contacted" } },
        { tool: "create_task", input: { title: "Follow up in 3 days if no reply", priority: "high" } }
      ],
      Support: [
        { decision: ["Resolve the customer issue directly", "Fast, empathetic resolution protects the relationship."] },
        { tool: "send_email", input: { to: "customer", subject: "Re: your request", body: "Hi,\n\nThanks for flagging this. Here's what I've done about \"" + g + "\" and the next step on our side.\n\n— " + agent.name } },
        { tool: "create_task", input: { title: "Root-cause: " + g, priority: "medium" } },
        { decision: ["Check if this needs a policy exception", "Refunds beyond policy require a human sign-off."] },
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
        { tool: "create_task", input: { title: "Pull data & analyze: " + g, priority: "high" } },
        { tool: "escalate_to_human", input: { reason: "Data access needed", question: "Grant read access to the analytics warehouse?" } }
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
        { tool: "add_lead", input: { name: "Candidate", company: "current employer", note: "Sourced for: " + g, status: "contacted" } },
        { tool: "create_task", input: { title: "Schedule screening call", priority: "medium" } }
      ]
    };
    const steps = (plans[dept] || plans.Operations).slice();
    steps.push({ tool: "finish", input: { summary: agent.name + " worked the goal autonomously: took the actions above and queued follow-ups. (Demo mode — add an API key for live reasoning.)", outcome: dept === "Support" || dept === "Operations" ? "partial" : "completed" } });
    return steps;
  }

  async function runDemo(agent, goal, ctx, step) {
    step({ kind: "reason", text: `Understood the goal. I'll work it autonomously as ${agent.name}, your ${agent.role}, and log each decision.` });
    await delay(500);

    const steps = planFor(agent, goal);
    let finished = { outcome: "completed", summary: "Done." };

    for (const s of steps) {
      await delay(650);
      if (s.decision) {
        step({ kind: "decision", text: s.decision[0] + " — " + s.decision[1] });
        continue;
      }
      let result, isError = false;
      try {
        result = await Tools.execute(s.tool, s.input, ctx);
      } catch (err) {
        result = "Error: " + (err && err.message ? err.message : String(err));
        isError = true;
      }
      step({ kind: "action", tool: s.tool, input: s.input, result: result, status: isError ? "error" : "done" });
      if (s.tool === "finish") finished = { outcome: s.input.outcome || "completed", summary: s.input.summary };
    }
    return finished;
  }

  /* ---------------- Public API ---------------- */
  const Agent = {
    /** Run a mission autonomously. onStep receives each log entry live. */
    async run(mission, agent, onStep) {
      const settings = Store.get().settings;
      const ctx = { agentId: agent.id, missionId: mission.id, agent: agent };
      const step = (entry) => {
        entry.ts = Date.now();
        Store.appendMissionLog(mission.id, entry);
        if (onStep) onStep(entry);
      };

      Store.updateMission(mission.id, { status: "running" });
      step({ kind: "status", text: settings.apiKey ? "Agent started (live)." : "Agent started (demo mode)." });

      try {
        const outcome = settings.apiKey
          ? await runLive(agent, mission.goal, ctx, step, settings)
          : await runDemo(agent, mission.goal, ctx, step);
        step({ kind: "finish", text: outcome.summary, outcome: outcome.outcome });
        Store.updateMission(mission.id, { status: "done", finishedAt: Date.now(), result: outcome });
        return outcome;
      } catch (err) {
        const msg = (err && err.message) ? err.message : String(err);
        step({ kind: "error", text: msg });
        Store.updateMission(mission.id, { status: "failed", finishedAt: Date.now(), result: { outcome: "blocked", summary: msg } });
        throw err;
      }
    }
  };

  window.Agent = Agent;
})();
