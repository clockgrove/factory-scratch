import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m111205400 exports IDs and tag counts in row order", async () => {
  const format = await exporter("m111205400");
  assert.equal(format([{ id: 9, tags: ["a", "b"] }, { id: 3, tags: [] }]), "9\t2\n3\t0");
});

test("m111205400 exports an empty list as an empty string", async () => {
  const format = await exporter("m111205400");
  assert.equal(format([]), "");
});
