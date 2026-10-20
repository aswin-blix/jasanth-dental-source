# Validation and handoff

Date: 20 October 2026.

## Demo appointment revision (current)

Replaces the visit-notes download flow. Earlier notes-flow checks below are historical.

- Eight tests pass: care filtering and page coverage plus successful demo input, blank names, malformed phone numbers, missing/impossible/past dates, invalid time windows, and local-date formatting.
- Browser verified: empty form rejection, invalid phone rejection, past-date rejection, sample-data autofill, explicit demo-only success, clearing details on reopen, Escape dismissal, Tab focus wrapping, and preselected care reason.
- Desktop and 390px mobile dialog screenshots inspected; mobile form scrolls without horizontal overflow.
- No network submission or browser-storage writes are implemented. Confirmation explicitly says no request was sent or booking reserved.
- FAQ, Contact Us, and privacy copy updated to describe the demo.
- Removed obsolete download helper and replaced its feature-specific tests with appointment validation tests; no failing tests were disabled.

## Multipage revision

- Dedicated routes: `/`, `/care/`, six `/care/[slug]/` pages, `/doctor/`, `/first-visit/`, `/contact/`, `/faq/`, `/privacy/`.
- Seven unit tests pass, including route data coverage and ensuring the questions displayed on each care-detail page appear in downloaded notes.
- Production build and lint pass.
- `npm run test:export` validates all 13 content pages, unique titles, one H1 per page, and all exported internal links.
- Browser verified all 13 direct URLs return HTTP 200, navigation from Contact Us to care, care filtering, care-detail links, preselected planner topics, actual expanded-question download, and Escape dismissal.
- Mobile navigation follows First Visit and closes; the dedicated FAQ accordion works.
- Contact Us screenshot inspected at desktop and 390px. Care-detail layout has no horizontal overflow at 320px; homepage fits at 1024px.
- Homepage has three overview care cards and no contact section; the full information is on dedicated pages.
- External references and content boundaries are documented in `REFERENCES.md`.

## Initial single-page baseline checks

- `npm test`: four passing tests covering treatment filtering, unknown categories, selected notes, empty selections, unknown selections, duplicate selections, and explicit no-booking wording.
- `npm run lint`: passes with no errors or warnings.
- `npm run build`: passes and exports `/` and `/_not-found` as static content using `next build --webpack`. Turbopack production failed to connect to its CSS child process on this Windows host, including outside the sandbox; the supported Webpack build avoids that host-specific failure.

## Browser checks

Executed through Ego Browser on the local Next.js preview:

- Desktop visual inspection: cream/green layout, hero image, navigation, and clinic identity.
- Everyday-care filter returns two topics; All care restores six.
- A care card opens the planner with the corresponding topic checked.
- FAQ expands and switching questions closes the previous answer.
- Actual text-file download succeeded; file contents checked.
- Download confirmation explicitly states nothing was sent to the clinic.
- Escape closes the dialog.
- Tab and Shift+Tab wrap within the dialog (both checked after fixing the initial wrap issue).
- Mobile menu opens, follows the care link, and closes.
- No horizontal overflow at 320px and 390px.
- Mobile screenshot inspected at 390px; hero image transition subsequently softened.
- Hero image loaded successfully; local page returned HTTP 200.

Local browser scripts, screenshots, and downloaded notes are in ignored `qa/`.

## Boundaries

No public deployment, commit, push, external appointment submission, or contact integration was performed. Address, phone, consultation hours, actual offered treatments, and doctor biography remain unverified. Search indexing is disabled until clinic approval.

Two generated images are illustrations, not real staff, patients, treatment outcomes, or clinic interiors. The hospital exterior is the original supplied photograph.
