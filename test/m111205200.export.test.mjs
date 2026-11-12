import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111205200.mjs";
import { exporter, formats } from "../src/export.mjs";

test("m111205200 exports ordered note IDs and tag counts", () => {
  assert.equal(format([{ id: 9, tags: ["a", "b"] }, { id: 2, tags: [] }]), "9\t2\n2\t0");
});

test("m111205200 exports an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111205200 is available through export discovery", async () => {
  assert.ok(formats().includes("m111205200"));
  assert.equal(await exporter("m111205200"), format);
});
