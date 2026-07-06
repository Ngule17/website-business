# Automated lead generation website

A static landing page that turns visitors into qualified leads **without any manual sales work**. There is no server to run and no database to maintain — the whole pipeline works on plain static hosting (GitHub Pages, Netlify, Cloudflare Pages, etc.).

## How it removes manual selling

The site is designed so a stranger can go from "just looking" to "booked lead" on their own:

1. **Transparent pricing** (`#pricing`) — the packages and starting prices are on the page, so nobody has to get on a call just to find out what it costs. This is the single biggest thing that removes "manual sales."
2. **Self-qualifying form** (`#quote`) — the form asks for budget, timeline, and package interest, so every lead arrives already qualified. You reply to good-fit leads and skip the rest.
3. **Instant auto-reply** — the moment someone submits, they get a confirmation email automatically (via the form backend's autoresponder). No first-touch effort from you.
4. **Owner notification** — every submission is emailed straight to you, so you just reply when a good lead lands in your inbox.

## One-time setup (about 3 minutes)

The form uses [Web3Forms](https://web3forms.com) — a free service that emails form submissions to you. It needs no account backend beyond an access key.

1. Go to <https://web3forms.com>, enter your email (`spotlightcommunicationz@gmail.com`), and copy the **Access Key** they send you.
2. In `index.html`, find this line and paste your key in place of the placeholder:
   ```html
   <input type="hidden" name="access_key" value="YOUR-WEB3FORMS-ACCESS-KEY">
   ```
3. (Optional) Turn on the **autoresponder** in your Web3Forms dashboard so prospects get an instant branded confirmation email.

That's it. Until the key is added, the form shows a friendly "not connected yet" message instead of failing silently.

## Deploying

It's static files, so any static host works. Fastest option — GitHub Pages:

1. Push this repo to GitHub.
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**, pick your branch, root folder.
3. Your site is live at `https://<username>.github.io/<repo>/`.

## Getting traffic (the other half of "leads without sales")

The site converts traffic; it doesn't create it. Cheap, low-effort channels that pair well with a fixed-price service:

- **Google Business Profile** + a few local directories — free, and ranks for "web designer near me".
- **Basic SEO** — the page already has a title and meta description; add a real portfolio and location text.
- **A simple Google Ads campaign** pointed at `#quote` — because pricing is public, the ad can pre-qualify clicks.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page: hero, how-it-works, pricing, lead form, FAQ |
| `styling.css` | Styles for all sections |
| `js/leadform.js` | Form validation, submission, spam trap, inline success/error |
| `css/`, `js/`, `fonts/` | Bootstrap 3 assets |
| `images/` | Logo and section icons |
