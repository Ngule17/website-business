/* store.js — persistent progress in localStorage + a lightweight SM-2
   spaced-repetition scheduler for vocabulary. */

const STORE_KEY = "dutch_app_v1";

const DEFAULT_STATE = {
  cards: {},            // nl -> {ef, interval, reps, due, learned}
  xp: 0,
  streak: 0,
  lastStudyDay: null,   // YYYY-MM-DD
  dailyGoal: 20,
  reviewedToday: 0,
  reviewedDay: null,
  grammarDone: {},      // grammar id -> true
  readingsDone: {},     // reading id -> true
  activeLevel: "A1",
  totalReviews: 0,
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

const Store = {
  state: null,

  load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      this.state = raw ? Object.assign({}, DEFAULT_STATE, JSON.parse(raw)) : Object.assign({}, DEFAULT_STATE);
    } catch (e) {
      this.state = Object.assign({}, DEFAULT_STATE);
    }
    this._rollDay();
    return this.state;
  },

  save() {
    localStorage.setItem(STORE_KEY, JSON.stringify(this.state));
  },

  _rollDay() {
    const t = todayStr();
    if (this.state.reviewedDay !== t) {
      this.state.reviewedToday = 0;
      this.state.reviewedDay = t;
    }
  },

  // Called whenever the user completes a study action.
  registerStudy() {
    const t = todayStr();
    if (this.state.lastStudyDay === t) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    this.state.streak = this.state.lastStudyDay === yesterday ? this.state.streak + 1 : 1;
    this.state.lastStudyDay = t;
    this.save();
  },

  addXp(n) {
    this.state.xp += n;
    this.save();
  },

  // ---- SRS (SM-2 lite). quality: 0 again, 3 hard, 4 good, 5 easy ----
  getCard(nl) {
    return this.state.cards[nl];
  },

  review(nl, quality) {
    this._rollDay();
    let c = this.state.cards[nl] || { ef: 2.5, interval: 0, reps: 0, due: 0, learned: false };
    if (quality < 3) {
      c.reps = 0;
      c.interval = 0; // relearn same session (due now)
    } else {
      c.reps += 1;
      if (c.reps === 1) c.interval = 1;
      else if (c.reps === 2) c.interval = 6;
      else c.interval = Math.round(c.interval * c.ef);
      c.ef = Math.max(1.3, c.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
      c.learned = true;
    }
    c.due = Date.now() + c.interval * 86400000;
    this.state.cards[nl] = c;
    this.state.reviewedToday += 1;
    this.state.totalReviews += 1;
    this.addXp(quality >= 3 ? 10 : 3);
    this.registerStudy();
    this.save();
    return c;
  },

  // Cards from a pool that are due (or new, capped) — returns nl keys.
  buildQueue(pool, opts = {}) {
    const { newLimit = 12, includeNew = true } = opts;
    const now = Date.now();
    const due = [];
    const fresh = [];
    for (const item of pool) {
      const c = this.state.cards[item.nl];
      if (c && c.learned) {
        if (c.due <= now) due.push(item);
      } else if (includeNew) {
        fresh.push(item);
      }
    }
    return due.concat(fresh.slice(0, newLimit));
  },

  stats(pool) {
    let learned = 0, due = 0;
    const now = Date.now();
    for (const item of pool) {
      const c = this.state.cards[item.nl];
      if (c && c.learned) {
        learned++;
        if (c.due <= now) due++;
      }
    }
    return { learned, due, total: pool.length };
  },

  markGrammar(id) {
    this.state.grammarDone[id] = true;
    this.addXp(15);
    this.registerStudy();
    this.save();
  },

  markReading(id) {
    const fresh = !this.state.readingsDone[id];
    this.state.readingsDone[id] = true;
    this.addXp(fresh ? 25 : 5);
    this.registerStudy();
    this.save();
  },

  reset() {
    this.state = Object.assign({}, DEFAULT_STATE);
    this.save();
  },
};

window.Store = Store;
