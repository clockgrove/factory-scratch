import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111209611 is discovered and counts tags per note", async () => {
  assert.ok(formats().includes("m111209611"));
  const format = await exporter("m111209611");
  assert.equal(format([{ id: 1, tags: ["a", "b"] }, { id: 2, tags: [] }]), "1\t2\n2\t0");
});

test("m111209611 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m111209611"))([]), "");
});
