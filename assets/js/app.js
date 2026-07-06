/* app.js — SPA router and views for the AI Workforce platform.
   Pure vanilla JS with hash-based routing so it runs on any static host. */
(function () {
  "use strict";

  const INDUSTRIES = window.APP_DATA.INDUSTRIES;
  const agents = () => Store.agents(); // built-in + user-created, resolved live
  const byId = (id) => Store.agentById(id);
  const industryMeta = (name) => INDUSTRIES.find((i) => i.name === name) || { icon: "🏢", accent: "#6366f1" };
  const app = document.getElementById("app");

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function avatarEl(agent, size) {
    return `<span class="avatar" style="--accent:${agent.accent};width:${size}px;height:${size}px;font-size:${Math.round(size * 0.5)}px">${agent.avatar}</span>`;
  }

  function agentCard(agent) {
    const hired = Store.isHired(agent.id);
    return `
      <article class="card agent-card">
        <div class="agent-card__head">
          ${avatarEl(agent, 56)}
          <div>
            <h3>${esc(agent.name)}${agent.custom ? ` <span class="custom-tag" title="Your custom agent">★</span>` : ""}</h3>
            <p class="role">${esc(agent.role)}</p>
          </div>
          <span class="dept-chip">${industryMeta(agent.industry).icon} ${esc(agent.industry)}</span>
        </div>
        <p class="agent-card__tagline">${esc(agent.tagline)}</p>
        <ul class="skill-tags">
          ${agent.skills.slice(0, 3).map((s) => `<li>${esc(s)}</li>`).join("")}
          ${agent.skills.length > 3 ? `<li class="more">+${agent.skills.length - 3}</li>` : ""}
        </ul>
        <div class="agent-card__actions">
          <a class="btn btn-ghost" href="#/agent/${agent.id}">View</a>
          <button class="btn ${hired ? "btn-danger" : "btn-primary"}" data-hire="${agent.id}">
            ${hired ? "Remove" : "Hire"}
          </button>
        </div>
      </article>`;
  }

  /* ---------- views ---------- */
  function viewHome() {
    const total = agents().length;
    // Feature one agent from a few different industries for variety.
    const featuredIds = ["aria-sales", "vera-scribe", "portia-contracts", "iris-seo", "brooks-mortgage", "hugo-travel"];
    const featured = featuredIds.map(byId).filter(Boolean);
    return `
      <section class="hero">
        <div class="hero__inner">
          <span class="badge">✨ A marketplace of AI specialists</span>
          <h1>Hire AI employees<br><span class="grad">for any role, any industry.</span></h1>
          <p class="hero__sub">Browse ${total} specialized AI agents across ${INDUSTRIES.length} industries — healthcare, legal, finance, real estate, marketing and more. Give one a goal and it works <em>autonomously</em>: deciding, acting, and logging every step.</p>
          <div class="hero__cta">
            <a class="btn btn-primary btn-lg" href="#/agents">Explore the marketplace</a>
            <a class="btn btn-ghost btn-lg" href="#/workspace">My workspace</a>
          </div>
          <div class="hero__stats">
            <div><strong>${total}</strong><span>Specialists</span></div>
            <div><strong>${INDUSTRIES.length}</strong><span>Industries</span></div>
            <div><strong>24/7</strong><span>Availability</span></div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section__head"><h2>Explore by industry</h2><a class="link" href="#/agents">Browse all →</a></div>
        <div class="industry-grid">
          ${INDUSTRIES.map((ind) => {
            const n = agents().filter((a) => a.industry === ind.name).length;
            return `
              <a class="industry-tile" href="#/agents/${encodeURIComponent(ind.name)}" style="--accent:${ind.accent}">
                <span class="industry-tile__icon">${ind.icon}</span>
                <div class="industry-tile__body">
                  <strong>${esc(ind.name)}</strong>
                  <span class="muted small">${n} specialist${n === 1 ? "" : "s"}</span>
                </div>
              </a>`;
          }).join("")}
        </div>
      </section>

      <section class="section">
        <div class="section__head"><h2>How it works</h2></div>
        <div class="grid grid-3">
          <div class="card feature"><div class="feature__icon">✅</div><h3>1. Hire</h3><p>Add specialists from any industry to your workspace with one click.</p></div>
          <div class="card feature"><div class="feature__icon">🎯</div><h3>2. Assign a goal</h3><p>Give an agent a mission. It plans, decides, and acts on its own.</p></div>
          <div class="card feature"><div class="feature__icon">📋</div><h3>3. Review the work</h3><p>Watch every decision and action land in your operations dashboard.</p></div>
        </div>
      </section>

      <section class="section">
        <div class="section__head"><h2>Featured specialists</h2><a class="link" href="#/agents">See all →</a></div>
        <div class="grid grid-3">
          ${featured.map(agentCard).join("")}
        </div>
      </section>`;
  }

  function viewAgents(param) {
    const active = param ? decodeURIComponent(param) : "All";
    const industries = ["All"].concat(INDUSTRIES.map((i) => i.name));
    return `
      <section class="section">
        <div class="section__head">
          <h2>Marketplace</h2>
          <div class="market-head-actions">
            <span class="muted" id="result-count">${agents().length} specialists</span>
            <a class="btn btn-primary small" href="#/create">＋ Create agent</a>
          </div>
        </div>
        <div class="market-search">
          <span class="market-search__icon">🔍</span>
          <input type="text" id="agent-search" placeholder="Search by name, role, industry, or skill…" aria-label="Search agents" />
        </div>
        <div class="filters" id="industry-filters">
          ${industries.map((name) => {
            const meta = name === "All" ? { icon: "✨" } : industryMeta(name);
            return `<button class="chip ${name === active ? "active" : ""}" data-industry="${esc(name)}">${meta.icon} ${esc(name)}</button>`;
          }).join("")}
        </div>
        <div class="grid grid-3" id="agent-grid"></div>
        <div class="empty card" id="no-results" style="display:none">
          <div class="empty__icon">🔍</div><h3>No specialists match</h3><p>Try a different industry or search term.</p>
        </div>
      </section>`;
  }

  function viewAgent(id) {
    const agent = byId(id);
    if (!agent) return viewNotFound();
    const hired = Store.isHired(agent.id);
    return `
      <section class="section">
        <a class="link back" href="#/agents">← Back to directory</a>
        <div class="profile">
          <div class="profile__main card">
            <div class="profile__head">
              ${avatarEl(agent, 84)}
              <div>
                <h1>${esc(agent.name)}</h1>
                <p class="role">${esc(agent.role)}</p>
                <p class="muted small"><a class="link" href="#/agents/${encodeURIComponent(agent.industry)}">${industryMeta(agent.industry).icon} ${esc(agent.industry)}</a></p>
                <p class="agent-card__tagline">${esc(agent.tagline)}</p>
              </div>
            </div>
            <p class="profile__desc">${esc(agent.description)}</p>
            <h3 class="profile__sub">Skills</h3>
            <ul class="skill-tags">
              ${agent.skills.map((s) => `<li>${esc(s)}</li>`).join("")}
            </ul>
          </div>
          <aside class="profile__side card">
            <div class="profile__price"><strong>Free</strong><span>demo access</span></div>
            <button class="btn btn-block ${hired ? "btn-danger" : "btn-primary"}" data-hire="${agent.id}">
              ${hired ? "Remove from team" : "Hire " + esc(agent.name)}
            </button>
            <a class="btn btn-ghost btn-block ${hired ? "" : "is-disabled"}" href="${hired ? "#/chat/" + agent.id : "#"}">
              💬 Chat with ${esc(agent.name)}
            </a>
            ${agent.custom ? `<a class="btn btn-ghost btn-block" href="#/create/${agent.id}">✎ Edit agent</a>` : ""}
            <p class="hint">${agent.custom ? "Your custom agent." : hired ? "On your team." : "Hire to unlock chat, autonomous missions, and your workspace."}</p>
          </aside>
        </div>

        ${hired ? assignPanel(agent) : ""}
      </section>`;
  }

  // Panel for launching an autonomous mission for a hired agent.
  function assignPanel(agent) {
    const recent = Store.get().missions.filter((m) => m.agentId === agent.id).slice(0, 4);
    return `
      <div class="assign card">
        <div class="assign__head">
          <h3>🤖 Assign an autonomous mission</h3>
          <span class="mode-pill">${Api.hasKey() ? "Live reasoning" : "Demo mode"} · ${esc(Store.get().settings.executionMode)}</span>
        </div>
        <p class="muted small">${agent.manager
          ? `Give ${esc(agent.name)} a big goal. As your Chief of Staff, ${esc(agent.name)} breaks it into workstreams and <strong>delegates</strong> each to the right specialist on your team, then synthesizes the results. You have ${Store.get().hired.filter((id) => { const a = byId(id); return a && !a.manager; }).length} specialist(s) available to delegate to.`
          : `Give ${esc(agent.name)} a goal. They'll work it autonomously — deciding and taking actions on their own — and log every decision.`}</p>
        <div class="assign__row">
          <input type="text" id="mission-goal" placeholder="e.g. ${esc(agent.starters[0])}" aria-label="Mission goal" />
          <button class="btn btn-primary" id="assign-run">Run autonomously →</button>
        </div>
        <div class="assign__examples">
          ${agent.starters.map((s) => `<button class="starter" data-goal="${esc(s)}">${esc(s)}</button>`).join("")}
          <button class="starter starter--save" id="assign-save-pb" title="Save this goal as a reusable playbook">＋ Save as playbook</button>
        </div>
        <span class="saved-note" id="pb-note"></span>
        ${recent.length ? `
          <h4 class="assign__sub">Recent missions</h4>
          <div class="mission-list">${recent.map(missionRow).join("")}</div>` : ""}
      </div>`;
  }

  function viewWorkspace() {
    const s = Store.get();
    const team = s.hired.map(byId).filter(Boolean);
    if (team.length === 0) {
      return `
        <section class="section">
          <h2>${esc(s.settings.workspaceName)}</h2>
          <div class="empty card">
            <div class="empty__icon">🏢</div>
            <h3>Your workspace is empty</h3>
            <p>Hire your first AI employee to get started.</p>
            <a class="btn btn-primary" href="#/agents">Browse agents</a>
          </div>
        </section>`;
    }
    const c = Store.counts();
    const stats = [
      ["Missions", c.missions, "#/missions"],
      ["Emails sent", c.outbox, "#/ops/outbox"],
      ["Leads", c.leads, "#/ops/crm"],
      ["Open tasks", c.tasks, "#/ops/tasks"],
      ["Needs you", c.escalations, "#/ops/escalations"]
    ];
    return `
      <section class="section">
        <div class="section__head">
          <h2>${esc(s.settings.workspaceName)}</h2>
          <div class="market-head-actions">
            <span class="muted">${team.length} agent${team.length > 1 ? "s" : ""} on your team</span>
            <a class="btn btn-ghost small" href="#/roundtable">💬 Round-table</a>
          </div>
        </div>

        <div class="ws-stats">
          ${stats.map(([label, n, href]) => `
            <a class="ws-stat ${label === "Needs you" && n ? "ws-stat--alert" : ""}" href="${href}">
              <strong>${n}</strong><span>${label}</span>
            </a>`).join("")}
        </div>

        ${orgChart(team)}
      </section>`;
  }

  function orgNode(agent, opts) {
    const active = Store.get().missions.filter((m) => m.agentId === agent.id).length;
    return `
      <article class="org-node card ${opts && opts.manager ? "org-node--manager" : ""}" style="--accent:${agent.accent}">
        <div class="org-node__head">
          ${avatarEl(agent, 44)}
          <div class="org-node__id">
            <h3>${esc(agent.name)}${agent.custom ? ` <span class="custom-tag">★</span>` : ""}</h3>
            <p class="role">${esc(agent.role)}</p>
          </div>
        </div>
        <p class="muted small">${active} mission${active === 1 ? "" : "s"} · ${Store.getConversation(agent.id).length} messages</p>
        <div class="org-node__actions">
          <a class="btn btn-primary small" href="#/agent/${agent.id}">Assign</a>
          <a class="btn btn-ghost small" href="#/chat/${agent.id}">Chat</a>
          <button class="btn btn-ghost small" data-hire="${agent.id}" title="Remove from team">✕</button>
        </div>
      </article>`;
  }

  // Visual org chart: managers on top, specialists grouped by function.
  function orgChart(team) {
    const managers = team.filter((a) => a.manager);
    const workers = team.filter((a) => !a.manager);
    const groups = {};
    workers.forEach((a) => { (groups[a.department] = groups[a.department] || []).push(a); });
    const order = FUNCTIONS.concat(Object.keys(groups).filter((d) => FUNCTIONS.indexOf(d) === -1));
    const groupNames = order.filter((d) => groups[d] && groups[d].length);

    const managerBlock = managers.length
      ? `<div class="org-managers">${managers.map((m) => orgNode(m, { manager: true })).join("")}</div>
         <div class="org-connector"></div>`
      : `<div class="org-hint card">
           <span>🧑‍💼 No manager yet.</span>
           <a class="link" href="#/agent/max-chief">Hire Max, the Chief of Staff</a> to coordinate and delegate across your team.
         </div>`;

    const groupBlock = groupNames.length
      ? `<div class="org-groups">
          ${groupNames.map((dept) => `
            <div class="org-group">
              <div class="org-group__head">${esc(dept)} <span class="org-group__count">${groups[dept].length}</span></div>
              <div class="org-group__nodes">${groups[dept].map((a) => orgNode(a)).join("")}</div>
            </div>`).join("")}
        </div>`
      : `<p class="muted">No specialists yet — <a class="link" href="#/agents">hire some from the marketplace</a>.</p>`;

    return `<div class="org"><h3 class="org__title">Org chart</h3>${managerBlock}${groupBlock}</div>`;
  }

  function viewChat(id) {
    const agent = byId(id);
    if (!agent) return viewNotFound();
    if (!Store.isHired(agent.id)) {
      return `
        <section class="section">
          <div class="empty card">
            <div class="empty__icon">🔒</div>
            <h3>Hire ${esc(agent.name)} to start chatting</h3>
            <a class="btn btn-primary" href="#/agent/${agent.id}">View ${esc(agent.name)}</a>
          </div>
        </section>`;
    }
    const convo = Store.getConversation(agent.id);
    const showStarters = convo.length === 0;
    return `
      <section class="chat">
        <header class="chat__header">
          <a class="link back" href="#/workspace">←</a>
          ${avatarEl(agent, 44)}
          <div class="chat__title">
            <strong>${esc(agent.name)}</strong>
            <span class="muted small">${esc(agent.role)} · ${Api.hasKey() ? "Live" : "Demo mode"}</span>
          </div>
          <button class="btn btn-ghost small" id="clear-chat">Clear</button>
        </header>
        <div class="chat__body" id="chat-body">
          ${convo.map(bubble).join("")}
          ${showStarters ? starterBlock(agent) : ""}
        </div>
        <form class="chat__input" id="chat-form" autocomplete="off">
          <input type="text" id="chat-text" placeholder="Message ${esc(agent.name)}…" aria-label="Message" />
          <button class="btn btn-primary" type="submit" id="send-btn">Send</button>
        </form>
      </section>`;
  }

  function starterBlock(agent) {
    return `
      <div class="starters">
        <p class="muted small">Try asking:</p>
        ${agent.starters.map((s) => `<button class="starter" data-starter="${esc(s)}">${esc(s)}</button>`).join("")}
      </div>`;
  }

  function bubble(m) {
    const who = m.role === "user" ? "user" : "assistant";
    return `<div class="msg msg--${who}">${esc(m.content).replace(/\n/g, "<br>")}</div>`;
  }

  function viewSettings() {
    const s = Store.get().settings;
    return `
      <section class="section narrow">
        <h2>Settings</h2>
        <div class="card form">
          <label>Workspace name
            <input type="text" id="set-workspace" value="${esc(s.workspaceName)}" />
          </label>
          <label>Shared team memory <span class="muted small">(company context every agent uses when reasoning live)</span>
            <textarea id="set-memory" rows="3" placeholder="e.g. We're Acme, a B2B SaaS for dental clinics. Voice: friendly and concise. Never promise delivery dates.">${esc(s.teamMemory)}</textarea>
          </label>
          <label>Anthropic API key <span class="muted small">(stored only in your browser)</span>
            <input type="password" id="set-apikey" value="${esc(s.apiKey)}" placeholder="sk-ant-…" />
          </label>
          <label>Model
            <select id="set-model">
              ${["claude-opus-4-8", "claude-sonnet-5", "claude-haiku-4-5-20251001"].map((m) =>
                `<option value="${m}" ${s.model === m ? "selected" : ""}>${m}</option>`
              ).join("")}
            </select>
          </label>
          <label>Autonomous execution mode
            <select id="set-mode">
              <option value="simulate" ${s.executionMode === "simulate" ? "selected" : ""}>Simulate — safe, in-app actions only</option>
              <option value="real" ${s.executionMode === "real" ? "selected" : ""}>Real — send actions to a webhook</option>
            </select>
          </label>
          <label>Webhook URL <span class="muted small">(real mode — POST each action to Zapier / Make / your API)</span>
            <input type="url" id="set-webhook" value="${esc(s.webhookUrl)}" placeholder="https://hooks.zapier.com/…" />
          </label>
          <label class="check"><input type="checkbox" id="set-approvals" ${s.approvals ? "checked" : ""}> Require my approval before an agent sends an email or adds a lead</label>
          <p class="hint">With a key set, your agents reason live via the real Claude API. In <strong>Simulate</strong>, actions (emails, CRM, tasks) stay inside this app. In <strong>Real</strong> mode each action is POSTed to your Webhook URL and mirrored to the workspace. With <strong>approval</strong> on, sending actions pause in the <a class="link" href="#/ops/approvals">Approvals</a> queue until you sign off. Your key is sent only to Anthropic.</p>
          <button class="btn btn-primary" id="save-settings">Save settings</button>
          <span class="saved-note" id="saved-note"></span>
        </div>

        <h2 class="data-h2">Data</h2>
        <div class="card form">
          <p class="hint" style="margin:0">Everything lives in this browser. Export a backup you can re-import on another device or share with a teammate. Your team, custom agents, playbooks, missions, and operations are included — <strong>your API key is never exported</strong>.</p>
          <div class="form-actions">
            <button class="btn btn-ghost" id="export-btn">⬇ Export workspace</button>
            <button class="btn btn-ghost" id="import-btn">⬆ Import workspace</button>
            <input type="file" id="import-file" accept="application/json,.json" style="display:none" />
            <span class="saved-note" id="data-note"></span>
          </div>
        </div>
      </section>`;
  }

  /* ---------- missions ---------- */
  const STATUS_LABEL = { queued: "Queued", running: "Running", done: "Done", failed: "Failed" };

  function missionRow(m) {
    const agent = byId(m.agentId);
    const outcome = m.result && m.result.outcome ? m.result.outcome : "";
    return `
      <a class="mission-row" href="#/mission/${m.id}">
        ${agent ? avatarEl(agent, 34) : ""}
        <div class="mission-row__body">
          <span class="mission-row__goal">${esc(m.goal)}</span>
          <span class="muted small">${agent ? esc(agent.name) : "—"} · ${m.log.length} step${m.log.length === 1 ? "" : "s"}</span>
        </div>
        <span class="status status--${m.status}">${STATUS_LABEL[m.status] || m.status}${outcome && m.status === "done" ? " · " + esc(outcome) : ""}</span>
      </a>`;
  }

  function playbookSection() {
    const pbs = Store.get().playbooks;
    if (!pbs.length) return "";
    return `
      <div class="pb-block">
        <div class="section__head"><h3 class="pb-title">▶ Playbooks</h3><span class="muted small">reusable goals — run in one click</span></div>
        <div class="grid grid-3">
          ${pbs.map((pb) => {
            const a = byId(pb.agentId);
            return `
              <article class="card pb-card">
                <div class="pb-card__head">
                  ${a ? avatarEl(a, 38) : "🤖"}
                  <div><strong>${esc(pb.name)}</strong><p class="muted small">${a ? esc(a.name) + " · " + esc(a.role) : "agent removed"}</p></div>
                </div>
                <div class="agent-card__actions">
                  <button class="btn btn-primary small" data-run-pb="${pb.id}" ${a && Store.isHired(a.id) ? "" : "disabled"}>Run</button>
                  <button class="btn btn-ghost small" data-del-pb="${pb.id}">Delete</button>
                </div>
                ${a && !Store.isHired(a.id) ? `<p class="muted small">Hire ${esc(a.name)} to run this.</p>` : ""}
              </article>`;
          }).join("")}
        </div>
      </div>`;
  }

  function viewMissions() {
    const missions = Store.get().missions;
    const pb = playbookSection();
    if (missions.length === 0) {
      return `
        <section class="section">
          <h2>Missions</h2>
          ${pb}
          <div class="empty card">
            <div class="empty__icon">🚀</div>
            <h3>No missions yet</h3>
            <p>Open a hired agent and assign an autonomous mission to see them work.</p>
            <a class="btn btn-primary" href="#/workspace">Go to workspace</a>
          </div>
        </section>`;
    }
    return `
      <section class="section">
        ${pb}
        <div class="section__head"><h2>Missions</h2><span class="muted">${missions.length} total</span></div>
        <div class="mission-list">${missions.map(missionRow).join("")}</div>
      </section>`;
  }

  function setupMissions() {
    app.querySelectorAll("[data-run-pb]").forEach((b) => b.addEventListener("click", () => {
      const pb = Store.get().playbooks.find((x) => x.id === b.getAttribute("data-run-pb"));
      if (!pb) return;
      const mission = Store.createMission(pb.agentId, pb.goal);
      location.hash = "#/mission/" + mission.id;
    }));
    app.querySelectorAll("[data-del-pb]").forEach((b) => b.addEventListener("click", () => {
      Store.removePlaybook(b.getAttribute("data-del-pb"));
      route();
    }));
  }

  const KIND_ICON = { status: "•", reason: "💭", decision: "🧭", action: "⚙️", error: "⚠️", finish: "🏁", delegate: "🤝", delegate_return: "📨" };
  const TOOL_LABEL = {
    log_decision: "Decision", research: "Research", send_email: "Sent email",
    add_lead: "CRM update", create_task: "Created task", complete_task: "Completed task",
    escalate_to_human: "Escalated", finish: "Finished"
  };

  function logEntry(e) {
    const depth = e.depth || 0;
    const wrapAttrs = ` style="margin-left:${depth * 24}px;--accent:${e.accent || "#6366f1"}"`;
    const nested = depth ? " log--nested" : "";
    // For delegated (sub-agent) work, tag who is acting.
    const actor = depth ? `<span class="log__actor">${e.avatar || ""} ${esc(e.agentName || "")}</span>` : "";

    if (e.kind === "delegate") {
      return `<div class="log log--delegate${nested}"${wrapAttrs}><span class="log__icon">🤝</span><div class="log__body">${actor}<span class="log__tool">Delegated to ${esc(e.toName || "")}</span><div class="log__input">${esc(e.text || "")}</div></div></div>`;
    }
    if (e.kind === "delegate_return") {
      return `<div class="log log--return${nested}"${wrapAttrs}><span class="log__icon">📨</span><div class="log__body">${actor}<strong>${esc(e.toName || "")} reported back${e.outcome ? " (" + esc(e.outcome) + ")" : ""}</strong><div class="log__result">${esc(e.text || "")}</div></div></div>`;
    }
    if (e.kind === "action") {
      const label = TOOL_LABEL[e.tool] || e.tool;
      const detail = `<div class="log__result ${e.status === "error" ? "is-error" : ""}">${esc(e.result || "")}</div>`;
      return `
        <div class="log log--action${nested}"${wrapAttrs}>
          <span class="log__icon">${KIND_ICON.action}</span>
          <div class="log__body">
            ${actor}
            <span class="log__tool">${esc(label)}</span>
            <div class="log__input">${esc(summarizeInput(e.tool, e.input))}</div>
            ${detail}
          </div>
        </div>`;
    }
    const cls = e.kind === "error" ? "log--error" : e.kind === "decision" ? "log--decision" : e.kind === "finish" ? "log--finish" : "log--note";
    const text = e.kind === "finish" ? `<strong>Mission ${esc(e.outcome || "complete")}.</strong> ${esc(e.text || "")}` : esc(e.text || "");
    return `<div class="log ${cls}${nested}"${wrapAttrs}><span class="log__icon">${KIND_ICON[e.kind] || "•"}</span><div class="log__body">${actor}${text}</div></div>`;
  }

  function summarizeInput(tool, input) {
    if (!input) return "";
    if (tool === "send_email") return "To " + (input.to || "?") + " — " + (input.subject || "");
    if (tool === "add_lead") return (input.name || "?") + (input.company ? " @ " + input.company : "");
    if (tool === "create_task" || tool === "complete_task") return input.title || input.task || "";
    if (tool === "research") return input.subject || "";
    if (tool === "escalate_to_human") return input.question || input.reason || "";
    if (tool === "finish") return input.summary || "";
    return Object.keys(input).map((k) => input[k]).join(" · ");
  }

  function viewMission(mid) {
    const m = Store.getMission(mid);
    if (!m) return viewNotFound();
    const agent = byId(m.agentId);
    return `
      <section class="section narrow">
        <a class="link back" href="#/missions">← All missions</a>
        <div class="mission-head card">
          <div class="mission-head__top">
            ${agent ? avatarEl(agent, 48) : ""}
            <div>
              <h2>${esc(m.goal)}</h2>
              <span class="muted small">${agent ? esc(agent.name) + " · " + esc(agent.role) : ""}</span>
            </div>
            <span class="status status--${m.status}" id="mission-status">${STATUS_LABEL[m.status] || m.status}</span>
          </div>
        </div>
        <div class="timeline" id="mission-log">${m.log.map(logEntry).join("")}</div>
        <div id="mission-actions" class="mission-actions"></div>
      </section>`;
  }

  /* ---------- operations dashboard ---------- */
  function viewOps() {
    const s = Store.get();
    const c = Store.counts();
    const tab = (location.hash.split("/")[2]) || "outbox";
    const tabs = [
      ["outbox", "Outbox", s.outbox.length],
      ["crm", "CRM", s.leads.length],
      ["tasks", "Tasks", s.tasks.filter((t) => !t.done).length],
      ["approvals", "Approvals", c.pending],
      ["escalations", "Human review", c.escalations]
    ];
    return `
      <section class="section">
        <div class="section__head"><h2>Operations</h2><span class="muted">everything your agents produced</span></div>
        <div class="ops-tabs">
          ${tabs.map(([k, label, n]) => `<a class="ops-tab ${tab === k ? "active" : ""}" href="#/ops/${k}">${label}${n ? ` <span class="tab-count">${n}</span>` : ""}</a>`).join("")}
        </div>
        <div class="ops-body">${opsPanel(tab, s)}</div>
      </section>`;
  }

  function agentName(id) { const a = byId(id); return a ? a.name : "Agent"; }

  function opsPanel(tab, s) {
    if (tab === "crm") {
      if (!s.leads.length) return emptyPanel("🗂️", "No leads yet", "Agents add leads here when they run sales or recruiting missions.");
      return `<div class="op-grid">${s.leads.map((l) => `
        <div class="card op-card">
          <div class="op-card__head"><strong>${esc(l.name)}</strong><span class="status status--lead-${esc(l.status)}">${esc(l.status)}</span></div>
          ${l.company ? `<p class="muted small">${esc(l.company)}</p>` : ""}
          ${l.note ? `<p class="small">${esc(l.note)}</p>` : ""}
          <p class="op-card__by">by ${esc(agentName(l.agentId))}</p>
        </div>`).join("")}</div>`;
    }
    if (tab === "tasks") {
      if (!s.tasks.length) return emptyPanel("✅", "No tasks yet", "Agents create follow-up tasks so work isn't dropped.");
      return `<div class="op-list">${s.tasks.map((t) => `
        <label class="task-item ${t.done ? "is-done" : ""}">
          <input type="checkbox" data-task="${t.id}" ${t.done ? "checked" : ""}>
          <span class="task-item__title">${esc(t.title)}</span>
          <span class="prio prio--${esc(t.priority || "medium")}">${esc(t.priority || "medium")}</span>
          <span class="muted small">${esc(agentName(t.agentId))}</span>
        </label>`).join("")}</div>`;
    }
    if (tab === "approvals") {
      if (!s.pendingActions.length) return emptyPanel("✋", "Nothing to approve", "Turn on 'Require my approval' in Settings, and sending actions will pause here for your sign-off.");
      return `<div class="op-list">${s.pendingActions.map((pa) => `
        <div class="card esc-card">
          <div class="esc-card__body">
            <strong>${esc(TOOL_LABEL[pa.tool] || pa.tool)}</strong>
            <p class="muted small">${esc(summarizeInput(pa.tool, pa.input))} · by ${esc(agentName(pa.agentId))}</p>
          </div>
          <div style="display:flex;gap:8px">
            <button class="btn btn-primary small" data-approve="${pa.id}">Approve &amp; run</button>
            <button class="btn btn-ghost small" data-reject="${pa.id}">Reject</button>
          </div>
        </div>`).join("")}</div>`;
    }
    if (tab === "escalations") {
      if (!s.escalations.length) return emptyPanel("🙋", "Nothing needs you", "When an agent hits a decision above its authority, it lands here.");
      return `<div class="op-list">${s.escalations.map((e) => `
        <div class="card esc-card ${e.resolved ? "is-done" : ""}">
          <div class="esc-card__body">
            <strong>${esc(e.question)}</strong>
            <p class="muted small">${esc(e.reason)} · raised by ${esc(agentName(e.agentId))}</p>
          </div>
          ${e.resolved ? `<span class="status status--done">Resolved</span>` : `<button class="btn btn-primary small" data-resolve="${e.id}">Approve / Resolve</button>`}
        </div>`).join("")}</div>`;
    }
    // outbox
    if (!s.outbox.length) return emptyPanel("📤", "Outbox is empty", "Emails your agents compose and send appear here.");
    return `<div class="op-list">${s.outbox.map((m) => `
      <div class="card mail-card">
        <div class="mail-card__head"><strong>${esc(m.subject)}</strong><span class="muted small">→ ${esc(m.to)}</span></div>
        <p class="mail-card__body">${esc(m.body).replace(/\n/g, "<br>")}</p>
        <p class="op-card__by">by ${esc(agentName(m.agentId))}</p>
      </div>`).join("")}</div>`;
  }

  function emptyPanel(icon, title, sub) {
    return `<div class="empty card"><div class="empty__icon">${icon}</div><h3>${esc(title)}</h3><p>${esc(sub)}</p></div>`;
  }

  /* ---------- team activity feed ---------- */
  function timeAgo(ts) {
    if (!ts) return "";
    const s = Math.floor((Date.now() - ts) / 1000);
    if (s < 45) return "just now";
    const m = Math.floor(s / 60);
    if (m < 60) return m + "m ago";
    const h = Math.floor(m / 60);
    if (h < 24) return h + "h ago";
    return Math.floor(h / 24) + "d ago";
  }

  // Flatten every mission's log into one activity stream (most recent first).
  const FEED_KINDS = ["action", "decision", "delegate", "delegate_return", "finish", "error"];
  function allActivity() {
    const items = [];
    Store.get().missions.forEach((m) => {
      const owner = byId(m.agentId);
      m.log.forEach((e) => {
        if (FEED_KINDS.indexOf(e.kind) === -1) return;
        items.push(Object.assign({}, e, {
          missionId: m.id,
          missionGoal: m.goal,
          agentId: e.agentId || m.agentId,
          agentName: e.agentName || (owner && owner.name) || "Agent",
          avatar: e.avatar || (owner && owner.avatar) || "🤖",
          accent: e.accent || (owner && owner.accent) || "#6366f1"
        }));
      });
    });
    items.sort((a, b) => (b.ts || 0) - (a.ts || 0));
    return items;
  }

  function activityVerb(e) {
    if (e.kind === "action") return { verb: TOOL_LABEL[e.tool] || e.tool, detail: summarizeInput(e.tool, e.input) };
    if (e.kind === "decision") return { verb: "Decision", detail: e.text };
    if (e.kind === "delegate") return { verb: "Delegated to " + (e.toName || ""), detail: e.text };
    if (e.kind === "delegate_return") return { verb: "Got results from " + (e.toName || ""), detail: e.text };
    if (e.kind === "finish") return { verb: "Finished a mission" + (e.outcome ? " (" + e.outcome + ")" : ""), detail: e.text };
    if (e.kind === "error") return { verb: "Hit an issue", detail: e.text };
    return { verb: e.kind, detail: e.text };
  }

  function activityRow(e) {
    const v = activityVerb(e);
    const size = 36;
    return `
      <div class="feed-item" style="--accent:${e.accent}">
        <span class="avatar" style="--accent:${e.accent};width:${size}px;height:${size}px;font-size:18px">${e.avatar}</span>
        <div class="feed-item__body">
          <div class="feed-item__head">
            <strong>${esc(e.agentName)}</strong>
            <span class="feed-verb feed-verb--${e.kind}">${esc(v.verb)}</span>
            <span class="feed-time">${timeAgo(e.ts)}</span>
          </div>
          ${v.detail ? `<div class="feed-detail">${esc(v.detail)}</div>` : ""}
          <a class="feed-mission" href="#/mission/${e.missionId}">↳ ${esc(e.missionGoal)}</a>
        </div>
      </div>`;
  }

  /* ---------- insights (analytics) ---------- */
  const OUTCOME_META = { completed: { label: "Completed", color: "#22c55e" }, partial: { label: "Partial", color: "#f59e0b" }, blocked: { label: "Blocked", color: "#ef4444" } };
  const TYPE_LABEL = { research: "Research", send_email: "Emails", add_lead: "CRM updates", create_task: "Tasks created", complete_task: "Tasks completed", escalate_to_human: "Escalations", delegate: "Delegations" };

  function computeStats() {
    const missions = Store.get().missions;
    const outcomes = { completed: 0, partial: 0, blocked: 0 };
    const byType = {};
    const byAgent = {};
    missions.forEach((m) => {
      const o = m.result && m.result.outcome;
      if (o && outcomes[o] !== undefined) outcomes[o] += 1;
      else if (m.status === "failed") outcomes.blocked += 1;
      m.log.forEach((e) => {
        if (e.kind === "action") byType[e.tool] = (byType[e.tool] || 0) + 1;
        if (e.kind === "delegate") byType.delegate = (byType.delegate || 0) + 1;
        if ((e.kind === "action" || e.kind === "delegate") && e.agentId) byAgent[e.agentId] = (byAgent[e.agentId] || 0) + 1;
      });
    });
    const totalActions = Object.keys(byType).reduce((n, k) => n + byType[k], 0);
    return { missions: missions, outcomes: outcomes, byType: byType, byAgent: byAgent, totalActions: totalActions };
  }

  // A row of labeled magnitude bars, single hue — identity via the text label,
  // never color alone. rows: [{label, value, color?, meta?}].
  function barChart(rows, opts) {
    opts = opts || {};
    const max = Math.max(1, ...rows.map((r) => r.value));
    return `<div class="bars">${rows.map((r) => {
      const pct = Math.round((r.value / max) * 100);
      const color = r.color || "var(--primary)";
      return `<div class="bar-row" title="${esc(r.label)}: ${r.value}">
        <span class="bar-label">${esc(r.label)}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${color}"></div></div>
        <span class="bar-value">${r.value}</span>
      </div>`;
    }).join("")}</div>`;
  }

  function renderInsights() {
    const st = computeStats();
    const total = st.missions.length;
    const done = st.outcomes.completed;
    const rate = total ? Math.round((done / total) * 100) : 0;
    const openEsc = Store.counts().escalations;

    const kpis = [
      ["Missions run", total],
      ["Completion rate", rate + "%"],
      ["Actions taken", st.totalActions],
      ["Needs review", openEsc]
    ];

    // Outcomes as a single stacked bar with a labeled legend (status colors).
    const outcomeTotal = st.outcomes.completed + st.outcomes.partial + st.outcomes.blocked;
    const segs = ["completed", "partial", "blocked"].filter((k) => st.outcomes[k] > 0);
    const stack = outcomeTotal
      ? `<div class="stack-bar">${segs.map((k) => `<div class="stack-seg" style="width:${(st.outcomes[k] / outcomeTotal) * 100}%;background:${OUTCOME_META[k].color}" title="${OUTCOME_META[k].label}: ${st.outcomes[k]}"></div>`).join("")}</div>
         <div class="legend">${["completed", "partial", "blocked"].map((k) => `<span class="legend-item"><span class="legend-dot" style="background:${OUTCOME_META[k].color}"></span>${OUTCOME_META[k].label} <strong>${st.outcomes[k]}</strong></span>`).join("")}</div>`
      : `<p class="muted small">No finished missions yet.</p>`;

    // Actions by type (magnitude, single hue, labeled).
    const typeRows = Object.keys(st.byType).map((k) => ({ label: TYPE_LABEL[k] || k, value: st.byType[k] }))
      .sort((a, b) => b.value - a.value);

    // Output by agent (magnitude, each bar in the agent's own accent + name label).
    const agentRows = Object.keys(st.byAgent).map((id) => {
      const a = byId(id);
      return { label: a ? a.name : "Agent", value: st.byAgent[id], color: a ? a.accent : "var(--primary)" };
    }).sort((a, b) => b.value - a.value).slice(0, 8);

    return `
      <div class="insights">
        <h3 class="insights__title">📊 Insights</h3>
        <div class="kpi-row">
          ${kpis.map(([label, val]) => `<div class="kpi"><strong>${val}</strong><span>${label}</span></div>`).join("")}
        </div>
        <div class="chart-grid">
          <div class="card chart-card">
            <h4 class="chart-title">Mission outcomes</h4>
            ${stack}
          </div>
          <div class="card chart-card">
            <h4 class="chart-title">Actions by type</h4>
            ${typeRows.length ? barChart(typeRows) : `<p class="muted small">No actions yet.</p>`}
          </div>
        </div>
        <div class="card chart-card">
          <h4 class="chart-title">Output by agent</h4>
          ${agentRows.length ? barChart(agentRows) : `<p class="muted small">No agent activity yet.</p>`}
        </div>
      </div>`;
  }

  function viewActivity(param) {
    const items = allActivity();
    if (items.length === 0) {
      return `
        <section class="section">
          <h2>Team activity</h2>
          <div class="empty card">
            <div class="empty__icon">📡</div>
            <h3>No activity yet</h3>
            <p>Assign a mission and every decision, action, and handoff your team makes will stream here.</p>
            <a class="btn btn-primary" href="#/workspace">Go to workspace</a>
          </div>
        </section>`;
    }
    const activeAgent = param ? decodeURIComponent(param) : "all";

    // Distinct agents present + contribution counts (actions + delegations).
    const present = [];
    const seen = {};
    const counts = {};
    items.forEach((e) => {
      if (!seen[e.agentId]) { seen[e.agentId] = true; present.push({ id: e.agentId, name: e.agentName, avatar: e.avatar, accent: e.accent }); }
      if (e.kind === "action" || e.kind === "delegate") counts[e.agentId] = (counts[e.agentId] || 0) + 1;
    });
    const leaders = present.slice().sort((a, b) => (counts[b.id] || 0) - (counts[a.id] || 0)).slice(0, 6);
    const shown = activeAgent === "all" ? items : items.filter((e) => e.agentId === activeAgent);

    return `
      <section class="section">
        <div class="section__head"><h2>Team activity</h2><span class="muted">${items.length} events across ${Store.get().missions.length} mission${Store.get().missions.length === 1 ? "" : "s"}</span></div>

        ${renderInsights()}

        <h3 class="feed-heading">Activity feed</h3>
        <div class="leaderboard">
          ${leaders.map((a) => `
            <a class="leader ${activeAgent === a.id ? "active" : ""}" href="#/activity/${encodeURIComponent(a.id)}" style="--accent:${a.accent}">
              <span class="avatar" style="--accent:${a.accent};width:30px;height:30px;font-size:15px">${a.avatar}</span>
              <span class="leader__name">${esc(a.name)}</span>
              <span class="leader__count">${counts[a.id] || 0}</span>
            </a>`).join("")}
        </div>

        <div class="filters" id="activity-filters">
          <button class="chip ${activeAgent === "all" ? "active" : ""}" data-activity="all">✨ Everyone</button>
          ${present.map((a) => `<button class="chip ${activeAgent === a.id ? "active" : ""}" data-activity="${esc(a.id)}">${a.avatar} ${esc(a.name)}</button>`).join("")}
        </div>

        <div class="feed">${shown.map(activityRow).join("")}</div>
      </section>`;
  }

  /* ---------- create / edit a custom agent ---------- */
  const FUNCTIONS = ["Sales", "Support", "Marketing", "Operations", "Engineering", "People", "Leadership"];

  function viewCreate(param) {
    const editing = param ? byId(decodeURIComponent(param)) : null;
    const isEdit = !!(editing && editing.custom);
    const a = isEdit ? editing : {
      name: "", role: "", industry: INDUSTRIES[0].name, department: "Operations",
      avatar: "🤖", tagline: "", description: "", skills: [], starters: [], systemPrompt: "", manager: false
    };
    return `
      <section class="section narrow">
        <a class="link back" href="#/agents">← Back to marketplace</a>
        <h2>${isEdit ? "Edit agent" : "Create your own agent"}</h2>
        <p class="muted">Define a specialist and it joins your marketplace — hireable, chattable, and ready to run autonomous missions.</p>
        <div class="card form">
          <div class="form-row">
            <label class="emoji-field">Avatar<input id="c-avatar" maxlength="4" value="${esc(a.avatar)}" /></label>
            <label>Name<input id="c-name" value="${esc(a.name)}" placeholder="e.g. Vera" /></label>
          </div>
          <label>Role / title<input id="c-role" value="${esc(a.role)}" placeholder="e.g. Insurance Claims Adjuster" /></label>
          <div class="form-row">
            <label>Industry<select id="c-industry">${INDUSTRIES.map((i) => `<option ${a.industry === i.name ? "selected" : ""}>${esc(i.name)}</option>`).join("")}</select></label>
            <label>Function<select id="c-dept">${FUNCTIONS.map((d) => `<option ${a.department === d ? "selected" : ""}>${d}</option>`).join("")}</select></label>
          </div>
          <label>Tagline<input id="c-tagline" value="${esc(a.tagline)}" placeholder="One punchy line" /></label>
          <label>Description<textarea id="c-desc" rows="2" placeholder="What they do">${esc(a.description)}</textarea></label>
          <label>Skills <span class="muted small">(comma-separated)</span><input id="c-skills" value="${esc(a.skills.join(", "))}" placeholder="Claims triage, Fraud checks, Policy review" /></label>
          <label>Example prompts <span class="muted small">(one per line)</span><textarea id="c-starters" rows="3" placeholder="Draft a claim summary&#10;Explain a denial to a policyholder">${esc(a.starters.join("\n"))}</textarea></label>
          <label>System prompt <span class="muted small">(the persona &amp; instructions that drive it)</span><textarea id="c-system" rows="4" placeholder="You are ... You do ... You always ...">${esc(a.systemPrompt)}</textarea></label>
          <label class="check"><input type="checkbox" id="c-manager" ${a.manager ? "checked" : ""}> This is a manager — it delegates work to other specialists instead of doing it itself</label>
          <div class="form-actions">
            <button class="btn btn-primary" id="c-save">${isEdit ? "Save changes" : "Create agent"}</button>
            ${isEdit ? `<button class="btn btn-danger" id="c-delete">Delete</button>` : ""}
            <span class="saved-note" id="c-note"></span>
          </div>
        </div>
      </section>`;
  }

  function fieldVal(id) { const el = document.getElementById(id); return el ? el.value.trim() : ""; }

  function setupCreate(param) {
    const editing = param ? byId(decodeURIComponent(param)) : null;
    const isEdit = !!(editing && editing.custom);
    const save = document.getElementById("c-save");
    const note = document.getElementById("c-note");
    if (!save) return;

    save.addEventListener("click", () => {
      const name = fieldVal("c-name"), role = fieldVal("c-role"), system = fieldVal("c-system");
      if (!name || !role || !system) {
        note.textContent = "Name, role, and system prompt are required.";
        note.className = "saved-note err";
        return;
      }
      const industry = fieldVal("c-industry");
      const obj = {
        name: name, role: role, industry: industry, department: fieldVal("c-dept"),
        avatar: fieldVal("c-avatar") || "🤖", accent: industryMeta(industry).accent,
        tagline: fieldVal("c-tagline") || role, description: fieldVal("c-desc") || "",
        skills: fieldVal("c-skills").split(",").map((s) => s.trim()).filter(Boolean),
        starters: fieldVal("c-starters").split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 4),
        systemPrompt: system, manager: document.getElementById("c-manager").checked
      };
      if (!obj.starters.length) obj.starters = ["Help me with a task in your specialty."];
      if (isEdit) { Store.updateCustomAgent(editing.id, obj); location.hash = "#/agent/" + editing.id; }
      else { const created = Store.addCustomAgent(obj); location.hash = "#/agent/" + created.id; }
    });

    const del = document.getElementById("c-delete");
    if (del) del.addEventListener("click", () => {
      if (editing) { Store.removeCustomAgent(editing.id); location.hash = "#/agents"; }
    });
  }

  /* ---------- round-table (group chat) ---------- */
  function rtBubble(m) {
    if (m.role === "user") return `<div class="msg msg--user">${esc(m.content).replace(/\n/g, "<br>")}</div>`;
    return `
      <div class="rt-msg">
        <span class="avatar" style="--accent:${m.accent || "#6366f1"};width:32px;height:32px;font-size:16px">${m.avatar || "🤖"}</span>
        <div class="rt-msg__body">
          <span class="rt-name">${esc(m.name || "Agent")}</span>
          <div class="msg msg--assistant">${esc(m.content).replace(/\n/g, "<br>")}</div>
        </div>
      </div>`;
  }

  function viewRoundtable() {
    const team = Store.get().hired.map(byId).filter(Boolean);
    if (!team.length) {
      return `<section class="section"><div class="empty card"><div class="empty__icon">💬</div><h3>Your round-table is empty</h3><p>Hire a few agents and ask them all at once.</p><a class="btn btn-primary" href="#/agents">Browse the marketplace</a></div></section>`;
    }
    const convo = Store.getConversation("roundtable");
    return `
      <section class="chat">
        <header class="chat__header">
          <a class="link back" href="#/workspace">←</a>
          <div class="chat__title"><strong>Round-table</strong><span class="muted small">${team.length} agent${team.length > 1 ? "s" : ""} · ${Api.hasKey() ? "Live" : "Demo mode"}</span></div>
          <button class="btn btn-ghost small" id="rt-clear">Clear</button>
        </header>
        <div class="rt-roster" id="rt-roster">
          ${team.map((a) => `<button class="chip rt-chip active" data-rt-agent="${a.id}" style="--accent:${a.accent}">${a.avatar} ${esc(a.name)}</button>`).join("")}
        </div>
        <div class="chat__body" id="rt-body">
          ${convo.length ? convo.map(rtBubble).join("") : `<div class="starters"><p class="muted small">Ask the room a question — each active agent weighs in, building on the others. Toggle who's in above.</p></div>`}
        </div>
        <form class="chat__input" id="rt-form" autocomplete="off">
          <input type="text" id="rt-text" placeholder="Ask the room…" aria-label="Message the round-table" />
          <button class="btn btn-primary" type="submit" id="rt-send">Send</button>
        </form>
      </section>`;
  }

  function setupRoundtable() {
    const form = document.getElementById("rt-form");
    if (!form) return;
    const input = document.getElementById("rt-text");
    const body = document.getElementById("rt-body");
    const sendBtn = document.getElementById("rt-send");
    const roster = document.getElementById("rt-roster");
    const scroll = () => { body.scrollTop = body.scrollHeight; };
    scroll(); input.focus();

    roster.addEventListener("click", (e) => {
      const b = e.target.closest("[data-rt-agent]");
      if (b) b.classList.toggle("active");
    });
    document.getElementById("rt-clear").addEventListener("click", () => { Store.clearConversation("roundtable"); route(); });

    async function submit(e) {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      const active = Array.from(roster.querySelectorAll(".rt-chip.active")).map((c) => byId(c.getAttribute("data-rt-agent"))).filter(Boolean);
      if (!active.length) { input.focus(); return; }

      const st = body.querySelector(".starters"); if (st) st.remove();
      Store.addMessage("roundtable", { role: "user", content: text, ts: Date.now() });
      body.insertAdjacentHTML("beforeend", rtBubble({ role: "user", content: text }));
      input.value = ""; input.disabled = sendBtn.disabled = true; scroll();

      const said = [];
      for (const agent of active) {
        const typing = document.createElement("div");
        typing.className = "rt-msg";
        typing.innerHTML = `<span class="avatar" style="--accent:${agent.accent};width:32px;height:32px;font-size:16px">${agent.avatar}</span><div class="rt-msg__body"><span class="rt-name">${esc(agent.name)}</span><div class="msg msg--assistant typing"><span></span><span></span><span></span></div></div>`;
        body.appendChild(typing); scroll();
        // Only compose the collaborative prompt for live reasoning; in demo the
        // simulator would just echo it, so send the raw question instead.
        const prompt = !Api.hasKey() ? text : text + (said.length
          ? "\n\nYour teammates have said so far:\n" + said.map((s) => s.name + ": " + s.content).join("\n") + "\n\nAdd your own perspective as " + agent.role + " — build on or respectfully differ. Be brief."
          : "\n\nRespond briefly in your own voice as " + agent.role + ".");
        let reply;
        try { reply = await Api.send(agent, [{ role: "user", content: prompt }]); }
        catch (err) { reply = "⚠️ " + (err && err.message ? err.message : "Something went wrong."); }
        typing.remove();
        const msg = { role: "assistant", content: reply, agentId: agent.id, name: agent.name, avatar: agent.avatar, accent: agent.accent, ts: Date.now() };
        Store.addMessage("roundtable", msg);
        body.insertAdjacentHTML("beforeend", rtBubble(msg));
        said.push({ name: agent.name, content: reply });
        scroll();
      }
      input.disabled = sendBtn.disabled = false; input.focus(); scroll();
    }
    form.addEventListener("submit", submit);
  }

  function viewNotFound() {
    return `<section class="section"><div class="empty card"><div class="empty__icon">🤖</div><h3>Page not found</h3><a class="btn btn-primary" href="#/">Go home</a></div></section>`;
  }

  /* ---------- router ---------- */
  function route() {
    const hash = location.hash || "#/";
    const parts = hash.replace(/^#\//, "").split("/");
    const [page, param] = parts;

    let html;
    switch (page) {
      case "": html = viewHome(); break;
      case "agents": html = viewAgents(param); break;
      case "agent": html = viewAgent(param); break;
      case "workspace": html = viewWorkspace(); break;
      case "chat": html = viewChat(param); break;
      case "missions": html = viewMissions(); break;
      case "mission": html = viewMission(param); break;
      case "activity": html = viewActivity(param); break;
      case "create": html = viewCreate(param); break;
      case "roundtable": html = viewRoundtable(); break;
      case "ops": html = viewOps(); break;
      case "settings": html = viewSettings(); break;
      default: html = viewNotFound();
    }
    app.innerHTML = html;
    window.scrollTo(0, 0);
    updateNav();
    afterRender(page, param);
  }

  function updateNav() {
    const hired = Store.get().hired.length;
    const c = Store.counts();
    const badges = { "data-nav-count": hired, "data-nav-ops": c.escalations + c.pending };
    Object.keys(badges).forEach((attr) => {
      document.querySelectorAll("[" + attr + "]").forEach((el) => {
        const n = badges[attr];
        el.textContent = n ? n : "";
        el.style.display = n ? "inline-flex" : "none";
      });
    });
    const hash = location.hash || "#/";
    document.querySelectorAll(".nav-link").forEach((el) => {
      const href = el.getAttribute("href");
      el.classList.toggle("active", href === hash ||
        (href === "#/agents" && (hash.startsWith("#/agents") || hash.startsWith("#/agent/") || hash.startsWith("#/create"))) ||
        (href === "#/missions" && hash.startsWith("#/mission")) ||
        (href === "#/activity" && hash.startsWith("#/activity")) ||
        (href === "#/ops" && hash.startsWith("#/ops")));
    });
  }

  /* ---------- per-view behavior ---------- */
  function afterRender(page, param) {
    // Hire/fire buttons (present on many views)
    app.querySelectorAll("[data-hire]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        Store.toggleHire(btn.getAttribute("data-hire"));
        route(); // re-render current view to reflect change
      });
    });

    if (page === "agents") setupMarketplace(param);
    if (page === "chat") setupChat(byId(param));
    if (page === "settings") setupSettings();
    if (page === "agent") setupAssign(byId(param));
    if (page === "mission") setupMission(param);
    if (page === "missions") setupMissions();
    if (page === "ops") setupOps();
    if (page === "activity") setupActivity();
    if (page === "create") setupCreate(param);
    if (page === "roundtable") setupRoundtable();
  }

  function setupActivity() {
    const filters = document.getElementById("activity-filters");
    if (!filters) return;
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-activity]");
      if (!btn) return;
      const who = btn.getAttribute("data-activity");
      location.hash = who === "all" ? "#/activity" : "#/activity/" + encodeURIComponent(who);
    });
  }

  /* ---------- autonomous mission wiring ---------- */
  function setupAssign(agent) {
    if (!agent) return;
    const input = document.getElementById("mission-goal");
    const runBtn = document.getElementById("assign-run");
    if (!input || !runBtn) return;

    app.querySelectorAll("[data-goal]").forEach((b) =>
      b.addEventListener("click", () => { input.value = b.getAttribute("data-goal"); input.focus(); })
    );

    const launch = () => {
      const goal = input.value.trim();
      if (!goal) { input.focus(); return; }
      const mission = Store.createMission(agent.id, goal);
      location.hash = "#/mission/" + mission.id; // mission view auto-runs queued missions
    };
    runBtn.addEventListener("click", launch);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") launch(); });

    const saveBtn = document.getElementById("assign-save-pb");
    if (saveBtn) saveBtn.addEventListener("click", () => {
      const goal = input.value.trim();
      const note = document.getElementById("pb-note");
      if (!goal) { input.focus(); if (note) { note.textContent = "Type a goal first."; note.className = "saved-note err"; } return; }
      Store.addPlaybook({ name: goal, goal: goal, agentId: agent.id });
      if (note) { note.textContent = "✓ Saved to Playbooks"; note.className = "saved-note"; setTimeout(() => (note.textContent = ""), 2500); }
    });
  }

  function setupMission(mid) {
    const mission = Store.getMission(mid);
    if (!mission) return;
    const agent = byId(mission.agentId);
    const logEl = document.getElementById("mission-log");
    const statusEl = document.getElementById("mission-status");
    const actionsEl = document.getElementById("mission-actions");
    if (!agent || !logEl) return;

    const append = (entry) => {
      logEl.insertAdjacentHTML("beforeend", logEntry(entry));
      const last = logEl.lastElementChild;
      if (last) {
        last.classList.add("log--enter");
        last.scrollIntoView({ block: "nearest" });
      }
    };

    function renderActions() {
      const m = Store.getMission(mid);
      if (!m) return;
      if (m.status === "done" || m.status === "failed") {
        const r = m.result || {};
        actionsEl.innerHTML = `
          <div class="card mission-result">
            <h3>${m.status === "failed" ? "⚠️ Blocked" : "🏁 Result"}</h3>
            <p>${esc(r.summary || "")}</p>
            <div class="mission-result__cta">
              <a class="btn btn-ghost" href="#/ops/outbox">View operations →</a>
              <a class="btn btn-primary" href="#/agent/${agent.id}">Assign another mission</a>
            </div>
          </div>`;
      }
    }

    if (mission.status === "queued") {
      // Autonomously run it now, streaming steps into the log.
      if (statusEl) statusEl.textContent = STATUS_LABEL.running;
      if (statusEl) statusEl.className = "status status--running";
      Agent.run(mission, agent, append)
        .catch(() => {})
        .finally(() => {
          const m = Store.getMission(mid);
          if (statusEl && m) { statusEl.textContent = STATUS_LABEL[m.status]; statusEl.className = "status status--" + m.status; }
          renderActions();
          updateNav();
        });
    } else {
      renderActions();
    }
  }

  function setupOps() {
    app.querySelectorAll("[data-task]").forEach((cb) =>
      cb.addEventListener("change", () => { Store.completeTask(cb.getAttribute("data-task")); route(); })
    );
    app.querySelectorAll("[data-resolve]").forEach((b) =>
      b.addEventListener("click", () => { Store.resolveEscalation(b.getAttribute("data-resolve")); route(); })
    );
    app.querySelectorAll("[data-approve]").forEach((b) =>
      b.addEventListener("click", async () => {
        const pa = Store.getPendingAction(b.getAttribute("data-approve"));
        if (!pa) return;
        b.disabled = true; b.textContent = "Running…";
        try {
          await Tools.runApproved(pa.tool, pa.input, { agentId: pa.agentId, missionId: pa.missionId });
          Store.removePendingAction(pa.id);
          notify("Approved and ran: " + (TOOL_LABEL[pa.tool] || pa.tool), { icon: "✅", kind: "ok" });
        } catch (e) {
          notify("Action failed: " + (e.message || e), { icon: "⚠️", kind: "warn" });
        }
        route();
      })
    );
    app.querySelectorAll("[data-reject]").forEach((b) =>
      b.addEventListener("click", () => { Store.removePendingAction(b.getAttribute("data-reject")); route(); })
    );
  }

  function setupMarketplace(param) {
    const filters = document.getElementById("industry-filters");
    const grid = document.getElementById("agent-grid");
    const search = document.getElementById("agent-search");
    const count = document.getElementById("result-count");
    const noResults = document.getElementById("no-results");
    if (!filters || !grid) return;

    let industry = param ? decodeURIComponent(param) : "All";
    let query = "";

    function matches(a) {
      if (industry !== "All" && a.industry !== industry) return false;
      if (!query) return true;
      const hay = (a.name + " " + a.role + " " + a.industry + " " + a.department + " " + a.tagline + " " + a.skills.join(" ")).toLowerCase();
      return hay.indexOf(query) !== -1;
    }

    function render() {
      const list = agents().filter(matches);
      grid.innerHTML = list.map(agentCard).join("");
      if (count) count.textContent = list.length + " specialist" + (list.length === 1 ? "" : "s");
      if (noResults) noResults.style.display = list.length ? "none" : "";
      // bind hire buttons in the fresh grid
      grid.querySelectorAll("[data-hire]").forEach((b) =>
        b.addEventListener("click", (ev) => {
          ev.preventDefault();
          Store.toggleHire(b.getAttribute("data-hire"));
          render();
        })
      );
    }

    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-industry]");
      if (!btn) return;
      filters.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      industry = btn.getAttribute("data-industry");
      render();
    });

    if (search) {
      search.addEventListener("input", () => { query = search.value.trim().toLowerCase(); render(); });
    }

    render();
  }

  function setupChat(agent) {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-text");
    const body = document.getElementById("chat-body");
    const sendBtn = document.getElementById("send-btn");
    const clearBtn = document.getElementById("clear-chat");
    if (!form || !agent) return;

    const scrollDown = () => { body.scrollTop = body.scrollHeight; };
    scrollDown();
    input.focus();

    // Starter prompts
    body.querySelectorAll("[data-starter]").forEach((b) => {
      b.addEventListener("click", () => {
        input.value = b.getAttribute("data-starter");
        input.focus();
      });
    });

    clearBtn && clearBtn.addEventListener("click", () => {
      Store.clearConversation(agent.id);
      route();
    });

    async function submit(e) {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      // Remove starter block on first send
      const starters = body.querySelector(".starters");
      if (starters) starters.remove();

      Store.addMessage(agent.id, { role: "user", content: text, ts: Date.now() });
      body.insertAdjacentHTML("beforeend", bubble({ role: "user", content: text }));
      input.value = "";
      scrollDown();

      // typing indicator
      input.disabled = sendBtn.disabled = true;
      const typing = document.createElement("div");
      typing.className = "msg msg--assistant typing";
      typing.innerHTML = "<span></span><span></span><span></span>";
      body.appendChild(typing);
      scrollDown();

      try {
        const history = Store.getConversation(agent.id);
        const reply = await Api.send(agent, history);
        typing.remove();
        Store.addMessage(agent.id, { role: "assistant", content: reply, ts: Date.now() });
        body.insertAdjacentHTML("beforeend", bubble({ role: "assistant", content: reply }));
      } catch (err) {
        typing.remove();
        const msg = "⚠️ " + (err && err.message ? err.message : "Something went wrong.") +
          "\n\nCheck your API key and model in Settings, or clear the key to use demo mode.";
        body.insertAdjacentHTML("beforeend", bubble({ role: "assistant", content: msg }));
      } finally {
        input.disabled = sendBtn.disabled = false;
        input.focus();
        scrollDown();
        updateNav();
      }
    }

    form.addEventListener("submit", submit);
  }

  function setupSettings() {
    const save = document.getElementById("save-settings");
    save.addEventListener("click", () => {
      Store.updateSettings({
        workspaceName: document.getElementById("set-workspace").value.trim() || "My Company",
        teamMemory: document.getElementById("set-memory").value.trim(),
        apiKey: document.getElementById("set-apikey").value.trim(),
        model: document.getElementById("set-model").value,
        executionMode: document.getElementById("set-mode").value,
        webhookUrl: document.getElementById("set-webhook").value.trim(),
        approvals: document.getElementById("set-approvals").checked
      });
      const note = document.getElementById("saved-note");
      note.textContent = "✓ Saved";
      setTimeout(() => (note.textContent = ""), 2000);
    });

    // Export: download the workspace as a JSON file.
    const dataNote = document.getElementById("data-note");
    const exportBtn = document.getElementById("export-btn");
    if (exportBtn) exportBtn.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(Store.exportState(), null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ai-workforce-backup.json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      if (dataNote) { dataNote.textContent = "✓ Exported"; dataNote.className = "saved-note"; setTimeout(() => (dataNote.textContent = ""), 2500); }
    });

    // Import: read a JSON file and replace the workspace.
    const importBtn = document.getElementById("import-btn");
    const importFile = document.getElementById("import-file");
    if (importBtn && importFile) {
      importBtn.addEventListener("click", () => importFile.click());
      importFile.addEventListener("change", () => {
        const file = importFile.files && importFile.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            Store.importState(JSON.parse(reader.result));
            location.hash = "#/workspace";
            route();
          } catch (e) {
            if (dataNote) { dataNote.textContent = "⚠ " + (e.message || "Invalid file"); dataNote.className = "saved-note err"; }
          }
          importFile.value = "";
        };
        reader.readAsText(file);
      });
    }
  }

  /* ---------- notifications (toasts) ---------- */
  let toastWrap = null;
  function notify(text, opts) {
    opts = opts || {};
    if (!toastWrap) { toastWrap = document.createElement("div"); toastWrap.className = "toasts"; document.body.appendChild(toastWrap); }
    const t = document.createElement("div");
    t.className = "toast toast--" + (opts.kind || "info");
    t.innerHTML = `<span class="toast__icon">${opts.icon || "🔔"}</span><span class="toast__text">${esc(text)}</span>`;
    toastWrap.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    const dismiss = () => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); };
    const timer = setTimeout(dismiss, opts.timeout || 5000);
    t.addEventListener("click", () => { clearTimeout(timer); if (opts.href) location.hash = opts.href; dismiss(); });
  }

  // Watch the store and toast on newly finished missions / new escalations.
  let prev = { done: 0, escTotal: 0, pending: 0 };
  function watchEvents(state) {
    const done = state.missions.filter((m) => m.status === "done" || m.status === "failed").length;
    const escTotal = state.escalations.length;
    const pending = state.pendingActions.length;
    if (pending > prev.pending) {
      const pa = state.pendingActions[state.pendingActions.length - 1];
      if (pa) notify("Approval needed: " + (({ send_email: "send an email", add_lead: "add a lead" })[pa.tool] || pa.tool), { href: "#/ops/approvals", icon: "✋", kind: "warn" });
    }
    prev.pending = pending;
    if (done > prev.done) {
      const m = state.missions.filter((x) => x.status === "done" || x.status === "failed")
        .sort((a, b) => (b.finishedAt || 0) - (a.finishedAt || 0))[0];
      if (m) {
        const a = byId(m.agentId);
        notify(`${a ? a.name : "Agent"} finished: ${m.goal}`, { href: "#/mission/" + m.id, icon: m.status === "failed" ? "⚠️" : "🏁", kind: m.status === "failed" ? "warn" : "ok" });
      }
    }
    if (escTotal > prev.escTotal) {
      const e = state.escalations[0];
      if (e) { const a = byId(e.agentId); notify(`${a ? a.name : "Agent"} needs your review: ${e.question}`, { href: "#/ops/escalations", icon: "🙋", kind: "warn" }); }
    }
    prev.done = done; prev.escTotal = escTotal;
  }

  /* ---------- theme ---------- */
  function applyTheme() {
    const theme = Store.get().settings.theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.textContent = theme === "light" ? "☀️" : "🌙";
  }
  function setupTheme() {
    applyTheme();
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.addEventListener("click", () => {
      Store.updateSettings({ theme: Store.get().settings.theme === "light" ? "dark" : "light" });
      applyTheme();
    });
  }

  /* ---------- boot ---------- */
  window.addEventListener("hashchange", route);
  // Seed event baselines so we don't toast for pre-existing data on load.
  prev.done = Store.get().missions.filter((m) => m.status === "done" || m.status === "failed").length;
  prev.escTotal = Store.get().escalations.length;
  prev.pending = Store.get().pendingActions.length;
  Store.subscribe(updateNav);
  Store.subscribe(watchEvents);
  setupTheme();
  route();
})();
