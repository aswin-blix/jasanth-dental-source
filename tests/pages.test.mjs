import test from "node:test";
import assert from "node:assert/strict";
import { treatments } from "../lib/content.mjs";
import { careDetails, navigation, pages } from "../lib/pages.mjs";

test("every care topic has distinct useful detail content", () => {
  assert.deepEqual(Object.keys(careDetails).sort(), treatments.map(item => item.id).sort());
  for (const topic of treatments) {
    const detail = careDetails[topic.id];
    assert.ok(detail.intro.length > 80);
    assert.equal(new Set(detail.questions).size, 3);
    assert.ok(detail.prepare.length > 20);
  }
  assert.equal(new Set(Object.values(careDetails).map(item => item.intro)).size, treatments.length);
});

test("primary navigation resolves to dedicated pages, including contact", () => {
  assert.ok(navigation.some(([, href]) => href === "/contact/"));
  for (const [, href] of navigation) {
    assert.ok(!href.includes("#"));
    if (href !== "/") assert.ok(pages[href.split("/")[1]]);
  }
  assert.equal(new Set(navigation.map(([, href]) => href)).size, navigation.length);
});

