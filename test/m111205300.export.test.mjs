import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m111205300 exports ordered ids and tag counts through discovery", async () => {
  const format = await exporter("m111205300");
  assert.equal(format([{ id: 7, tags: ["a", "b"] }, { id: 2, tags: [] }]), "7\t2\n2\t0");
});

test("m111205300 exports an empty list as an empty string", async () => {
  const format = await exporter("m111205300");
  assert.equal(format([]), "");
});
