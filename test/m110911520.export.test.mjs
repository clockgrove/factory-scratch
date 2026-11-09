import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";
import { format } from "../src/export/m110911520.mjs";

test("m110911520 is discovered and preserves row order and stored text", async () => {
  assert.ok(formats().includes("m110911520"));
  const rows = [
    { id: 7, title: "first\ttitle", tags: ["a", "b;c"] },
    { id: 3, title: "second", tags: [] },
  ];
  const expected = "7\tfirst\ttitle\ta;b;c\n3\tsecond\t";
  assert.equal(format(rows), expected);
  assert.equal((await exporter("m110911520"))(rows), expected);
});

test("m110911520 gives an empty string for an empty list", () => {
  assert.equal(format([]), "");
});
