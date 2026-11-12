import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter, formats } from "../src/export.mjs";
import { format } from "../src/export/m111207500.mjs";

test("m111207500 exports title word counts in row order", () => {
  assert.equal(format([{ id: 9, title: " one\ttwo\nthree! " }, { id: 2, title: "" }]), "9\t3\n2\t0");
});

test("m111207500 exports an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111207500 counts whitespace-only and missing titles as zero", () => {
  assert.equal(format([{ id: 1, title: " \t\n\u2003" }, { id: 2 }]), "1\t0\n2\t0");
});

test("m111207500 is available through export discovery", async () => {
  assert.ok(formats().includes("m111207500"));
  assert.equal((await exporter("m111207500"))([{ id: 3, title: "two words" }]), "3\t2");
});
