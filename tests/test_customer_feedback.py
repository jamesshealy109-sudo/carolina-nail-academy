from html.parser import HTMLParser
from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.section_stack = []
        self.section_text = {}
        self.forms = {}
        self.form_stack = []
        self.option_form = None

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "section":
            section_id = attrs.get("id")
            self.section_stack.append(section_id)
            if section_id:
                self.section_text.setdefault(section_id, [])

        if tag == "form":
            form_id = attrs.get("id")
            self.form_stack.append(form_id)
            if form_id:
                self.forms[form_id] = {
                    "attrs": attrs,
                    "controls": [],
                    "options": [],
                    "text": [],
                }

        if self.form_stack and self.form_stack[-1] in self.forms:
            form = self.forms[self.form_stack[-1]]
            if tag in {"input", "select", "textarea"}:
                form["controls"].append((tag, attrs))
            elif tag == "option":
                form["options"].append([])
                self.option_form = self.form_stack[-1]

    def handle_endtag(self, tag):
        if tag == "section" and self.section_stack:
            self.section_stack.pop()
        elif tag == "form" and self.form_stack:
            self.form_stack.pop()
        elif tag == "option":
            self.option_form = None

    def handle_data(self, data):
        if self.section_stack and self.section_stack[-1]:
            self.section_text[self.section_stack[-1]].append(data)
        if self.form_stack and self.form_stack[-1] in self.forms:
            form = self.forms[self.form_stack[-1]]
            form["text"].append(data)
            if self.option_form == self.form_stack[-1] and form["options"]:
                form["options"][-1].append(data)


def normalized_text(parts):
    return re.sub(r"\s+", " ", " ".join(parts)).strip()


class CustomerFeedbackPageTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.parser = PageParser()
        cls.parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))

    def test_state_board_prep_is_free_and_open_to_all_300_hour_students(self):
        text = normalized_text(self.parser.section_text.get("board-prep", []))
        self.assertIn("Free State Board Prep", text)
        self.assertRegex(text, r"300 (?:hours|training hours)")
        self.assertIn("no matter where", text.lower())

    def test_certification_and_services_present_all_customer_details(self):
        text = normalized_text(
            self.parser.section_text.get("certification-services", [])
        )
        expected_fragments = [
            "Gel-X Certification",
            "students and licensed nail technicians",
            "two-day course",
            "Monday-Thursday",
            "10:00 AM-12:00 PM",
            "1:00 PM-3:00 PM",
            "7:00 PM-9:00 PM",
            "Manicures $15",
            "Pedicures $25",
            "Artificial Nails $35",
            "Gel Polish Included with service",
            "Nail Repair or Replacement $5 each",
            "Polish Only $10",
            "Services are performed by students",
        ]
        for fragment in expected_fragments:
            with self.subTest(fragment=fragment):
                self.assertIn(fragment, text)

    def test_inquiry_form_sends_optional_preferred_tour_date_and_time(self):
        form = self.parser.forms["interest-form"]
        controls = {
            attrs.get("name"): (tag, attrs)
            for tag, attrs in form["controls"]
            if attrs.get("name")
        }

        self.assertEqual(form["attrs"].get("method"), "POST")
        self.assertEqual(
            form["attrs"].get("action"),
            "https://formsubmit.co/info@carolinanailacademy.com",
        )
        self.assertEqual(controls["preferred_tour_date"][0], "input")
        self.assertEqual(controls["preferred_tour_date"][1].get("type"), "date")
        self.assertNotIn("required", controls["preferred_tour_date"][1])
        self.assertEqual(controls["preferred_tour_time"][0], "input")
        self.assertEqual(controls["preferred_tour_time"][1].get("type"), "time")
        self.assertNotIn("required", controls["preferred_tour_time"][1])

        options = [normalized_text(option) for option in form["options"]]
        self.assertIn("Gel-X certification", options)
        self.assertIn("Student services appointment", options)
        self.assertIn("Schedule a tour", options)

        form_text = normalized_text(form["text"])
        self.assertIn(
            "The school will reach out shortly to confirm your requested tour date and time.",
            form_text,
        )


if __name__ == "__main__":
    unittest.main()
