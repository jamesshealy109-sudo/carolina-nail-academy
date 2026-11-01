# Customer Feedback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the confirmed State Board, Gel-X certification, student-services, pricing, and preferred-tour scheduling updates on the Carolina Nail Academy site.

**Architecture:** Extend the existing static one-page site in place: revise the current State Board callout, add one semantic services section, and extend the existing FormSubmit form. A dependency-free Python HTML-parser test will validate the rendered document structure, customer-provided facts, and form field names.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Python standard-library test runner

**Spec:** `docs/superpowers/specs/2026-11-01-customer-feedback.md`

## Global Constraints

- Preserve the existing FormSubmit endpoint and visual identity.
- Do not claim a number of available appointments.
- Do not submit a real form during verification.
- Tour date and time are preferences until the school confirms them.

## Review Focus

- A visitor must understand that State Board prep is free and open regardless of where the 300 training hours were completed.
- The Gel-X audience and two-day duration must remain explicit.
- Every service price and all three service windows must remain exact.
- Preferred tour date and time must be optional and included by FormSubmit through stable `name` attributes.
- Mobile cards, prices, and form controls must remain readable without horizontal overflow.

---

### Task 1: Customer feedback content contract

**Files:**
- Create: `tests/test_customer_feedback.py`

**Interfaces:**
- Consumes: `index.html` as UTF-8 source.
- Produces: a Python test suite that validates the published copy and form-field contract.

- [ ] **Step 1: Write the failing test**

Create tests asserting the State Board wording, Gel-X audience/duration, three service windows, six prices, disclaimer, `preferred_tour_date`, `preferred_tour_time`, and confirmation copy.

- [ ] **Step 2: Run test to verify it fails**

Run: `python -m unittest tests/test_customer_feedback.py -v`
Expected: FAIL because the new content and fields are absent.

- [ ] **Step 3: Commit the red test with the implementation task**

Keep the failing test uncommitted until Task 2 makes the contract green.

### Task 2: State Board, certification, and services content

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: the exact customer facts defined in the spec.
- Produces: `#certification-services`, responsive `.offer-grid`, `.service-hours`, and `.service-prices` markup and styling.

- [ ] **Step 1: Revise the existing State Board callout**

Change the eyebrow to “Free State Board Prep” and explicitly reference completion of 300 training hours at any school or training program.

- [ ] **Step 2: Add the certification and student-services section**

Place the new semantic section after `#board-prep`, using the established card and color system and including every approved fact.

- [ ] **Step 3: Add responsive styling**

Use a two-column desktop grid, collapse to one column below 820px, and keep the price list legible at 320px viewport width.

- [ ] **Step 4: Run the content test**

Run: `python -m unittest tests/test_customer_feedback.py -v`
Expected: form-field assertions still FAIL; content assertions PASS.

### Task 3: Preferred tour scheduling fields

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

**Interfaces:**
- Consumes: existing `#interest-form` FormSubmit integration.
- Produces: optional `preferred_tour_date` and `preferred_tour_time` controls and unambiguous confirmation copy.

- [ ] **Step 1: Add new interest choices and tour fields**

Add “Gel-X certification” and “Student services appointment” options plus optional date/time inputs with stable names and autocomplete-friendly labels.

- [ ] **Step 2: Add scheduling guidance**

State next to the fields that the school will reach out shortly to confirm the requested tour date and time.

- [ ] **Step 3: Run the content test**

Run: `python -m unittest tests/test_customer_feedback.py -v`
Expected: PASS.

- [ ] **Step 4: Commit the customer update**

Run: `git add index.html styles.css tests/test_customer_feedback.py docs/superpowers && git commit -m "feat: add academy services and tour scheduling"`

### Task 4: Browser and publication verification

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: completed static site.
- Produces: accurate repo documentation and verified desktop/mobile publication.

- [ ] **Step 1: Correct repository documentation**

Update the included feature list and remove the stale claim that the contact form is preview-only.

- [ ] **Step 2: Run source tests and local link checks**

Run: `python -m unittest tests/test_customer_feedback.py -v`
Expected: PASS with no failures.

- [ ] **Step 3: Inspect desktop and mobile renderings**

Verify the new section and form at 1280px, 390px, and 320px widths, including no horizontal overflow and no real form submission.

- [ ] **Step 4: Push and verify GitHub Pages**

Push the exact commit to `origin/main`, wait for the Pages build, and verify the live DOM contains the new section and form fields.
