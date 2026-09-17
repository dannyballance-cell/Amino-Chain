# Amino Chain Performance — static site + admin backend

This site is deployed on Netlify from this GitHub repo. It's a plain static
site (`index.html`) with a small serverless backend (Netlify Functions +
Netlify Blobs storage) that gives you real, in-browser admin tools: drag to
reorder products, click to change stock status, click a photo to upload a
new one, and remove/restore products — no code editing required.

## What's in here

- `index.html` — the whole public site (HTML, CSS, and JS in one file)
- `assets/hero-brand.jpg`, `assets/pillars-strip.jpg` — site images
- `netlify/functions/` — the serverless backend:
  - `login.js` / `logout.js` / `check-auth.js` — password-based admin session
  - `get-products.js` / `save-products.js` — reads/writes the live product
    catalog (stored in Netlify Blobs, a built-in key-value store — no
    database to set up)
  - `upload-photo.js` / `get-photo.js` — stores and serves product photos
  - `products-data.js` — the starting catalog, used only the first time the
    site runs (before you've saved anything from the admin panel)
- `netlify.toml`, `package.json` — build/config for Netlify

## One-time setup: set your admin password

The admin panel is protected by a single password you choose — Netlify has
no separate login system, so this keeps it simple.

1. Go to your site in Netlify → **Project configuration** → **Environment
   variables**.
2. Add a variable named `ADMIN_PASSWORD` with whatever password you want to
   use to sign in as admin. Keep it somewhere safe (like a password manager)
   — there's no "forgot password" flow.
3. (Optional but recommended) Add a second variable named `SESSION_SECRET`
   set to any long random string — this is used to sign your admin session
   so it can't be forged. If you skip this, the site falls back to using
   your admin password for that too, which still works but is slightly
   weaker.
4. Click **Save**, then trigger a new deploy (Netlify usually does this
   automatically after you save env vars — if not, go to **Deploys** →
   **Trigger deploy** → **Deploy site**).

## Using the admin panel

1. Open your live site and scroll to the very bottom — click the small
   **Admin** link next to the copyright line.
2. Enter the password you set as `ADMIN_PASSWORD`.
3. Once signed in you'll see a toolbar above the catalog and each product
   row gets new controls:
   - **Drag a row** up or down to reorder it within its category.
   - **Click a product's photo** to upload a new one (max 5MB).
   - **Click the status pill** (e.g. "Coming soon") to cycle it through
     Coming soon → In stock → Low stock → Out of stock.
   - **Click Remove** on a row to pull it from the public catalog (it moves
     to a "Removed products" panel where you can restore it any time).
   - Drag a row onto the **trash zone** below the catalog as another way to
     remove it.
4. Click **Save changes** to publish everything to the live site. Changes
   aren't public until you save.
5. Click **Sign out** when you're done. Your session also expires on its
   own after 12 hours.

Anyone without the password just sees the normal public site — no admin
controls, no sign-in prompt anywhere visible unless they click that small
Admin link.

## Deploying changes to the code itself

For anything beyond what the admin panel covers (new sections, copy
changes, design tweaks), edit the files and push to this repo's `main`
branch — Netlify redeploys automatically within a minute or two.

## Notes

- **Waitlist form & "Request to order" buttons** still open the visitor's
  own email app addressed to aminochain2026@gmail.com. That part doesn't
  need a backend and works the same as before.
- **Certificates of Analysis** are still a static placeholder for now (no
  admin upload yet) — say the word if you'd like that added the same way
  the product photos work.
- **Vitamin B12's original product photo** didn't carry over from earlier
  testing — just upload it again from the admin panel once your password is
  set up.
