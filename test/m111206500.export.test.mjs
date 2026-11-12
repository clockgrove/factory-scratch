import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111206500.mjs";
import { exporter, formats } from "../src/export.mjs";

test("m111206500 exports two rows in order including an empty title", () => {
  assert.equal(format([{ id: 7, title: "Hello" }, { id: 2, title: "" }]), "7\t5\n2\t0");
});

test("m111206500 exports an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111206500 treats a missing title as empty", () => {
  assert.equal(format([{ id: 3 }]), "3\t0");
});

test("m111206500 counts JavaScript string length", () => {
  assert.equal(format([{ id: 4, title: "A😀" }]), "4\t3");
});

test("m111206500 is loaded through export discovery", async () => {
  assert.ok(formats().includes("m111206500"));
  assert.equal((await exporter("m111206500"))([{ id: 5, title: "note" }]), "5\t4");
});
