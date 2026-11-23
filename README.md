Run live - https://touchwood-world-website.vercel.app/ 

# Touchwood World – Next.js site

Next.js 15 (App Router) + React 19, statically exported.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

- `lib/content.json`, `lib/data.ts` – all copy and venture data
- `app/` – routes: `/`, `/about`, `/ventures`, `/ventures/[slug]`, `/careers`, `/social-work`, `/blogs`, `/blogs/[slug]`, `/contact`
- `components/` – header, footer, hero + hive, venture explorer, cards, counters, testimonials
- `public/images`, `public/logos` – photos and logos
- `scripts/build-preview.py` – optional single-file preview (not committed): `npm run build` then `python3 scripts/build-preview.py out preview/touchwood-preview.html`
