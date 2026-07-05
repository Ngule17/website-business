/* app.js — SPA router and views for the AI Workforce platform.
   Pure vanilla JS with hash-based routing so it runs on any static host. */
(function () {
  "use strict";

  const AGENTS = window.APP_DATA.AGENTS;
  const byId = (id) => AGENTS.find((a) => a.id === id);
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
            <h3>${esc(agent.name)}</h3>
            <p class="role">${esc(agent.role)}</p>
          </div>
          <span class="dept-chip">${esc(agent.department)}</span>
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
    const total = AGENTS.length;
    const hired = Store.get().hired.length;
    return `
      <section class="hero">
        <div class="hero__inner">
          <span class="badge">✨ Your AI workforce, ready to hire</span>
          <h1>Hire AI employees that<br><span class="grad">work while you sleep.</span></h1>
          <p class="hero__sub">Browse a team of specialized AI agents — sales, support, content, data, engineering and more. Hire them in one click and put them to work in your workspace.</p>
          <div class="hero__cta">
            <a class="btn btn-primary btn-lg" href="#/agents">Browse agents</a>
            <a class="btn btn-ghost btn-lg" href="#/workspace">My workspace</a>
          </div>
          <div class="hero__stats">
            <div><strong>${total}</strong><span>Specialists</span></div>
            <div><strong>${hired}</strong><span>On your team</span></div>
            <div><strong>24/7</strong><span>Availability</span></div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section__head">
          <h2>How it works</h2>
        </div>
        <div class="grid grid-3">
          <div class="card feature"><div class="feature__icon">🔎</div><h3>1. Browse</h3><p>Explore specialized AI agents, each with a clear role and skill set.</p></div>
          <div class="card feature"><div class="feature__icon">✅</div><h3>2. Hire</h3><p>Add agents to your workspace with a single click. No contracts.</p></div>
          <div class="card feature"><div class="feature__icon">💬</div><h3>3. Delegate</h3><p>Chat with your agents to get real work done, any time of day.</p></div>
        </div>
      </section>

      <section class="section">
        <div class="section__head">
          <h2>Featured agents</h2>
          <a class="link" href="#/agents">See all →</a>
        </div>
        <div class="grid grid-3">
          ${AGENTS.slice(0, 3).map(agentCard).join("")}
        </div>
      </section>`;
  }

  function viewAgents() {
    const depts = ["All"].concat(Array.from(new Set(AGENTS.map((a) => a.department))));
    return `
      <section class="section">
        <div class="section__head">
          <h2>Agent directory</h2>
          <div class="filters" id="dept-filters">
            ${depts.map((d, i) => `<button class="chip ${i === 0 ? "active" : ""}" data-dept="${esc(d)}">${esc(d)}</button>`).join("")}
          </div>
        </div>
        <div class="grid grid-3" id="agent-grid">
          ${AGENTS.map(agentCard).join("")}
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
                <p class="role">${esc(agent.role)} · ${esc(agent.department)}</p>
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
            <p class="hint">${hired ? "On your team. Start a conversation any time." : "Hire to unlock chat and add to your workspace."}</p>
          </aside>
        </div>
      </section>`;
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
    return `
      <section class="section">
        <div class="section__head">
          <h2>${esc(s.settings.workspaceName)}</h2>
          <span class="muted">${team.length} agent${team.length > 1 ? "s" : ""} on your team</span>
        </div>
        <div class="grid grid-3">
          ${team.map((agent) => {
            const msgs = Store.getConversation(agent.id).length;
            return `
              <article class="card team-card">
                <div class="agent-card__head">
                  ${avatarEl(agent, 48)}
                  <div><h3>${esc(agent.name)}</h3><p class="role">${esc(agent.role)}</p></div>
                </div>
                <p class="muted small">${msgs} message${msgs === 1 ? "" : "s"} exchanged</p>
                <div class="agent-card__actions">
                  <a class="btn btn-primary" href="#/chat/${agent.id}">Open chat</a>
                  <button class="btn btn-ghost" data-hire="${agent.id}">Remove</button>
                </div>
              </article>`;
          }).join("")}
        </div>
      </section>`;
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
          <p class="hint">With a key set, your agents call the real Claude API live from your browser. Without one, the app runs in demo mode with simulated replies. Your key is never sent anywhere except Anthropic.</p>
          <button class="btn btn-primary" id="save-settings">Save settings</button>
          <span class="saved-note" id="saved-note"></span>
        </div>
      </section>`;
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
      case "agents": html = viewAgents(); break;
      case "agent": html = viewAgent(param); break;
      case "workspace": html = viewWorkspace(); break;
      case "chat": html = viewChat(param); break;
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
    document.querySelectorAll("[data-nav-count]").forEach((el) => {
      el.textContent = hired ? hired : "";
      el.style.display = hired ? "inline-flex" : "none";
    });
    const hash = location.hash || "#/";
    document.querySelectorAll(".nav-link").forEach((el) => {
      el.classList.toggle("active", el.getAttribute("href") === hash ||
        (el.getAttribute("href") === "#/agents" && hash.startsWith("#/agent")));
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

    if (page === "agents") setupFilters();
    if (page === "chat") setupChat(byId(param));
    if (page === "settings") setupSettings();
  }

  function setupFilters() {
    const filters = document.getElementById("dept-filters");
    const grid = document.getElementById("agent-grid");
    if (!filters || !grid) return;
    filters.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-dept]");
      if (!btn) return;
      filters.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      const dept = btn.getAttribute("data-dept");
      const list = dept === "All" ? AGENTS : AGENTS.filter((a) => a.department === dept);
      grid.innerHTML = list.map(agentCard).join("");
      // rebind hire buttons within the freshly rendered grid
      grid.querySelectorAll("[data-hire]").forEach((b) =>
        b.addEventListener("click", (ev) => {
          ev.preventDefault();
          Store.toggleHire(b.getAttribute("data-hire"));
          setupFilters(); // simplest: recompute (active chip persists via DOM)
          btn.click();
        })
      );
    });
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
        apiKey: document.getElementById("set-apikey").value.trim(),
        model: document.getElementById("set-model").value
      });
      const note = document.getElementById("saved-note");
      note.textContent = "✓ Saved";
      setTimeout(() => (note.textContent = ""), 2000);
    });
  }

  /* ---------- boot ---------- */
  window.addEventListener("hashchange", route);
  Store.subscribe(updateNav);
  route();
})();
