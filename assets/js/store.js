/* store.js — persistent app state backed by localStorage */
(function () {
  "use strict";

  const KEY = "ai_workforce_state_v1";

  let _seq = 0;
  function id(prefix) {
    _seq += 1;
    return (prefix || "id") + "_" + Date.now().toString(36) + "_" + _seq + Math.floor(Math.random() * 1e4).toString(36);
  }

  const defaults = () => ({
    hired: [], // array of agent ids on the team
    customAgents: [], // user-created specialists (same shape as built-in agents, custom:true)
    conversations: {}, // agentId -> [{ role, content, ts }]
    missions: [], // autonomous runs: {id, agentId, goal, status, createdAt, finishedAt, result, log:[]}
    outbox: [], // {id, agentId, missionId, to, subject, body, ts}
    leads: [], // {id, agentId, missionId, name, company, note, status, ts}
    tasks: [], // {id, agentId, missionId, title, priority, done, ts}
    escalations: [], // {id, agentId, missionId, reason, question, resolved, ts}
    settings: {
      apiKey: "", // optional Anthropic API key (stored locally only)
      model: "claude-sonnet-5",
      workspaceName: "My Company",
      executionMode: "simulate" // 'simulate' (safe, in-app) | 'real' (pluggable adapters)
    }
  });

  function load() {
    const base = defaults();
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return base;
      const p = JSON.parse(raw);
      return {
        hired: Array.isArray(p.hired) ? p.hired : base.hired,
        customAgents: Array.isArray(p.customAgents) ? p.customAgents : base.customAgents,
        conversations: p.conversations && typeof p.conversations === "object" ? p.conversations : base.conversations,
        missions: Array.isArray(p.missions) ? p.missions : base.missions,
        outbox: Array.isArray(p.outbox) ? p.outbox : base.outbox,
        leads: Array.isArray(p.leads) ? p.leads : base.leads,
        tasks: Array.isArray(p.tasks) ? p.tasks : base.tasks,
        escalations: Array.isArray(p.escalations) ? p.escalations : base.escalations,
        settings: Object.assign(base.settings, p.settings || {})
      };
    } catch (e) {
      return base;
    }
  }

  let state = load();
  const listeners = new Set();

  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      /* storage full/blocked — app still works in memory */
    }
  }
  function emit() {
    persist();
    listeners.forEach((fn) => fn(state));
  }

  const Store = {
    id,
    get: () => state,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    /* ---- catalog (built-in + custom agents) ---- */
    agents() {
      const builtin = (window.APP_DATA && window.APP_DATA.AGENTS) || [];
      return builtin.concat(state.customAgents);
    },
    agentById(id) {
      return this.agents().find((a) => a.id === id) || null;
    },
    isCustom(id) {
      return state.customAgents.some((a) => a.id === id);
    },
    addCustomAgent(agent) {
      const withId = Object.assign({ id: id("custom"), custom: true }, agent, { custom: true });
      state.customAgents = state.customAgents.concat(withId);
      emit();
      return withId;
    },
    updateCustomAgent(agentId, patch) {
      state.customAgents = state.customAgents.map((a) => (a.id === agentId ? Object.assign({}, a, patch, { id: agentId, custom: true }) : a));
      emit();
    },
    removeCustomAgent(agentId) {
      state.customAgents = state.customAgents.filter((a) => a.id !== agentId);
      state.hired = state.hired.filter((x) => x !== agentId); // also take off the team
      emit();
    },

    /* ---- team ---- */
    isHired(x) { return state.hired.indexOf(x) !== -1; },
    hire(x) { if (!this.isHired(x)) { state.hired = state.hired.concat(x); emit(); } },
    fire(x) { state.hired = state.hired.filter((y) => y !== x); emit(); },
    toggleHire(x) { this.isHired(x) ? this.fire(x) : this.hire(x); },

    /* ---- conversations ---- */
    getConversation(x) { return state.conversations[x] || []; },
    addMessage(x, m) {
      const c = (state.conversations[x] || []).concat(m);
      state.conversations = Object.assign({}, state.conversations, { [x]: c });
      emit();
    },
    clearConversation(x) {
      state.conversations = Object.assign({}, state.conversations, { [x]: [] });
      emit();
    },

    /* ---- missions (autonomous runs) ---- */
    createMission(agentId, goal) {
      const m = {
        id: id("mission"),
        agentId: agentId,
        goal: goal,
        status: "queued", // queued | running | done | failed
        createdAt: Date.now(),
        finishedAt: null,
        result: null,
        log: []
      };
      state.missions = [m].concat(state.missions);
      emit();
      return m;
    },
    getMission(mid) { return state.missions.find((m) => m.id === mid) || null; },
    updateMission(mid, patch) {
      state.missions = state.missions.map((m) => (m.id === mid ? Object.assign({}, m, patch) : m));
      emit();
    },
    appendMissionLog(mid, entry) {
      state.missions = state.missions.map((m) =>
        m.id === mid ? Object.assign({}, m, { log: m.log.concat(entry) }) : m
      );
      emit();
    },

    /* ---- action outputs (side effects of agent decisions) ---- */
    addOutbox(rec) { state.outbox = [Object.assign({ id: id("mail"), ts: Date.now() }, rec)].concat(state.outbox); emit(); },
    addLead(rec) { state.leads = [Object.assign({ id: id("lead"), ts: Date.now() }, rec)].concat(state.leads); emit(); },
    addTask(rec) { state.tasks = [Object.assign({ id: id("task"), ts: Date.now(), done: false }, rec)].concat(state.tasks); emit(); },
    completeTask(match) {
      let hit = false;
      state.tasks = state.tasks.map((t) => {
        if (!hit && !t.done && (t.id === match || t.title.toLowerCase().indexOf(String(match).toLowerCase()) !== -1)) {
          hit = true;
          return Object.assign({}, t, { done: true });
        }
        return t;
      });
      emit();
      return hit;
    },
    addEscalation(rec) { state.escalations = [Object.assign({ id: id("esc"), ts: Date.now(), resolved: false }, rec)].concat(state.escalations); emit(); },
    resolveEscalation(eid) {
      state.escalations = state.escalations.map((e) => (e.id === eid ? Object.assign({}, e, { resolved: true }) : e));
      emit();
    },

    /* ---- settings ---- */
    updateSettings(patch) { state.settings = Object.assign({}, state.settings, patch); emit(); },

    /* ---- housekeeping ---- */
    counts() {
      return {
        missions: state.missions.length,
        running: state.missions.filter((m) => m.status === "running").length,
        outbox: state.outbox.length,
        leads: state.leads.length,
        tasks: state.tasks.filter((t) => !t.done).length,
        escalations: state.escalations.filter((e) => !e.resolved).length
      };
    }
  };

  window.Store = Store;
})();
