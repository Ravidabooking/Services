# RaVida — Medical & Holistic Clinic

A static, single-page service catalog for RaVida Medical & Holistic Clinic:
Aesthetic and Beauty, Physio and Recovery, Medical Services, and Wellness and Holistic,
each with subcategories and expandable service details.

No build step — plain HTML, CSS, and JavaScript.

## Files

- `index.html` — entry point
- `styles.css` — brand styling (charcoal/black background, gold accent, white/gray text)
- `data.js` — all service categories, subcategories, and items
- `app.js` — navigation and accordion logic
- `logo.jpeg` — clinic logo

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Source**, select the branch (e.g. `main`) and root folder.
4. Save — your site will be live at `https://<username>.github.io/<repo-name>/`.

## Editing content

All service copy lives in `data.js` as a plain JavaScript object — edit titles,
subtitles, bullet points, or badges there without touching any other file.
