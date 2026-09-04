# Aditya Tiwari | Portfolio

A personal portfolio presenting experience, education, financial models, and public writing
across corporate finance, strategy, and financial technology.

## ⚠️ Status: this batch is unverified

Everything below was built and mostly tested (desktop + mobile screenshots), but my last
testing pass got cut off before a final error-check on both `index.html` and `admin.html`
completed. Nothing failed in what I *did* check — this is just a flag that the very last
verification step didn't finish. If anything looks broken, open your browser's console
(F12 → Console tab) on the page in question and paste me the error next time.

## Structure

1. **Home (Hero)** — a quick "at a glance" snapshot
2. **About** — short blurb + photo (currently a placeholder — see below)
3. **Profile** — three things that shape how I work
4. **Experience** — internships, in bullet-point form, with a small company badge per role
5. **Education** — Gautam Buddha University + Ryan International School
6. **Projects** — six finance case studies, grouped by kind of work, each with a Quick View, the full write-up, and (where built) the underlying model
7. **Insights** — public LinkedIn writing, filterable by topic
8. **Toolkit** — a quieter, secondary section covering the tech/build side
9. **Contact** — email, LinkedIn, and a résumé download

## Photo

`images/photo.jpg` doesn't exist yet — the About section shows a clean placeholder box
until you add a real photo at that exact path/filename.

## Résumé

`assets/Aditya_Tiwari_Resume.pdf` is the file you sent me, unmodified. **Its "PORTFOLIO"
link still points to your old portfolio.** Once this site is actually hosted, re-export the
résumé with the new URL and drop it in at the same filename/path.

## Open Graph / social preview image

`images/og-image.png` was generated to match the site's look for link previews on
LinkedIn/WhatsApp/etc. The `og:image` / `twitter:image` tags in `index.html` currently point
to it with a **relative path** — most platforms need an **absolute URL** to unfurl it
correctly, so update those two meta tags (and `og:url`) once you have a real domain.

## Company badges

The small `NIC` / `AI` / `IAT` marks next to each Experience entry are typographic
placeholders, not real logos — deliberately, to avoid using trademarked logos without
rights and to keep them visually consistent with the rest of the site. Swap them for real
logo images later if you want; they're plain text in `index.html` (`<span class="company-mark">`).

## Projects

`script.js` has a `projects` array near the top. Each entry:

```js
{
  tag: "LBO Model",              // short label shown on the card
  category: "deal",              // filter group: "valuation" | "deal" | "screening"
  title: "Project title",
  verdict: "The one-line call.",
  stats: [{ label: "Entry multiple", value: "10.0x" }, ...],   // up to 4
  points: ["Supporting bullet", ...],                          // shown in Quick View
  reportUrl: "reports/File.pdf",     // optional — omit if there's no write-up
  modelUrl: "models/File.xlsx"       // optional — omit if there's no model
}
```

Write-ups live in `reports/`, models live in `models/` — both sit next to `index.html`.
Keep those folders when you deploy; the links in `script.js` are relative.

## Insights

The `insights` array follows the same pattern, with `category` one of `markets`, `ib`,
`strategy`, `fintech`.

## The admin/control panel

Open `admin.html` directly in your browser (double-click it, no server needed). Three tabs:

- **Content** — fill in a project or insight, hit "Generate code," paste the result into the
  `projects` or `insights` array in `script.js`.
- **Analytics** — pick Plausible or Google Analytics, fill in your domain/ID, and it produces
  the tracking snippet to paste into `index.html`'s `<head>`. This page can't show you live
  visitor data itself (a static site has nowhere to store it) — you'll check that on
  Plausible's or Google's own dashboard after signing up there.
- **Checklist** — a personal to-do tracker (saved in your browser's local storage) pre-loaded
  with the loose ends from this session: hosting, the OG image URLs, the résumé link, the
  photo, etc. Checking things off doesn't change your site files — it's just for you.

**Keep `admin.html` private.** It isn't linked anywhere on the live site, but if you upload it
to the same hosting as your site, it's still technically reachable at
`yoursite.com/admin.html` by anyone who guesses the filename. Simplest options: don't upload
it to your host at all, or upload it somewhere your host won't index/link it.

## Stack

- HTML
- CSS
- JavaScript

## File layout

```text
portfolio/
|-- index.html
|-- style.css
|-- script.js
|-- admin.html        (private — do not link publicly)
|-- README.md
|-- reports/           (PDF write-ups)
|-- models/             (.xlsx models)
|-- images/              (og-image.png; add photo.jpg here too)
|-- assets/               (résumé PDF)
```

## Run locally

Open `index.html` in your browser.

## Contact

- LinkedIn: [Aditya Tiwari](https://www.linkedin.com/in/adityatiwari19/)
