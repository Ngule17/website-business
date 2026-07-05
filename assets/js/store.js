/* store.js — persistent app state backed by localStorage */
(function () {
  "use strict";

  const KEY = "ai_workforce_state_v1";

  const defaults = () => ({
    hired: [], // array of agent ids on the team
    conversations: {}, // agentId -> [{ role: 'user'|'assistant', content, ts }]
    settings: {
      apiKey: "", // optional Anthropic API key (stored locally only)
      model: "claude-sonnet-5",
      workspaceName: "My Company"
    }
  });

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      const parsed = JSON.parse(raw);
      const base = defaults();
      return {
        hired: Array.isArray(parsed.hired) ? parsed.hired : base.hired,
        conversations: parsed.conversations && typeof parsed.conversations === "object" ? parsed.conversations : base.conversations,
        settings: Object.assign(base.settings, parsed.settings || {})
      };
    } catch (e) {
      return defaults();
    }
  }

  let state = load();
  const listeners = new Set();

  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      /* storage may be full or blocked; app still works in-memory */
    }
  }

  function emit() {
    persist();
    listeners.forEach((fn) => fn(state));
  }

  const Store = {
    get: () => state,
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    isHired(id) {
      return state.hired.indexOf(id) !== -1;
    },
    hire(id) {
      if (!this.isHired(id)) {
        state.hired = state.hired.concat(id);
        emit();
      }
    },
    fire(id) {
      state.hired = state.hired.filter((x) => x !== id);
      emit();
    },
    toggleHire(id) {
      this.isHired(id) ? this.fire(id) : this.hire(id);
    },
    getConversation(id) {
      return state.conversations[id] || [];
    },
    addMessage(id, message) {
      const convo = (state.conversations[id] || []).concat(message);
      state.conversations = Object.assign({}, state.conversations, { [id]: convo });
      emit();
    },
    clearConversation(id) {
      state.conversations = Object.assign({}, state.conversations, { [id]: [] });
      emit();
    },
    updateSettings(patch) {
      state.settings = Object.assign({}, state.settings, patch);
      emit();
    }
  };

  window.Store = Store;
})();
