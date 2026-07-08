# Leer Nederlands — Dutch to C-level 🇳🇱

A self-contained web app to learn and practise Dutch from **A1 to C2 (CEFR)**.
No backend, no build step, no accounts — everything runs in the browser and
your progress is saved locally on your device.

## Open it

Just open `dutch/index.html` in any modern browser. To host it (e.g. GitHub
Pages), serve the `dutch/` folder — the app is the `index.html` inside it.

Because it uses browser `localStorage`, opening the file directly works, but for
the most reliable experience you can serve it locally:

```bash
cd dutch
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What's inside

| Section | What it does |
|---|---|
| **Dashboard** | Streak, XP, daily goal, and per-level progress (A1–C2). |
| **Themes** | 24 topic units (Greetings, Food, Travel, Work, Society, Idioms…), each taught like a teacher: an introduction in a teaching voice, key phrases, related grammar, and vocabulary grouped by level — with "Study these words" and "Quick quiz" built in. |
| **Flashcards** | Spaced-repetition (SM-2) vocabulary. Grade each card *Again / Hard / Good / Easy* and the scheduler decides when you see it next. |
| **Reading** | 7 graded passages (A2→C2) — a day out, market life, working in NL, the housing shortage, digital privacy, a tech essay, a sustainability column — each with a teacher intro, read-aloud, a glossary and comprehension questions. |
| **Grammar** | 24 lessons from *de/het* and word order up to relative clauses, the passive, and C2 register — each opens with a **teacher's tip** and ends with a self-check quiz. |
| **Practice** | Five modes: multiple choice, type-the-word, sentence scramble, listening/dictation, and EN→NL translation. |
| **Vocabulary** | Browse/search 430+ words, filter by level & theme, hear each one. |

## Pronunciation

The app uses your browser's built-in **Dutch (nl-NL) speech synthesis** for
audio. Most desktop browsers include a Dutch voice; if yours doesn't, audio
buttons simply won't play (everything else still works). On Chrome/Edge and
Safari a Dutch voice is available by default.

## How the learning is structured

- **Learn new words** with flashcards — the SM-2 algorithm spaces reviews so
  words move into long-term memory efficiently.
- **Study grammar** lesson-by-lesson; each ends with a quiz that marks the
  lesson complete and awards XP.
- **Practise actively** with the five drill modes — recall and production, not
  just recognition, which is what gets you to B2/C1.
- **Track progress** on the dashboard; keep the daily streak going.

### Suggested path to C-level
1. Finish A1 & A2 flashcards + all A1/A2 grammar lessons.
2. Add B1/B2 vocab daily; do "type the word" and "translate" drills for
   production.
3. At B2→C1, focus on the connector/nuance vocabulary, idioms, and the advanced
   grammar (er, passive, relative clauses, register).
4. Use listening/dictation every session — comprehension is the hardest part of
   the C exams.

## Extending the content

All curriculum lives in `js/data.js` as plain arrays:
- `THEMES` — topic units `{id, icon, en, nl, intro, phrases[]}` (the teacher's syllabus)
- `VOCAB` — words `{nl, en, level, theme, art, pos, ex, exEn}` (theme = a THEME id)
- `GRAMMAR` — lessons with a `tip`, an HTML `body`, a `theme` and a `quiz`
- `SENTENCES` — sentence bank for translation/dictation, tagged by theme
- `READINGS` — graded passages `{id, level, theme, title, intro, text[], glossary[], questions[]}`

Add entries there and they appear automatically — the engine (`store.js`,
`app.js`) is content-agnostic. To add a whole new topic, add one entry to
`THEMES` and tag words with its `id`. The current set (24 themes, 430+ words,
24 grammar lessons, 7 reading passages) is a solid foundation; keep growing it toward the
several-thousand-word vocabulary a real C1/C2 needs.

## Files

```
dutch/
  index.html      app shell + navigation
  css/app.css     styling (dark & light, responsive)
  js/data.js      the curriculum (edit to add content)
  js/store.js     progress storage + SM-2 spaced repetition
  js/app.js       UI, routing, and all study modes
```
