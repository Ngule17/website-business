# Spotlight Home Services — automated lead generation

A static two-sided lead-generation site for home services (cleaning, lawn care, pressure washing, plumbing, HVAC, electrical, handyman). It captures leads **without any manual sales work** and runs on free static hosting — no server, no database.

## The model (two funnels, one site)

**Homeowner side (`#quote`)** — a homeowner picks a service, describes the job, and leaves name/phone/email. Every submission is a qualified job request with contact details. You can:
- fulfill the job with your own crew, or
- sell/route it to a local pro (exclusive leads in these trades typically sell for $15–$100+ depending on trade and ticket size).

**Pro side (`#pros`)** — home services businesses sign up to receive leads in their area. This builds the buyer list for the leads the homeowner side generates. Pay-per-lead, no subscription — an easy yes for a small contractor.

Both funnels are automated:
1. Instant auto-confirmation email to the person who submitted (via the form backend's autoresponder).
2. Every submission emailed to you, tagged **HOMEOWNER lead** or **PRO signup** in the subject line so you can sort at a glance.
3. Client-side validation and a honeypot spam trap keep junk out.

Your only manual step is matching: forward the homeowner's job to a pro on your list (or quote it yourself).

## One-time setup (about 3 minutes)

The forms use [Web3Forms](https://web3forms.com) — a free service that emails submissions to you.

1. Go to <https://web3forms.com>, enter your email (`spotlightcommunicationz@gmail.com`), and copy the **Access Key** they send you.
2. In `index.html`, replace **both** occurrences of the placeholder (one per form):
   ```html
   <input type="hidden" name="access_key" value="YOUR-WEB3FORMS-ACCESS-KEY">
   ```
3. (Optional) Turn on the **autoresponder** in the Web3Forms dashboard so submitters get an instant branded confirmation.

Until the key is added, the forms show a friendly "not connected yet" message instead of failing silently.

## Deploying

Static files — any host works. Fastest option, GitHub Pages:

1. Repo **Settings → Pages → Build and deployment → Deploy from a branch**, pick your branch, root folder.
2. Live at `https://<username>.github.io/<repo>/`.

## Getting traffic

The site converts visitors; you still need visitors. The channels that work for local home services:

- **Google Business Profile** — free and the single highest-intent channel for "house cleaning near me" searches.
- **Local SEO** — add your city/metro name to the page title, hero, and copy once you pick a launch market. One page per city scales this ("rank and rent" style).
- **Google Local Services / Ads** — pointed at `#quote`; the service cards pre-qualify clicks.
- **Nextdoor & local Facebook groups** — free demand for cleaning/lawn/pressure-washing requests.

Start with **one metro and 2–3 trades**, prove lead flow, then widen.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page: hero, service grid, how-it-works, homeowner form, pro signup, FAQ |
| `styling.css` | Full visual design (pine green / paper / amber palette) |
| `js/leadform.js` | Validation, submission, spam trap, inline status — wired to both forms |
| `css/`, `js/`, `fonts/` | Bootstrap 3 assets |
| `images/` | Legacy logo and icons (no longer referenced) |
