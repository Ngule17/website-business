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
| **Flashcards** | Spaced-repetition (SM-2) vocabulary. Grade each card *Again / Hard / Good / Easy* and the scheduler decides when you see it next. |
| **Grammar** | 14 lessons from *de/het* and word order up to relative clauses, the passive, and C2 register — each with a self-check quiz. |
| **Practice** | Five modes: multiple choice, type-the-word, sentence scramble, listening/dictation, and EN→NL translation. |
| **Vocabulary** | Browse/search all 137 seed words, filter by level & theme, hear each one. |

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
- `VOCAB` — words `{nl, en, level, theme, art, pos, ex, exEn}`
- `GRAMMAR` — lessons with an HTML `body` and a `quiz`
- `SENTENCES` — sentence bank for translation/dictation

Add entries there and they appear automatically — the engine (`store.js`,
`app.js`) is content-agnostic. This seed set is a solid foundation; you can grow
it toward the several-thousand-word vocabulary a real C1/C2 needs.

## Files

```
dutch/
  index.html      app shell + navigation
  css/app.css     styling (dark & light, responsive)
  js/data.js      the curriculum (edit to add content)
  js/store.js     progress storage + SM-2 spaced repetition
  js/app.js       UI, routing, and all study modes
```
