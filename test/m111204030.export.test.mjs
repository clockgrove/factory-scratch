import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111204030.mjs";
import { exporter, formats } from "../src/export.mjs";

test("m111204030 renders two rows in input order with stored text unchanged", () => {
  const rows = [
    { id: 9, title: "first\ttitle", tags: ["a;b", "two words"] },
    { id: 2, title: "second", tags: [] },
  ];
  assert.equal(format(rows), "9\tfirst\ttitle\ta;b;two words\n2\tsecond\t");
});

test("m111204030 renders an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111204030 is discovered by file name", async () => {
  assert.ok(formats().includes("m111204030"));
  assert.equal(await exporter("m111204030"), format);
});
