import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";
import { format } from "../src/export/m111103560.mjs";

test("m111103560 renders two rows in order without escaping stored values", () => {
  assert.equal(format([
    { id: 7, title: "first\tstored", tags: ["alpha;beta", "two words"] },
    { id: 3, title: "second", tags: [] },
  ]), "7\tfirst\tstored\talpha;beta;two words\n3\tsecond\t");
});

test("m111103560 renders an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111103560 is discovered by its file name", async () => {
  assert.ok(formats().includes("m111103560"));
  assert.equal(await exporter("m111103560"), format);
});
