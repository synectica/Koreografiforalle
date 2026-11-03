# Koreografi for alle – koreografiforalle.no

Vite + React + Tailwind. Deploy: GitHub → Vercel (Framework: Vite, build `npm run build`, output `dist`).

## Arbeidsflyt (uten Figma Make)
1. Endre filer i repoet (GitHub web, GitHub Desktop eller `git push`).
2. Vercel bygger automatisk. Bygget kjører `vite build` og deretter `scripts/prerender.mjs`,
   som setter ferdig HTML (alle overskrifter, priser, adresse) inn i `dist/index.html` slik at Google ser teksten uten JavaScript.
   Hvis prerender feiler, hoppes det over og siden fungerer som før.

## Viktige filer
- `index.html` – statiske SEO-tagger (title, description, canonical, Open Graph, JSON-LD). Her limer du også inn Search Console HTML-tag om DNS-verifisering ikke brukes.
- `src/app/components/SeoHead.tsx` – oppdaterer samme tagger ved kjøring. Hold title/description/JSON-LD i sync med `index.html`.
- `vercel.json` – sikkerhetsheadere (CSP m.m.), omdirigering fra koreografiforalle.vercel.app til hoveddomenet.
- `public/` – `KFA.mp4`, `KFA-poster.jpg`, `og.jpg`, `galyna.webp`, `galyna-portrait.webp`, `robots.txt`, `sitemap.xml`.
- Miljøvariabler i Vercel (valgfritt): `VITE_SITE_URL`, `VITE_GA_ID`, `VITE_ADS_ID`, `VITE_ADS_LEAD_LABEL`, `VITE_ADS_CONTACT_LABEL`, `VITE_ADS_PAY_LABEL`.

## Lokalt
`npm install` → `npm run dev` (utvikling) eller `npm run build` (produksjonsbygg).
