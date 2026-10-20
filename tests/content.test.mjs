import test from "node:test";
import assert from "node:assert/strict";
import { categories, filterTreatments } from "../lib/content.mjs";

test("all care returns every topic and category filters return only matching topics", () => {
  assert.equal(filterTreatments("All care").length, 6);
  for (const category of categories.slice(1)) {
    const results = filterTreatments(category);
    assert.equal(results.length, 2);
    assert.ok(results.every(item => item.category === category));
  }
  assert.deepEqual(filterTreatments("unknown"), []);
});

