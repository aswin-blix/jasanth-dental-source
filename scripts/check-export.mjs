import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { treatments } from "../lib/content.mjs";
import { pages } from "../lib/pages.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../out");
const routes = ["/", ...Object.keys(pages).map(slug => `/${slug}/`), ...treatments.map(topic => `/care/${topic.id}/`)];
const titles = new Set();
for (const route of routes) {
  const html = fs.readFileSync(path.join(root, route, "index.html"), "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${route}: one page heading`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert.ok(title, `${route}: title exists`);
  assert.ok(!titles.has(title), `${route}: unique title`);
  titles.add(title);
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const pathname = href.split("#")[0].split("?")[0];
    assert.ok(fs.existsSync(path.join(root, pathname, "index.html")), `${route}: link ${href} resolves`);
  }
  console.log(`PASS ${route}`);
}
const home = fs.readFileSync(path.join(root, "index.html"), "utf8");
assert.ok(!home.includes('id="visit"'), "Contact section has moved off homepage");
assert.ok(!home.includes('id="first-visit"'), "First-visit section has moved off homepage");
const contact = fs.readFileSync(path.join(root, "contact/index.html"), "utf8");
assert.ok(contact.includes("hospital-exterior.webp"), "Contact page includes real hospital image");
assert.ok(!contact.includes("tel:") && !contact.includes("mailto:"), "No fabricated contact links");
console.log(`Validated ${routes.length} pages and all exported internal links.`);
