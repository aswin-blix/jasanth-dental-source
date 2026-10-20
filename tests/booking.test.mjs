import test from "node:test";
import assert from "node:assert/strict";
import { demoSlots, localDateValue, validateBooking } from "../lib/booking.mjs";

const today = "2026-10-20";
const valid = { name: "Demo Patient", phone: "0000000000", date: today, time: demoSlots[0] };
test("demo accepts today, future dates, and formatted phone numbers", () => {
  assert.equal(validateBooking(valid, today), "");
  assert.equal(validateBooking({ ...valid, date: "2026-10-21", phone: "+91 00000 00000" }, today), "");
});
test("blank name and invalid phone numbers fail", () => {
  for (const name of ["", "   "]) assert.match(validateBooking({ ...valid, name }, today), /name/);
  for (const phone of ["", "123", "abcdefghij", "0000000000000000"]) assert.match(validateBooking({ ...valid, phone }, today), /phone/);
});
test("missing, impossible, malformed, and past dates fail", () => {
  for (const date of ["", "2026-02-30", "2026-13-20", "2026-1-1", "2026-10-19"]) {
    assert.notEqual(validateBooking({ ...valid, date }, today), "", date);
  }
});
test("empty or unknown time windows fail", () => {
  for (const time of ["", "Midnight"]) assert.match(validateBooking({ ...valid, time }, today), /time/);
});
test("date input formatting uses calendar date with zero padding", () => {
  assert.equal(localDateValue(new Date(2026, 0, 2, 23, 30)), "2026-01-02");
});
