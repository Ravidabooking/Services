# RaVida — Medical & Holistic Clinic

A static, single-page service catalog for RaVida Medical & Holistic Clinic:
Aesthetic and Beauty, Physio and Recovery, Medical Services, and Wellness and Holistic,
each with subcategories and expandable service details — plus a built-in Admin Mode
for editing everything live in the browser.

No build step — plain HTML, CSS, and JavaScript.

## Files

- `index.html` — entry point
- `styles.css` — brand styling (charcoal/black background, gold accent, white/gray text)
- `admin.css` — styling for Admin Mode (login modal, toolbar, side panels)
- `data.js` — all service categories, subcategories, items, and theme settings
- `app.js` — navigation, rendering, and theme application
- `admin.js` — Admin Mode: login, live editing, GitHub publishing
- `logo.jpeg` — clinic logo (default; replaceable in Admin Mode)

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, select **Deploy from a branch**, pick the branch (e.g. `main`) and root folder.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`.

## Admin Mode

Admin Mode lets you edit the live site from the browser — no code required for
day-to-day changes.

### Logging in

Either:
- Click the small "RaVida Medical & Holistic Clinic" footer text on the home
  screen **5 times quickly**, or
- Visit the site with `?admin=1` added to the URL (e.g. `yoursite.com/?admin=1`)

Then log in with:
- **Email:** `admin@shift.com`
- **Password:** `Admin14321432`

**Important:** this is a soft gate, not real security. The credentials live in
`admin.js`, which is publicly visible source code — it keeps casual visitors
from poking around, but don't rely on it to protect anything sensitive. You
can change the email/password by editing the `ADMIN_EMAIL` and
`ADMIN_PASSWORD` constants near the top of `admin.js`.

### What you can do once logged in

- **Edit Content** (toggle in the toolbar) — click into any title, subtitle,
  bullet, or tagline to edit it directly on the page. Click category icons to
  swap them from a built-in icon set or paste custom SVG. Click the logo to
  replace it. Add/remove subcategories, services, and bullet points with the
  `+` / `×` buttons that appear.
- **Theme & Style** — colors, fonts, font sizes, logo size, and background
  (solid color, image upload, or a hosted video URL).
- **Publish** — either:
  - **Publish to GitHub** directly, using a Personal Access Token (see below), or
  - **Download data.js** and upload it to your repo manually.

### Publishing directly to GitHub

1. Generate a token at GitHub → Settings → Developer settings → Personal
   access tokens → Tokens (classic) → select the `repo` scope.
2. In the Publish panel, enter your repo owner (e.g. `Ravidabooking`), repo
   name (e.g. `Services`), branch (`main`), and the token.
3. Click **Publish data.js to GitHub**. GitHub Pages will rebuild automatically
   — changes go live in about a minute.

The token is stored only in your browser's local storage; it's never sent
anywhere except directly to GitHub's API.

**Note:** uploaded images are embedded directly into `data.js` as base64 data,
so keep them small (roughly under 300KB each) — GitHub's file API has a 1MB
limit per file. For background video, paste a URL to a hosted video instead
of uploading a file.

### Exiting

Click **Exit Admin** in the toolbar. This ends the session in your browser;
log back in anytime with the same steps.

## Editing content directly (no Admin Mode)

All service copy and theme settings live in `data.js` as a plain JavaScript
object — you can also edit titles, subtitles, bullet points, badges, and
colors there directly without touching any other file.
