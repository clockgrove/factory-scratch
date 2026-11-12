import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";

test("m111209610 is discovered and counts title words per note", async () => {
  assert.ok(formats().includes("m111209610"));
  const format = await exporter("m111209610");
  assert.equal(format([{ id: 1, title: "  hello   big world " }, { id: 2, title: "" }]), "1\t3\n2\t0");
});

test("m111209610 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m111209610"))([]), "");
});
