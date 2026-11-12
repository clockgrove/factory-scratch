import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111209630.mjs";
import { exporter, formats } from "../src/export.mjs";
import { run } from "../src/commands/list.mjs";

test("word-count export preserves two rows with an empty title", () => {
  assert.equal(format([{ id: 9, title: "  one\ttwo\nthree-four! " }, { id: 2, title: "" }]), "9\t3\n2\t0");
});

test("word-count export returns an empty string for no rows", () => {
  assert.equal(format([]), "");
});

test("word-count export counts whitespace-only and missing titles as zero", () => {
  assert.equal(format([{ id: 4, title: " \t\n\u00a0" }, { id: 5 }]), "4\t0\n5\t0");
});

test("word-count export is discovered by its filename", async () => {
  assert.ok(formats().includes("m111209630"));
  assert.equal((await exporter("m111209630"))([{ id: 1, title: "two words" }]), "1\t2");
});

test("notes list selects the word-count format with a fake query client", async () => {
  const client = { query: async () => ({ rows: [{ id: 7, title: "two words" }, { id: 3, title: "" }] }) };
  assert.equal(await run(client, ["--format", "m111209630"]), "7\t2\n3\t0");
});
