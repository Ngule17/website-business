# AI Workforce

A web app that hosts **AI employees and agents**. Browse a directory of
specialized AI agents (sales, support, content, data, engineering, recruiting),
hire them into your workspace with one click, and chat with them to get work
done — 24/7.

## Features

- **Agent directory** — six specialized AI employees, each with a role,
  department, skill set, and persona. Filter by department.
- **Autonomous missions** — give an agent a goal and it works on its own: it
  reasons, **decides**, takes **actions**, observes the results, and repeats
  until it's done — logging every decision to a live timeline.
- **Real actions with side effects** — agent decisions produce visible output in
  your workspace: emails in the **Outbox**, leads in the **CRM**, follow-ups on
  the **Tasks** board, and items in the **Human review** queue when a decision
  is above the agent's authority.
- **Operations dashboard** — one place to review everything your agents
  produced, tabbed by Outbox / CRM / Tasks / Human review.
- **One-click hiring** — add agents to your workspace; all state persists in
  your browser (`localStorage`).
- **Live chat** — talk to each agent with role-aware starter prompts.
- **Real Claude API or demo mode** — add your Anthropic API key in **Settings**
  and agents reason live via the Claude API (tool-use loop, called directly from
  the browser). With no key, a role-aware simulator drives the same actions so
  the autonomy is fully visible out of the box.
- **Simulate vs Real execution** — actions run through pluggable adapters. In
  **Simulate** mode they stay inside the app (safe to run and demo). Switch to
  **Real** mode and drop integration adapters into `tools.js` (Gmail, Slack, a
  CRM API…) to have agents act on live systems — the agent loop is unchanged.
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
assets/js/tools.js     Agent tools + pluggable action adapters (simulate/real)
assets/js/agent.js     Autonomous runtime — Claude tool-use loop + simulator
assets/js/app.js       SPA router and views
```

## How autonomy works

1. You assign a hired agent a **goal** (a mission).
2. `agent.js` runs a loop: the agent reasons, chooses a **tool** to call
   (`send_email`, `add_lead`, `create_task`, `escalate_to_human`, `finish`, …),
   executes it, observes the result, and continues until it calls `finish`.
3. With an API key set, the loop is a real Claude **tool-use** conversation. With
   no key, a role-aware simulator drives the same tools so the flow is visible.
4. Every tool runs through an adapter chosen by the execution mode, so the exact
   same agent works whether it's simulating or acting on real systems.

Built with vanilla HTML, CSS, and JavaScript — no dependencies, no build tools.
