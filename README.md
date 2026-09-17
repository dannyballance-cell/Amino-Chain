# Amino Chain Performance — static site export

This is a plain, self-contained HTML/CSS/JS export of your site, ready for GitHub Pages
(or any other static host). It has no backend, so a few things work differently than the
version you tested inside Claude — see "What's different" below.

## What's in here

- `index.html` — the whole site (one file: HTML, CSS, and JS)
- `assets/hero-brand.jpg` — hero background image
- `assets/pillars-strip.jpg` — Rebuild / Restore / Outperform banner image

Stock status was pulled from what you'd actually set on the live site as of today:
Vitamin D3, Vitamin C, Vitamin B12, Vitamin B6, Folate (B9), and Iodine are marked
**In stock**; everything else is **Coming soon**.

## Deploy it to GitHub Pages (step by step)

1. Go to [github.com/new](https://github.com/new) and create a new repository. Name it
   whatever you like (e.g. `amino-chain-site`). Keep it **Public** — GitHub Pages on a
   free account requires a public repo. Don't add a README, .gitignore, or license —
   just create the empty repo.
2. On the new repo's page, click **uploading an existing file** (or drag and drop).
3. Drag in `index.html` and the whole `assets` folder from this export, keeping the
   same structure (assets folder stays a folder, not flattened). Commit the upload.
4. Go to the repo's **Settings** tab → **Pages** (left sidebar).
5. Under "Build and deployment" → "Source," choose **Deploy from a branch**. Under
   "Branch," choose `main` and folder `/ (root)`, then **Save**.
6. Wait a minute or two, then refresh that Pages settings page — it'll show you the
   live URL, something like `https://<your-username>.github.io/amino-chain-site/`.

That URL is public and shareable with anyone — no sign-in required to view it.

## What's different from the version you tested in Claude

- **Waitlist form & "Request to order" buttons** now open the visitor's own email app
  with a pre-filled message to aminochain2026@gmail.com, instead of writing to a live
  database. This depends on the visitor having an email app configured, same as we
  found when testing the order button earlier. If you want a proper "fill out and
  submit" experience that doesn't depend on that, the next step is hooking the forms
  up to a free form service (e.g. Formspree) — just say the word and I'll wire it in.
- **No admin drag-and-drop, no live photo upload, no Order Requests log, no COA
  upload form.** Those all needed a live backend. Going forward, to change anything —
  swap a photo, update stock status, add or remove a product, add a COA — tell me
  what changed and I'll update this file and hand you a fresh export to re-upload
  (or, if you'd rather, I can walk you through editing it yourself; it's plain HTML).
- **Vitamin B12's product photo didn't carry over** — you'd uploaded one while testing,
  but it lives in Claude's storage and isn't something this export can reach. Send me
  the image file whenever you'd like it added back in.
