import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";
import { format } from "../src/export/m111102530.mjs";

test("m111102530 renders two rows in order without escaping stored values", () => {
  assert.equal(format([
    { id: 7, title: "first\tstored", tags: ["alpha;beta", "two words"] },
    { id: 3, title: "second", tags: [] },
  ]), "7\tfirst\tstored\talpha;beta;two words\n3\tsecond\t");
});

test("m111102530 treats missing tags as empty", () => {
  assert.equal(format([{ id: 1, title: "bare" }, { id: 2, title: "nul", tags: null }]), "1\tbare\t\n2\tnul\t");
});

test("m111102530 renders an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111102530 is discovered by its file name", async () => {
  assert.ok(formats().includes("m111102530"));
  assert.equal(await exporter("m111102530"), format);
});
