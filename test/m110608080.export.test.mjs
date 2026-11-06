import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m110608080 is discovered as an export format", () => {
  assert.ok(formats().includes("m110608080"));
});

test("m110608080 renders two rows as tab-separated lines with ;-joined tags", async () => {
  const out = (await exporter("m110608080"))([
    { id: 2, title: "second", tags: ["x", "y"] },
    { id: 1, title: "first", tags: [] },
  ]);
  assert.equal(out, "2\tsecond\tx;y\n1\tfirst\t");
});

test("m110608080 renders the empty list as an empty string", async () => {
  assert.equal((await exporter("m110608080"))([]), "");
});
