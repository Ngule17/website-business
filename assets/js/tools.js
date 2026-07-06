/* tools.js — the actions an autonomous agent can take.

   Each tool exposes an Anthropic tool-use spec (name, description, input_schema)
   AND an `execute(input, ctx)` implementation. Execution goes through a
   pluggable adapter keyed by the app's executionMode:

     • "simulate" — safe, in-app side effects (Outbox, CRM, Tasks, Escalations).
                    Nothing leaves the browser. This is what runs today.
     • "real"     — a seam for real integrations (Gmail, Slack, a CRM API…).
                    Drop an implementation into REAL_ADAPTERS[name] to go live;
                    the agent loop needs zero changes.

   The tool contract is identical in both modes, so an agent written against
   these tools works the same whether it's simulating or acting for real. */
(function () {
  "use strict";

  // ---- REAL integration seam ----------------------------------------------
  // Populate a function here (e.g. REAL_ADAPTERS.send_email = async (i)=>{...})
  // for a custom per-tool integration. The simplest path, though, is to set a
  // Webhook URL in Settings: in "real" mode every action is POSTed there
  // (tool, input, agent, mission) so you can wire it to Zapier/Make/n8n/your API.
  const REAL_ADAPTERS = {};

  // Actions that touch the outside world are gated behind approval when the
  // "Require approval" setting is on.
  const GATED = { send_email: true, add_lead: true };

  async function runReal(name, input, ctx) {
    const settings = Store.get().settings;
    const url = settings.webhookUrl && settings.webhookUrl.trim();
    if (url) {
      // Fire-and-forget: text/plain + no-cors is a "simple request" (no CORS
      // preflight), which is how browsers post to Zapier/Make/n8n webhooks.
      // The response is opaque, so success = the request left the browser.
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "content-type": "text/plain;charset=UTF-8" },
        body: JSON.stringify({ tool: name, input: input, agentId: ctx && ctx.agentId, missionId: ctx && ctx.missionId, ts: Date.now() })
      });
    } else if (REAL_ADAPTERS[name]) {
      await REAL_ADAPTERS[name](input, ctx);
    } else {
      throw new Error("Real mode is on but no Webhook URL is set in Settings (and no adapter for '" + name + "').");
    }
    // Mirror the action into the workspace so there's a visible record of what
    // was sent externally.
    const tool = BY_NAME[name];
    const local = tool && tool.simulate ? tool.simulate(input || {}, ctx || {}) : "done";
    return "Sent via webhook ✓ — " + local;
  }

  // Run a tool through the configured backend (simulate or real), no gating.
  async function runTool(name, input, ctx) {
    const mode = Store.get().settings.executionMode || "simulate";
    if (mode === "real") return await runReal(name, input, ctx);
    return BY_NAME[name].simulate(input || {}, ctx || {});
  }

  const TOOLS = [
    {
      name: "log_decision",
      description:
        "Record a decision you have made and the reasoning behind it. Use this to make your autonomous choices transparent before you act.",
      input_schema: {
        type: "object",
        properties: {
          decision: { type: "string", description: "The decision, in one line." },
          rationale: { type: "string", description: "Why you chose this." }
        },
        required: ["decision", "rationale"]
      },
      simulate: (input) => `Decision logged: ${input.decision}`
    },
    {
      name: "research",
      description:
        "Gather background information about a person, company, or topic to inform your next action. Returns a short brief.",
      input_schema: {
        type: "object",
        properties: {
          subject: { type: "string", description: "Who or what to research." },
          focus: { type: "string", description: "What you want to learn." }
        },
        required: ["subject"]
      },
      // In simulate mode we synthesize a plausible brief so the loop can proceed.
      simulate: (input) =>
        `Brief on "${input.subject}"${input.focus ? " (" + input.focus + ")" : ""}: ` +
        "mid-market company, ~120 employees, recently expanded their team, likely evaluating tools in this category. " +
        "Best angle: lead with time saved and a concrete proof point. (Simulated research.)"
    },
    {
      name: "send_email",
      description: "Compose and send an email. In simulate mode it is placed in your workspace Outbox.",
      input_schema: {
        type: "object",
        properties: {
          to: { type: "string", description: "Recipient (name or address)." },
          subject: { type: "string" },
          body: { type: "string", description: "Full email body." }
        },
        required: ["to", "subject", "body"]
      },
      simulate: (input, ctx) => {
        Store.addOutbox({ agentId: ctx.agentId, missionId: ctx.missionId, to: input.to, subject: input.subject, body: input.body });
        return `Email queued to ${input.to} — "${input.subject}".`;
      }
    },
    {
      name: "add_lead",
      description: "Add or update a lead/contact in the CRM.",
      input_schema: {
        type: "object",
        properties: {
          name: { type: "string" },
          company: { type: "string" },
          note: { type: "string", description: "Context or next step." },
          status: { type: "string", enum: ["new", "contacted", "qualified", "won", "lost"] }
        },
        required: ["name"]
      },
      simulate: (input, ctx) => {
        Store.addLead({ agentId: ctx.agentId, missionId: ctx.missionId, name: input.name, company: input.company || "", note: input.note || "", status: input.status || "new" });
        return `Lead saved: ${input.name}${input.company ? " @ " + input.company : ""} (${input.status || "new"}).`;
      }
    },
    {
      name: "create_task",
      description: "Create a follow-up task on the workspace board so work isn't dropped.",
      input_schema: {
        type: "object",
        properties: {
          title: { type: "string" },
          priority: { type: "string", enum: ["low", "medium", "high"] }
        },
        required: ["title"]
      },
      simulate: (input, ctx) => {
        Store.addTask({ agentId: ctx.agentId, missionId: ctx.missionId, title: input.title, priority: input.priority || "medium" });
        return `Task created: "${input.title}" (${input.priority || "medium"}).`;
      }
    },
    {
      name: "complete_task",
      description: "Mark an existing task as done, by its title or id.",
      input_schema: {
        type: "object",
        properties: { task: { type: "string", description: "Task title or id." } },
        required: ["task"]
      },
      simulate: (input) => (Store.completeTask(input.task) ? `Task completed: "${input.task}".` : `No open task matched "${input.task}".`)
    },
    {
      name: "escalate_to_human",
      description:
        "Hand a decision back to a human when it's outside your authority, risky, or ambiguous. Adds an item to the human review queue.",
      input_schema: {
        type: "object",
        properties: {
          reason: { type: "string", description: "Why this needs a human." },
          question: { type: "string", description: "The specific question or approval needed." }
        },
        required: ["reason", "question"]
      },
      simulate: (input, ctx) => {
        Store.addEscalation({ agentId: ctx.agentId, missionId: ctx.missionId, reason: input.reason, question: input.question });
        return `Escalated to a human: ${input.question}`;
      }
    },
    {
      name: "delegate_to",
      description:
        "Delegate a sub-task to another hired specialist on the team. Use this when the work needs a different specialty than yours. The teammate runs the sub-task autonomously and reports back. Provide the teammate's exact agent id and a clear, self-contained sub-goal.",
      input_schema: {
        type: "object",
        properties: {
          agent_id: { type: "string", description: "The exact id of the teammate to delegate to (from your roster)." },
          task: { type: "string", description: "A clear, self-contained sub-goal for that specialist." }
        },
        required: ["agent_id", "task"]
      },
      // Delegation is an orchestration primitive handled directly by the agent
      // runtime (it spawns and runs a sub-mission), so this is never called.
      simulate: () => "[[delegation is handled by the runtime]]"
    },
    {
      name: "finish",
      description: "End the mission. Call this once the goal is achieved or no further autonomous action is appropriate.",
      input_schema: {
        type: "object",
        properties: {
          summary: { type: "string", description: "What you accomplished." },
          outcome: { type: "string", enum: ["completed", "partial", "blocked"] }
        },
        required: ["summary"]
      },
      simulate: (input) => `Mission finished (${input.outcome || "completed"}): ${input.summary}`
    }
  ];

  const BY_NAME = {};
  TOOLS.forEach((t) => (BY_NAME[t.name] = t));

  const Tools = {
    // Specs sent to the Anthropic API (strip our local `simulate` fn).
    specs() {
      return TOOLS.map((t) => ({ name: t.name, description: t.description, input_schema: t.input_schema }));
    },
    names() { return TOOLS.map((t) => t.name); },
    get(name) { return BY_NAME[name]; },
    isGated(name) { return !!GATED[name]; },
    // Execute a tool. Gated actions are held for approval when the setting is on.
    async execute(name, input, ctx) {
      const tool = BY_NAME[name];
      if (!tool) throw new Error("Unknown tool: " + name);
      const settings = Store.get().settings;
      if (settings.approvals && GATED[name]) {
        Store.addPendingAction({ agentId: ctx && ctx.agentId, missionId: ctx && ctx.missionId, tool: name, input: input });
        return "⏸ Held for your approval before it runs.";
      }
      return await runTool(name, input, ctx);
    },
    // Run a previously-gated action after a human approves it.
    async runApproved(name, input, ctx) {
      return await runTool(name, input, ctx);
    }
  };

  window.Tools = Tools;
})();
