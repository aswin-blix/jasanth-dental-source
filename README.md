# Jasanth Dental Hospital

For GitHub → Vercel deployment, follow [DEPLOY-VERCEL.md](DEPLOY-VERCEL.md).

A standalone Next.js App Router website with Tailwind CSS and Framer Motion. This project lives separately from the existing Aswin Blix portfolio; run commands **inside this directory**. It has its own dependencies, design, and static export. No root portfolio configuration or deployment workflow is changed.

## Run

```sh
npm ci
npm run dev
```

Preview: http://localhost:3001

```sh
npm test
npm run lint
npm run build
npm run test:export
```

The production static export is generated in `out/`. Serve it from the domain root on a static host. No deployment is configured or performed for this project.

The build uses Next.js's supported Webpack option because the Turbopack production CSS worker failed to connect on this Windows host. Development uses Turbopack.

## Experience

- Thirteen dedicated pages: home, dental care, six care-topic details, doctor, first visit, Contact Us, FAQs, and website privacy.
- Shared navigation, active-page state, breadcrumbs, unique page titles, and links between related pages.
- Short homepage with selected care topics; detailed information lives on its own routes.
- Contact Us separates phone, email, consultation hours, and location readiness without inventing contact information.

- Responsive ivory, sage, and deep green design.
- Generated hero portrait and dental still life, plus the supplied actual hospital exterior.
- Framer Motion section reveals honoring reduced-motion preferences.
- Care-topic category filters and FAQ accordion.
- Demo appointment modal with name, phone, preferred date, sample time windows, and reason for visit. Includes sample-data autofill, validation, focus containment, and Escape dismissal.
- Mobile navigation, skip link, visible keyboard focus, local optimized images.
- Local demo confirmation only: no request is sent, no booking is reserved, and no form entries are saved in browser storage. Entries clear on closing.

## Routing and maintenance

Each route has a server `page.jsx` with its own metadata. `app/components/dental-site.jsx` reuses the site shell and existing sections; `page-extras.jsx` contains the dedicated-page content components. `booking-dialog.jsx` owns the demo form, and `lib/booking.mjs` owns sample time windows and validation. `lib/pages.mjs` holds navigation, page introductions, visit preparation, and care-detail questions.

`app/care/[slug]/page.jsx` statically generates the six known care topics and rejects unknown ones. `trailingSlash: true` produces a directory with `index.html` for each route, so deep links work on ordinary static hosts. The build-output check verifies all 13 pages, unique titles, one main heading per page, and every internal link.

The content and layout references are recorded in `REFERENCES.md`. They informed structure and general patient preparation, not additional facts about this clinic.

## Content and launch checklist

Only the name **Jasanth Dental Hospital**, doctor **Dr. T Prasanth**, and qualifications **BDS, MDS, PhD** were established from the supplied photograph. `lib/content.mjs` holds the core verified details and care topics. Generated photographs are labeled illustrative; they are not actual patients, staff, premises, or treatment outcomes.

Before public launch, obtain client approval and confirm:

1. Full address and map pin.
2. Phone, appointment channel, and consultation hours.
3. Actual treatment list, doctor biography, and registration details if required.
4. Medical review of clinic-facing content and permission for supplied photography.
5. Desired domain, final metadata, and indexing policy.

The care cards are discussion topics, not claims of confirmed treatments. “Book an appointment” opens a demo form, replacing the former visit-note download flow. Sample patient details and time windows are explicitly marked as demo content. A real appointment channel and availability checks must be integrated before enabling actual requests.

Search indexing is disabled in `app/layout.jsx` until the details are confirmed. Do not add fabricated reviews, statistics, fees, emergency availability, or doctor portraits.

## Images

Built-in image generation was used. Original PNG files and optimized WebP assets are in `public/images/`. The site serves the WebP versions (approximately 357 KiB combined).

- `smile-hero.webp`: Hero background; illustrative smile portrait.
- `dental-still-life.webp`: Doctor introduction support; decorative dental still life.
- `hospital-exterior.webp`: Visit section; original client-supplied premises photo.

Exact generation prompts are recorded in `IMAGE-PROMPTS.md`.

## Project conventions

The parent repository's portfolio-specific black-and-white styling and shared page shell apply to the portfolio, not this isolated client website. Keep dental changes inside this directory. Preserve static export compatibility; use no server actions or API routes without an explicit backend requirement. Keep verified clinic details separate from illustrative design content.
