import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111206560.mjs";
import { exporter, formats } from "../src/export.mjs";

test("m111206560 exports two rows in order including an empty title", () => {
  assert.equal(format([{ id: 7, title: "Hello" }, { id: 2, title: "" }]), "7\t5\n2\t0");
});

test("m111206560 exports an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111206560 treats a missing title as empty", () => {
  assert.equal(format([{ id: 3 }]), "3\t0");
});

test("m111206560 counts JavaScript UTF-16 string length", () => {
  assert.equal(format([{ id: 4, title: "A😀" }]), "4\t3");
});

test("m111206560 is loaded through export discovery", async () => {
  assert.ok(formats().includes("m111206560"));
  assert.equal((await exporter("m111206560"))([{ id: 5, title: "note" }]), "5\t4");
});
