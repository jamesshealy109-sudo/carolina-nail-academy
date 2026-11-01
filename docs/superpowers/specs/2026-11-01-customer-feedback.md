# Carolina Nail Academy Customer Feedback Design

## Goal

Add the academy's newly supplied State Board preparation, Gel-X certification, and student-service information without disrupting the established one-page brand system. Extend the tour inquiry form so prospective students can suggest a date and time while clearly explaining that the school will confirm the appointment.

## Content and structure

- Keep the existing State Board section and revise its callout to say **Free State Board Prep**.
- State explicitly that the prep is available no matter where a student completed their 300 hours of training.
- Add one focused section after State Board Prep for:
  - a two-day Gel-X certification course for students and licensed nail technicians;
  - student-performed services offered Monday through Thursday from 10:00 AM-12:00 PM, 1:00 PM-3:00 PM, and 7:00 PM-9:00 PM;
  - manicures $15, pedicures $25, artificial nails $35, gel polish included with services, nail repair or replacement $5 each, and polish-only service $10.
- Do not publish appointment-capacity claims.
- Add a subdued disclaimer that services are performed by students and availability is confirmed by the academy.

## Inquiry form

- Add interest choices for Gel-X certification and student services.
- Add optional fields named `preferred_tour_date` and `preferred_tour_time` so the values are included in the FormSubmit email.
- Label the fields as preferred tour date and preferred tour time, and explain that the request is not a confirmed appointment.
- Preserve the existing FormSubmit delivery endpoint and honeypot protection.

## Visual treatment

- Reuse the established pink, blue, lime, dark-ink, rounded-card, and bold-display visual language.
- Use a responsive two-card layout with the price list as a readable full-width element.
- Keep information scannable on mobile and avoid introducing a new image or visual style.

## Verification

- Add a deterministic content check covering every customer-supplied fact and both tour fields.
- Confirm the static page has no overflow at desktop and mobile sizes.
- Submit no real inquiry during automated or browser verification.
