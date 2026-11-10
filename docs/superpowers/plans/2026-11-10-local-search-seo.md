# Local Search SEO Implementation Plan

> Execute inline using the executing-plans workflow.

**Goal:** Help nearby prospective nail students and student-service clients understand and find Carolina Nail Academy.
**Architecture:** Retain the static homepage and request-only tour form. Add local metadata, concise visible local copy, factual structured data, robots.txt, and a one-URL sitemap.
**Tech stack:** Static HTML, CSS, JavaScript; GitHub Pages.
**Scope:** User requested Search Console setup and SEO updates for local nail education and student services. Update the existing page; dedicated landing pages are a possible later project.

## Constraints and review focus
- Canonical public URL: https://carolinanailacademy.com/.
- School location: 3027 Platt Springs Rd, West Columbia, SC 29170.
- Use existing program and student-service facts; no new accreditation, outcomes, reviews, phone, tuition, or availability claims.
- Preserve all form controls, delivery settings, tour confirmation wording, styles, and JavaScript.
- Search Console verification requires the account-specific token. Never insert a dummy token or claim verification based on website changes.

## Tasks
- [x] Inspect live page, current main, publishing workflow, and baseline tests (3 passed).
- [x] Update metadata, canonical, local copy, and EducationalOrganization/Course/Service structured data.
- [x] Add robots.txt and sitemap.xml containing only the actual homepage URL, not fragment sections.
- [x] Run existing tests, parse XML/JSON/HTML, compare form markup and assets with base, and review diff.
- [ ] Publish authorized SEO changes and verify public responses.
- [ ] Add supplied Search Console token, verify ownership, submit sitemap, and inspect URL when account access is available.

## Verification approach and rulings
Existing customer-feedback tests plus direct checks are sufficient for this reversible content/configuration update. No implementation-mirroring tests are added.
The original checkout remains untouched in an isolated worktree.

## Access status
Browser inventory reports local browser use disabled. Requested the Google HTML verification tag from the user; Search Console setup remains pending.

## Verification evidence
- Existing customer-feedback suite: 3/3 passed.
- Direct checks: HTML IDs and anchors, canonical/share metadata, JSON-LD provider references and prices, XML sitemap and robots.txt passed.
- Full form markup, inline CSS, styles.css and script.js match base 16b8627.
- Independent review: no material findings.
- Browser rendering not checked: browser access is disabled in Work settings.
