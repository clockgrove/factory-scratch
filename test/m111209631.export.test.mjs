import assert from "node:assert/strict";
import { test } from "node:test";
import { format } from "../src/export/m111209631.mjs";
import { exporter, formats } from "../src/export.mjs";
import { run } from "../src/commands/list.mjs";

test("m111209631 exports tag counts in row order, including no tags", () => {
  assert.equal(format([{ id: 9, tags: ["a", "a", "b"] }, { id: 2, tags: [] }]), "9\t3\n2\t0");
});

test("m111209631 exports an empty list as an empty string", () => {
  assert.equal(format([]), "");
});

test("m111209631 counts missing tags as zero", () => {
  assert.equal(format([{ id: 5 }]), "5\t0");
});

test("m111209631 is discovered as an export format", async () => {
  assert.ok(formats().includes("m111209631"));
  assert.equal((await exporter("m111209631"))([{ id: 7, tags: ["x"] }]), "7\t1");
});

test("notes list selects m111209631 with a fake query client", async () => {
  const client = { query: async () => ({ rows: [{ id: 8, tags: ["x", "y"] }, { id: 3, tags: [] }] }) };
  assert.equal(await run(client, ["--format", "m111209631"]), "8\t2\n3\t0");
});
