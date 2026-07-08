/* app.js — UI, routing and study modes for the Dutch learning app. */
(function () {
"use strict";

const { LEVELS, THEMES, VOCAB, GRAMMAR, SENTENCES } = window.DUTCH;
const app = document.getElementById("app");

/* ---------------- Speech (Dutch pronunciation) ---------------- */
const Speech = {
  voice: null,
  ready: false,
  init() {
    if (!("speechSynthesis" in window)) return;
    const pick = () => {
      const voices = speechSynthesis.getVoices();
      this.voice =
        voices.find(v => v.lang === "nl-NL") ||
        voices.find(v => v.lang && v.lang.startsWith("nl")) || null;
      this.ready = true;
    };
    pick();
    speechSynthesis.onvoiceschanged = pick;
  },
  say(text) {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "nl-NL";
    if (this.voice) u.voice = this.voice;
    u.rate = 0.92;
    speechSynthesis.speak(u);
  },
  get available() {
    return "speechSynthesis" in window;
  },
};

/* ---------------- Helpers ---------------- */
const $ = (sel, root = document) => root.querySelector(sel);
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
}
function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function poolFor(level) {
  return VOCAB.filter(v => v.level === level);
}
function poolForTheme(themeId) {
  return VOCAB.filter(v => v.theme === themeId);
}
function themeById(id) {
  return THEMES.find(t => t.id === id);
}
function themeName(id) {
  const t = themeById(id);
  return t ? t.en : id;
}
function levelRange(pool) {
  const order = LEVELS.map(l => l.id);
  const present = [...new Set(pool.map(v => v.level))].sort((a, b) => order.indexOf(a) - order.indexOf(b));
  if (!present.length) return "";
  return present.length === 1 ? present[0] : present[0] + "–" + present[present.length - 1];
}
function speakerBtn(text) {
  if (!Speech.available) return "";
  return `<button class="spk" data-say="${esc(text)}" title="Listen" aria-label="Listen">🔊</button>`;
}
function bindSpeakers(root) {
  root.querySelectorAll("[data-say]").forEach(b =>
    b.addEventListener("click", e => {
      e.stopPropagation();
      Speech.say(b.getAttribute("data-say"));
    })
  );
}
function normalize(s) {
  return s.toLowerCase().replace(/[.,!?;:'"]/g, "").replace(/\s+/g, " ").trim();
}

/* ---------------- Router ---------------- */
const routes = {
  "": renderDashboard,
  dashboard: renderDashboard,
  themes: renderThemes,
  learn: renderLearn,
  grammar: renderGrammar,
  practice: renderPractice,
  vocab: renderVocab,
};

function go(hash) { location.hash = hash; }

function router() {
  const raw = (location.hash || "#dashboard").slice(1);
  const [name, arg] = raw.split("/");
  const fn = routes[name] || renderDashboard;
  document.querySelectorAll(".navlink").forEach(l =>
    l.classList.toggle("active", l.dataset.route === (name || "dashboard"))
  );
  app.innerHTML = "";
  fn(arg);
}

/* ---------------- Level selector ---------------- */
function levelBar(onChange) {
  const bar = el("div", "levelbar");
  LEVELS.forEach(L => {
    const b = el("button", "levelpill" + (Store.state.activeLevel === L.id ? " sel" : ""), L.id);
    b.title = L.blurb;
    b.onclick = () => {
      Store.state.activeLevel = L.id;
      Store.save();
      onChange(L.id);
    };
    bar.appendChild(b);
  });
  return bar;
}

/* ---------------- Dashboard ---------------- */
function renderDashboard() {
  const s = Store.state;
  const wrap = el("div", "view");
  wrap.appendChild(el("h1", null, "Goedendag! 🇳🇱"));
  wrap.appendChild(el("p", "sub", "Your road to Dutch C-level. A little every day."));

  // stat tiles
  const totalLearned = Object.values(s.cards).filter(c => c.learned).length;
  const grid = el("div", "statgrid");
  const tiles = [
    { k: "🔥 Streak", v: s.streak + (s.streak === 1 ? " day" : " days") },
    { k: "⭐ XP", v: s.xp },
    { k: "📚 Words learned", v: totalLearned + " / " + VOCAB.length },
    { k: "🎯 Today", v: s.reviewedToday + " / " + s.dailyGoal },
  ];
  tiles.forEach(t => {
    const c = el("div", "tile");
    c.appendChild(el("div", "tile-k", t.k));
    c.appendChild(el("div", "tile-v", String(t.v)));
    grid.appendChild(c);
  });
  wrap.appendChild(grid);

  // daily goal progress
  const pct = Math.min(100, Math.round((s.reviewedToday / s.dailyGoal) * 100));
  const bar = el("div", "goalwrap");
  bar.appendChild(el("div", "goal-label", `Daily goal — ${pct}%`));
  const track = el("div", "track");
  track.appendChild(el("div", "fill", "")).style.width = pct + "%";
  bar.appendChild(track);
  wrap.appendChild(bar);

  // level progress overview
  wrap.appendChild(el("h2", "sec", "Progress by level"));
  const lv = el("div", "levelgrid");
  LEVELS.forEach(L => {
    const st = Store.stats(poolFor(L.id));
    const p = st.total ? Math.round((st.learned / st.total) * 100) : 0;
    const card = el("div", "levelcard");
    card.innerHTML = `
      <div class="lc-top"><span class="lc-id">${L.id}</span><span class="lc-pct">${p}%</span></div>
      <div class="lc-name">${esc(L.name.split("—")[1].trim())}</div>
      <div class="track sm"><div class="fill" style="width:${p}%"></div></div>
      <div class="lc-meta">${st.learned}/${st.total} words · ${st.due} due</div>`;
    card.onclick = () => { Store.state.activeLevel = L.id; Store.save(); go("learn"); };
    lv.appendChild(card);
  });
  wrap.appendChild(lv);

  // quick actions
  const cta = el("div", "cta-row");
  cta.appendChild(actionCard("🗂️", "Themes", "Learn topic by topic", () => go("themes")));
  cta.appendChild(actionCard("🃏", "Flashcards", "Spaced-repetition vocab", () => go("learn")));
  cta.appendChild(actionCard("📖", "Grammar", "Lessons A1 → C2", () => go("grammar")));
  cta.appendChild(actionCard("✍️", "Practice", "Quiz & translation", () => go("practice")));
  cta.appendChild(actionCard("🔎", "Vocabulary", "Browse & listen", () => go("vocab")));
  wrap.appendChild(cta);

  if (!Speech.available) {
    wrap.appendChild(el("p", "note", "ℹ️ Your browser has no speech synthesis, so pronunciation audio is disabled."));
  }

  app.appendChild(wrap);
}

function actionCard(icon, title, sub, onClick) {
  const c = el("div", "action");
  c.innerHTML = `<div class="a-ic">${icon}</div><div><div class="a-t">${title}</div><div class="a-s">${sub}</div></div>`;
  c.onclick = onClick;
  return c;
}

/* ---------------- Learn (flashcards / SRS) ---------------- */
function renderLearn() {
  const wrap = el("div", "view");
  wrap.appendChild(el("h1", null, "Flashcards"));
  wrap.appendChild(levelBar(() => renderLearn()));
  const host = el("div", "flashhost");
  wrap.appendChild(host);
  app.appendChild(wrap);
  startSession(host, poolFor(Store.state.activeLevel), Store.state.activeLevel);
}

function startSession(host, pool, label) {
  const queue = Store.buildQueue(pool, { newLimit: 12 });
  host.innerHTML = "";

  if (queue.length === 0) {
    host.appendChild(el("div", "empty",
      `<div class="big">🎉</div><p>Nothing due for <b>${esc(label)}</b> right now. Great job!</p>
       <p class="sub">Come back later, or pick another set to study.</p>`));
    return;
  }

  let idx = 0, flipped = false, correct = 0;
  const total = queue.length;

  const card = el("div", "flashcard");
  const prog = el("div", "flashprog");
  host.appendChild(prog);
  host.appendChild(card);

  function draw() {
    const item = queue[idx];
    prog.innerHTML = `<div class="track sm"><div class="fill" style="width:${Math.round((idx / total) * 100)}%"></div></div>
      <div class="fp-meta">${idx + 1} / ${total} · <span class="chip">${esc(themeName(item.theme))}</span> · ${item.level}</div>`;
    const isNew = !(Store.getCard(item.nl) || {}).learned;
    card.className = "flashcard";
    card.innerHTML = `
      <div class="fc-tag">${isNew ? "new" : "review"}</div>
      <div class="fc-front">
        <div class="fc-word">${item.art ? `<span class="art">${item.art}</span> ` : ""}${esc(item.nl)} ${speakerBtn(item.nl)}</div>
        <div class="fc-pos">${item.pos}</div>
        ${flipped ? `
          <div class="fc-div"></div>
          <div class="fc-en">${esc(item.en)}</div>
          <div class="fc-ex">“${esc(item.ex)}” ${speakerBtn(item.ex)}<br><span class="fc-exen">${esc(item.exEn)}</span></div>
        ` : `<div class="fc-hint">Tap to reveal</div>`}
      </div>`;
    bindSpeakers(card);

    const controls = $(".fc-controls", host);
    if (controls) controls.remove();
    const ctr = el("div", "fc-controls");
    if (!flipped) {
      const btn = el("button", "btn primary wide", "Show answer");
      btn.onclick = flip;
      ctr.appendChild(btn);
    } else {
      [["Again", 0, "again"], ["Hard", 3, "hard"], ["Good", 4, "good"], ["Easy", 5, "easy"]].forEach(([lbl, q, cl]) => {
        const b = el("button", "btn grade " + cl, lbl);
        b.onclick = () => grade(q);
        ctr.appendChild(b);
      });
    }
    host.appendChild(ctr);
  }

  function flip() { flipped = true; if (Speech.available) Speech.say(queue[idx].nl); draw(); }

  function grade(q) {
    Store.review(queue[idx].nl, q);
    if (q >= 4) correct++;
    idx++;
    flipped = false;
    if (idx >= total) return finish();
    draw();
  }

  function finish() {
    host.innerHTML = `<div class="empty">
      <div class="big">✅</div>
      <p>Session complete — <b>${total}</b> cards reviewed.</p>
      <p class="sub">${correct} rated good or easy · +${total * 8} XP earned this run (approx).</p>
      <div class="fc-controls">
        <button class="btn primary" id="again">Study more</button>
        <button class="btn" id="dash">Dashboard</button>
      </div></div>`;
    $("#again", host).onclick = () => startSession(host, pool, label);
    $("#dash", host).onclick = () => go("dashboard");
  }

  card.onclick = () => { if (!flipped) flip(); };
  draw();
}

/* ---------------- Themes (teacher-led topic units) ---------------- */
function renderThemes(id) {
  if (id) return renderThemeLesson(id);
  const wrap = el("div", "view");
  wrap.appendChild(el("h1", null, "Themes"));
  wrap.appendChild(el("p", "sub", "Learn Dutch the way a teacher would organise it — one topic at a time. Each theme has an introduction, key phrases, vocabulary and its own practice."));
  const grid = el("div", "themegrid");
  THEMES.forEach(t => {
    const pool = poolForTheme(t.id);
    const st = Store.stats(pool);
    const p = st.total ? Math.round((st.learned / st.total) * 100) : 0;
    const card = el("div", "themecard");
    card.innerHTML = `
      <div class="tc-ic">${t.icon}</div>
      <div class="tc-body">
        <div class="tc-en">${esc(t.en)}</div>
        <div class="tc-nl">${esc(t.nl)}</div>
        <div class="tc-meta">${st.total} words · ${levelRange(pool)} ${st.learned ? `· <span class="tc-learned">${p}% learned</span>` : ""}</div>
        <div class="track sm"><div class="fill" style="width:${p}%"></div></div>
      </div>`;
    card.onclick = () => go("themes/" + t.id);
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
  app.appendChild(wrap);
}

function renderThemeLesson(id) {
  const t = themeById(id);
  if (!t) return renderThemes();
  const pool = poolForTheme(id).slice().sort((a, b) => {
    const order = LEVELS.map(l => l.id);
    return order.indexOf(a.level) - order.indexOf(b.level);
  });
  const wrap = el("div", "view");
  const back = el("button", "backlink", "‹ All themes");
  back.onclick = () => go("themes");
  wrap.appendChild(back);

  wrap.appendChild(el("div", "theme-head",
    `<span class="th-ic">${t.icon}</span><div><h1>${esc(t.en)}</h1><div class="th-nl">${esc(t.nl)}</div></div>`));

  // Teacher's introduction
  const intro = el("div", "teacher-note");
  intro.innerHTML = `<div class="tn-label">👩‍🏫 Your teacher says</div><p>${t.intro}</p>`;
  wrap.appendChild(intro);

  // Action buttons
  const actions = el("div", "theme-actions");
  const studyBtn = el("button", "btn primary", "🃏 Study these words");
  const quizBtn = el("button", "btn", "✍️ Quick quiz");
  actions.append(studyBtn, quizBtn);
  wrap.appendChild(actions);
  const sessionHost = el("div", "theme-session");
  wrap.appendChild(sessionHost);
  studyBtn.onclick = () => { sessionHost.scrollIntoView({ behavior: "smooth", block: "start" }); startSession(sessionHost, pool, t.en); };
  quizBtn.onclick = () => { sessionHost.scrollIntoView({ behavior: "smooth", block: "start" }); practiceMC(sessionHost, pool, t.en); };

  // Key phrases
  if (t.phrases && t.phrases.length) {
    wrap.appendChild(el("h2", "sec", "Key phrases"));
    const pl = el("div", "phraselist");
    t.phrases.forEach(ph => {
      const row = el("div", "phraserow");
      row.innerHTML = `<div class="ph-nl">${esc(ph.nl)} ${speakerBtn(ph.nl)}</div><div class="ph-en">${esc(ph.en)}</div>`;
      bindSpeakers(row);
      pl.appendChild(row);
    });
    wrap.appendChild(pl);
  }

  // Related grammar
  const rel = GRAMMAR.filter(g => g.theme === id);
  if (rel.length) {
    wrap.appendChild(el("h2", "sec", "Related grammar"));
    const list = el("div", "lessonlist");
    rel.forEach(g => {
      const done = Store.state.grammarDone[g.id];
      const row = el("div", "lessonrow");
      row.innerHTML = `<div class="lr-title">${done ? "✅ " : "📖 "}${esc(g.title)} <span class="lr-lvl">${g.level}</span></div><div class="lr-go">›</div>`;
      row.onclick = () => go("grammar/" + g.id);
      list.appendChild(row);
    });
    wrap.appendChild(list);
  }

  // Vocabulary, grouped by level
  wrap.appendChild(el("h2", "sec", `Vocabulary (${pool.length} words)`));
  const vlist = el("div", "vocablist");
  let currentLevel = null;
  pool.forEach(v => {
    if (v.level !== currentLevel) {
      currentLevel = v.level;
      vlist.appendChild(el("div", "vlevel-head", currentLevel));
    }
    const learned = (Store.getCard(v.nl) || {}).learned;
    const row = el("div", "vrow");
    row.innerHTML = `
      <div class="v-main">
        <div class="v-nl">${v.art ? `<span class="art">${v.art}</span> ` : ""}${esc(v.nl)} ${speakerBtn(v.nl)}
          ${learned ? '<span class="v-learned" title="learned">●</span>' : ""}</div>
        <div class="v-en">${esc(v.en)}</div>
        <div class="v-ex">“${esc(v.ex)}” — ${esc(v.exEn)}</div>
      </div>
      <div class="v-badges"><span class="badge lv">${v.level}</span></div>`;
    bindSpeakers(row);
    vlist.appendChild(row);
  });
  wrap.appendChild(vlist);
  app.appendChild(wrap);
}

/* ---------------- Grammar ---------------- */
function renderGrammar(id) {
  if (id) return renderGrammarLesson(id);
  const wrap = el("div", "view");
  wrap.appendChild(el("h1", null, "Grammar"));
  wrap.appendChild(el("p", "sub", "Structured lessons from beginner to mastery. Each ends with a quick check."));
  LEVELS.forEach(L => {
    const items = GRAMMAR.filter(g => g.level === L.id);
    if (!items.length) return;
    wrap.appendChild(el("h2", "sec", L.name));
    const list = el("div", "lessonlist");
    items.forEach(g => {
      const done = Store.state.grammarDone[g.id];
      const row = el("div", "lessonrow");
      row.innerHTML = `<div class="lr-title">${done ? "✅ " : "📖 "}${esc(g.title)}</div><div class="lr-go">›</div>`;
      row.onclick = () => go("grammar/" + g.id);
      list.appendChild(row);
    });
    wrap.appendChild(list);
  });
  app.appendChild(wrap);
}

function renderGrammarLesson(id) {
  const g = GRAMMAR.find(x => x.id === id);
  if (!g) return renderGrammar();
  const wrap = el("div", "view");
  const back = el("button", "backlink", "‹ All lessons");
  back.onclick = () => go("grammar");
  wrap.appendChild(back);
  wrap.appendChild(el("div", "levelchip", g.level));
  wrap.appendChild(el("h1", null, g.title));
  if (g.tip) {
    const tip = el("div", "teacher-note");
    tip.innerHTML = `<div class="tn-label">👩‍🏫 Teacher's tip</div><p>${g.tip}</p>`;
    wrap.appendChild(tip);
  }
  const body = el("div", "lesson-body");
  body.innerHTML = g.body;
  wrap.appendChild(body);
  bindSpeakers(body);
  // add listen buttons to inline examples
  body.querySelectorAll(".ex").forEach(exs => {
    if (!Speech.available) return;
    const b = el("button", "spk inline", "🔊");
    b.onclick = () => Speech.say(exs.textContent.replace(/\(.+?\)/g, "").trim());
    exs.appendChild(b);
  });

  // quiz
  wrap.appendChild(el("h2", "sec", "Check yourself"));
  const quizHost = el("div", "quiz");
  wrap.appendChild(quizHost);
  app.appendChild(wrap);
  runQuiz(quizHost, g.quiz, () => Store.markGrammar(g.id));
}

function runQuiz(host, questions, onDone) {
  let i = 0, score = 0;
  function draw() {
    if (i >= questions.length) {
      host.innerHTML = `<div class="quiz-done"><b>${score} / ${questions.length}</b> correct.
        ${score === questions.length ? " 🎉 Nailed it!" : " Keep practising!"}</div>`;
      onDone && onDone();
      return;
    }
    const q = questions[i];
    host.innerHTML = `<div class="q-num">Question ${i + 1} of ${questions.length}</div>
      <div class="q-text">${esc(q.q)}</div><div class="q-opts"></div><div class="q-fb"></div>`;
    const opts = $(".q-opts", host);
    q.options.forEach((opt, idx) => {
      const b = el("button", "opt", esc(opt));
      b.onclick = () => {
        if (opts.classList.contains("locked")) return;
        opts.classList.add("locked");
        const right = idx === q.answer;
        if (right) score++;
        Array.from(opts.children).forEach((c, ci) => {
          if (ci === q.answer) c.classList.add("right");
          else if (ci === idx) c.classList.add("wrong");
        });
        $(".q-fb", host).innerHTML =
          `<div class="fb ${right ? "ok" : "no"}">${right ? "✔ Correct." : "✘ Not quite."} ${esc(q.explain)}</div>
           <button class="btn primary" id="next">${i + 1 === questions.length ? "Finish" : "Next"}</button>`;
        $("#next", host).onclick = () => { i++; draw(); };
      };
      opts.appendChild(b);
    });
  }
  draw();
}

/* ---------------- Practice ---------------- */
function renderPractice(mode) {
  const wrap = el("div", "view");
  wrap.appendChild(el("h1", null, "Practice"));
  wrap.appendChild(levelBar(() => renderPractice(mode)));

  const modes = el("div", "modegrid");
  modes.appendChild(modeCard("🔤", "Multiple choice", "Pick the right translation", () => practiceMC(host, poolFor(Store.state.activeLevel), Store.state.activeLevel)));
  modes.appendChild(modeCard("⌨️", "Type the word", "Recall & spell in Dutch", () => practiceType(host)));
  modes.appendChild(modeCard("🧩", "Sentence order", "Rebuild the scrambled sentence", () => practiceOrder(host)));
  if (Speech.available)
    modes.appendChild(modeCard("👂", "Listening / dictation", "Hear it, type it", () => practiceListen(host)));
  modes.appendChild(modeCard("🔁", "Translate a sentence", "EN → NL self-check", () => practiceTranslate(host)));
  wrap.appendChild(modes);

  const host = el("div", "practicehost");
  wrap.appendChild(host);
  app.appendChild(wrap);
}

function modeCard(icon, title, sub, onClick) {
  const c = el("div", "modecard");
  c.innerHTML = `<div class="m-ic">${icon}</div><div class="m-t">${title}</div><div class="m-s">${sub}</div>`;
  c.onclick = () => { document.querySelectorAll(".modecard").forEach(x => x.classList.remove("sel")); c.classList.add("sel"); onClick(); };
  return c;
}

function roundHeader(host, title) {
  host.innerHTML = "";
  host.appendChild(el("div", "round-title", title));
  const body = el("div", "round-body");
  host.appendChild(body);
  return body;
}

// Multiple choice: NL word -> choose EN
function practiceMC(host, pool, label) {
  pool = pool || poolFor(Store.state.activeLevel);
  label = label || Store.state.activeLevel;
  if (pool.length < 4) return roundHeader(host, "Need at least 4 words to make a quiz.");
  const questions = shuffle(pool).slice(0, Math.min(10, pool.length));
  let i = 0, score = 0;
  const body = roundHeader(host, "Multiple choice — " + label);
  function draw() {
    if (i >= questions.length) return roundFinish(body, score, questions.length, () => practiceMC(host, pool, label));
    const item = questions[i];
    const distract = shuffle(pool.filter(p => p.nl !== item.nl)).slice(0, 3);
    const options = shuffle([item, ...distract]);
    body.innerHTML = `<div class="q-num">${i + 1} / ${questions.length} · score ${score}</div>
      <div class="q-text big-word">${item.art ? item.art + " " : ""}${esc(item.nl)} ${speakerBtn(item.nl)}</div>
      <div class="q-opts"></div><div class="q-fb"></div>`;
    bindSpeakers(body);
    const opts = $(".q-opts", body);
    options.forEach(o => {
      const b = el("button", "opt", esc(o.en));
      b.onclick = () => {
        if (opts.classList.contains("locked")) return;
        opts.classList.add("locked");
        const right = o.nl === item.nl;
        if (right) { score++; Store.addXp(5); }
        Array.from(opts.children).forEach(c => {
          if (c.textContent === item.en) c.classList.add("right");
          else if (c === b) c.classList.add("wrong");
        });
        $(".q-fb", body).innerHTML = `<div class="fb ${right ? "ok" : "no"}">${right ? "✔" : "✘ Answer: " + esc(item.en)}. “${esc(item.ex)}”</div>
          <button class="btn primary" id="next">Next</button>`;
        $("#next", body).onclick = () => { i++; draw(); };
      };
      opts.appendChild(b);
    });
  }
  Store.registerStudy();
  draw();
}

// Type the Dutch word for an English prompt
function practiceType(host) {
  const pool = poolFor(Store.state.activeLevel);
  const questions = shuffle(pool).slice(0, Math.min(10, pool.length));
  let i = 0, score = 0;
  const body = roundHeader(host, "Type the word — " + Store.state.activeLevel);
  function draw() {
    if (i >= questions.length) return roundFinish(body, score, questions.length, () => practiceType(host));
    const item = questions[i];
    body.innerHTML = `<div class="q-num">${i + 1} / ${questions.length} · score ${score}</div>
      <div class="q-text">Dutch for: <b>${esc(item.en)}</b></div>
      <div class="typerow"><input class="typein" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="type in Dutch…"></div>
      <div class="q-fb"></div>
      <button class="btn primary" id="check">Check</button>`;
    const input = $(".typein", body);
    input.focus();
    function check() {
      const ans = normalize(input.value);
      if (!ans) return;
      const target = normalize(item.nl);
      const targetNoArt = normalize(item.nl.replace(/^\(.*?\)\s*/, ""));
      const right = ans === target || ans === targetNoArt || (item.art && ans === normalize(item.art + " " + item.nl));
      if (right) { score++; Store.addXp(6); }
      $(".q-fb", body).innerHTML = `<div class="fb ${right ? "ok" : "no"}">${right ? "✔ Correct!" : "✘ Answer: <b>" + (item.art ? item.art + " " : "") + esc(item.nl) + "</b>"} ${speakerBtn(item.nl)}</div>`;
      bindSpeakers(body);
      const btn = $("#check", body);
      btn.textContent = "Next";
      btn.onclick = () => { i++; draw(); };
      input.disabled = true;
    }
    $("#check", body).onclick = check;
    input.addEventListener("keydown", e => { if (e.key === "Enter") { if (input.disabled) { i++; draw(); } else check(); } });
  }
  Store.registerStudy();
  draw();
}

// Sentence scramble
function practiceOrder(host) {
  const bank = SENTENCES.filter(s => s.level === Store.state.activeLevel);
  const source = bank.length ? bank : SENTENCES;
  const questions = shuffle(source).slice(0, Math.min(6, source.length));
  let i = 0, score = 0;
  const body = roundHeader(host, "Sentence order — " + Store.state.activeLevel);
  function draw() {
    if (i >= questions.length) return roundFinish(body, score, questions.length, () => practiceOrder(host));
    const s = questions[i];
    const words = s.nl.replace(/\.$/, "").split(" ");
    let chosen = [];
    let bankWords = shuffle(words);
    body.innerHTML = `<div class="q-num">${i + 1} / ${questions.length} · score ${score}</div>
      <div class="q-text">Build: <b>${esc(s.en)}</b></div>
      <div class="answerline"></div><div class="wordbank"></div><div class="q-fb"></div>
      <div class="order-ctr"><button class="btn ghost" id="reset">↺ Reset</button><button class="btn primary" id="check">Check</button></div>`;
    const answerline = $(".answerline", body), wb = $(".wordbank", body);
    function renderWords() {
      answerline.innerHTML = chosen.map((w, idx) => `<button class="tok chosen" data-ci="${idx}">${esc(w)}</button>`).join("") || `<span class="ph">tap words below…</span>`;
      wb.innerHTML = bankWords.map((w, idx) => `<button class="tok" data-bi="${idx}">${esc(w)}</button>`).join("");
      answerline.querySelectorAll("[data-ci]").forEach(b => b.onclick = () => {
        const ci = +b.dataset.ci; bankWords.push(chosen[ci]); chosen.splice(ci, 1); renderWords();
      });
      wb.querySelectorAll("[data-bi]").forEach(b => b.onclick = () => {
        const bi = +b.dataset.bi; chosen.push(bankWords[bi]); bankWords.splice(bi, 1); renderWords();
      });
    }
    renderWords();
    $("#reset", body).onclick = () => { chosen = []; bankWords = shuffle(words); renderWords(); };
    $("#check", body).onclick = () => {
      const attempt = chosen.join(" ");
      const right = normalize(attempt) === normalize(s.nl);
      if (right) { score++; Store.addXp(8); }
      $(".q-fb", body).innerHTML = `<div class="fb ${right ? "ok" : "no"}">${right ? "✔ Perfect!" : "✘ Correct: <b>" + esc(s.nl) + "</b>"} ${speakerBtn(s.nl)}</div>`;
      bindSpeakers(body);
      const btn = $("#check", body); btn.textContent = "Next"; btn.onclick = () => { i++; draw(); };
    };
  }
  Store.registerStudy();
  draw();
}

// Listening / dictation
function practiceListen(host) {
  const bank = SENTENCES.filter(s => s.level === Store.state.activeLevel);
  const source = bank.length ? bank : SENTENCES;
  const questions = shuffle(source).slice(0, Math.min(6, source.length));
  let i = 0, score = 0;
  const body = roundHeader(host, "Listening / dictation — " + Store.state.activeLevel);
  function draw() {
    if (i >= questions.length) return roundFinish(body, score, questions.length, () => practiceListen(host));
    const s = questions[i];
    body.innerHTML = `<div class="q-num">${i + 1} / ${questions.length} · score ${score}</div>
      <div class="q-text">Listen and type what you hear:</div>
      <div class="listen-ctr"><button class="btn primary big-play" id="play">▶ Play</button><button class="btn ghost" id="slow">🐢 Slow</button></div>
      <div class="typerow"><input class="typein" autocomplete="off" spellcheck="false" placeholder="type the Dutch sentence…"></div>
      <div class="q-fb"></div><button class="btn primary" id="check">Check</button>`;
    const input = $(".typein", body);
    $("#play", body).onclick = () => Speech.say(s.nl);
    $("#slow", body).onclick = () => { const u = new SpeechSynthesisUtterance(s.nl); u.lang = "nl-NL"; if (Speech.voice) u.voice = Speech.voice; u.rate = 0.6; speechSynthesis.cancel(); speechSynthesis.speak(u); };
    Speech.say(s.nl);
    function check() {
      const right = normalize(input.value) === normalize(s.nl);
      if (right) { score++; Store.addXp(10); }
      $(".q-fb", body).innerHTML = `<div class="fb ${right ? "ok" : "no"}">${right ? "✔ Correct!" : "✘ It was: <b>" + esc(s.nl) + "</b>"}<br><span class="fc-exen">${esc(s.en)}</span></div>`;
      const btn = $("#check", body); btn.textContent = "Next"; input.disabled = true; btn.onclick = () => { i++; draw(); };
    }
    $("#check", body).onclick = check;
    input.addEventListener("keydown", e => { if (e.key === "Enter") { if (input.disabled) { i++; draw(); } else check(); } });
  }
  Store.registerStudy();
  draw();
}

// Translate EN->NL, self-graded
function practiceTranslate(host) {
  const bank = SENTENCES.filter(s => s.level === Store.state.activeLevel);
  const source = bank.length ? bank : SENTENCES;
  const questions = shuffle(source).slice(0, Math.min(6, source.length));
  let i = 0;
  const body = roundHeader(host, "Translate — " + Store.state.activeLevel);
  function draw() {
    if (i >= questions.length) { body.innerHTML = `<div class="quiz-done">Round complete! 🎉</div><button class="btn primary" id="again">Again</button>`; $("#again", body).onclick = () => practiceTranslate(host); return; }
    const s = questions[i];
    body.innerHTML = `<div class="q-num">${i + 1} / ${questions.length}</div>
      <div class="q-text">Translate to Dutch:<br><b>${esc(s.en)}</b></div>
      <div class="typerow"><textarea class="typein ta" rows="2" placeholder="write your Dutch translation…"></textarea></div>
      <div class="q-fb"></div><button class="btn primary" id="reveal">Reveal answer</button>`;
    $("#reveal", body).onclick = () => {
      const mine = $(".typein", body).value.trim();
      const auto = mine && normalize(mine) === normalize(s.nl);
      $(".q-fb", body).innerHTML = `<div class="fb ${auto ? "ok" : "neutral"}">Model answer: <b>${esc(s.nl)}</b> ${speakerBtn(s.nl)}
        ${mine ? `<div class="yours">Yours: “${esc(mine)}”${auto ? " ✔ exact match!" : ""}</div>` : ""}</div>
        <div class="selfgrade">How did you do?
          <button class="btn grade good" id="gotit">Got it (+8)</button>
          <button class="btn grade hard" id="close">Close (+3)</button>
          <button class="btn grade again" id="missed">Missed</button></div>`;
      bindSpeakers(body);
      $("#gotit", body).onclick = () => { Store.addXp(8); Store.registerStudy(); i++; draw(); };
      $("#close", body).onclick = () => { Store.addXp(3); Store.registerStudy(); i++; draw(); };
      $("#missed", body).onclick = () => { i++; draw(); };
    };
  }
  draw();
}

function roundFinish(body, score, total, again) {
  body.innerHTML = `<div class="quiz-done"><div class="big">${score === total ? "🏆" : "✅"}</div>
    <b>${score} / ${total}</b> correct.</div>
    <button class="btn primary" id="again">Play again</button>
    <button class="btn" id="dash">Back</button>`;
  $("#again", body).onclick = again;
  $("#dash", body).onclick = () => go("dashboard");
}

/* ---------------- Vocabulary browser ---------------- */
function renderVocab() {
  const wrap = el("div", "view");
  wrap.appendChild(el("h1", null, "Vocabulary"));
  wrap.appendChild(el("p", "sub", `${VOCAB.length} words across all levels. Search, filter and listen.`));

  const controls = el("div", "vocab-controls");
  const search = el("input", "vsearch");
  search.placeholder = "Search Dutch or English…";
  const levelSel = el("select", "vsel");
  levelSel.innerHTML = `<option value="">All levels</option>` + LEVELS.map(L => `<option>${L.id}</option>`).join("");
  const themeSel = el("select", "vsel");
  themeSel.innerHTML = `<option value="">All themes</option>` +
    THEMES.filter(t => poolForTheme(t.id).length).map(t => `<option value="${t.id}">${esc(t.en)}</option>`).join("");
  controls.append(search, levelSel, themeSel);
  wrap.appendChild(controls);

  const list = el("div", "vocablist");
  wrap.appendChild(list);
  app.appendChild(wrap);

  function refresh() {
    const q = normalize(search.value);
    const lv = levelSel.value, th = themeSel.value;
    const rows = VOCAB.filter(v =>
      (!lv || v.level === lv) && (!th || v.theme === th) &&
      (!q || normalize(v.nl).includes(q) || normalize(v.en).includes(q)));
    list.innerHTML = rows.length ? "" : `<div class="empty"><p>No matches.</p></div>`;
    rows.forEach(v => {
      const learned = (Store.getCard(v.nl) || {}).learned;
      const row = el("div", "vrow");
      row.innerHTML = `
        <div class="v-main">
          <div class="v-nl">${v.art ? `<span class="art">${v.art}</span> ` : ""}${esc(v.nl)} ${speakerBtn(v.nl)}
            ${learned ? '<span class="v-learned" title="learned">●</span>' : ""}</div>
          <div class="v-en">${esc(v.en)}</div>
          <div class="v-ex">“${esc(v.ex)}” — ${esc(v.exEn)}</div>
        </div>
        <div class="v-badges"><span class="badge lv">${v.level}</span><span class="badge th">${esc(themeName(v.theme))}</span></div>`;
      bindSpeakers(row);
      list.appendChild(row);
    });
  }
  search.addEventListener("input", refresh);
  levelSel.addEventListener("change", refresh);
  themeSel.addEventListener("change", refresh);
  refresh();
}

/* ---------------- Boot ---------------- */
function boot() {
  Store.load();
  Speech.init();
  // nav
  document.querySelectorAll(".navlink").forEach(l =>
    l.addEventListener("click", e => { e.preventDefault(); go(l.dataset.route); }));
  $("#resetBtn").addEventListener("click", () => {
    if (confirm("Reset ALL progress? This cannot be undone.")) { Store.reset(); router(); }
  });
  window.addEventListener("hashchange", router);
  router();
}
document.addEventListener("DOMContentLoaded", boot);
})();
