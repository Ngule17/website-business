# AI Workforce

A web app that hosts **AI employees and agents**. Browse a directory of
specialized AI agents (sales, support, content, data, engineering, recruiting),
hire them into your workspace with one click, and chat with them to get work
done — 24/7.

## Features

- **Agent directory** — six specialized AI employees, each with a role,
  department, skill set, and persona. Filter by department.
- **Agent profiles** — full description, skills, and a hire / chat panel.
- **One-click hiring** — add agents to your workspace; team state persists in
  your browser (`localStorage`).
- **Workspace** — see your hired team and jump straight into any conversation.
- **Live chat** — talk to each agent through a chat interface with role-aware
  starter prompts and a typing indicator.
- **Real Claude API or demo mode** — add your Anthropic API key in **Settings**
  and agents respond live via the Claude API (called directly from the browser).
  With no key, the app runs in demo mode with simulated, role-flavored replies,
  so it's fully functional out of the box.
- **Responsive dark UI** — self-contained, no build step, no external assets.

## Running it

It's a static site — open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Enabling live AI responses

1. Go to **Settings**.
2. Paste your Anthropic API key (`sk-ant-…`). It is stored only in your browser
   and sent only to Anthropic.
3. Pick a model and save. Your agents now respond live.

## Project structure

```
index.html            App shell + navigation
assets/css/app.css     Styling (dark, responsive, no framework)
assets/js/data.js      Agent catalog (roles, skills, personas)
assets/js/store.js     Persistent state (localStorage)
assets/js/api.js       Chat backend — Claude API + demo fallback
assets/js/app.js       SPA router and views
```

Built with vanilla HTML, CSS, and JavaScript — no dependencies, no build tools.
