import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";
import { format } from "../src/export/m111207501.mjs";

test("m111207501 exports tag counts in row order without a trailing newline", () => {
  assert.equal(format([{ id: 9, tags: ["a", "b"] }, { id: 2, tags: [] }]), "9\t2\n2\t0");
});

test("m111207501 exports an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111207501 counts missing tags as zero", () => {
  assert.equal(format([{ id: 3 }]), "3\t0");
});

test("m111207501 is discovered as an export format", async () => {
  assert.ok(formats().includes("m111207501"));
  assert.equal((await exporter("m111207501"))([{ id: 4, tags: ["a"] }]), "4\t1");
});
