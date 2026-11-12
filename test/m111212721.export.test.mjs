import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m111212721 prints the tag count per note", async () => {
  const format = await exporter("m111212721");
  assert.equal(format([{ id: 1, tags: ["a", "b"] }, { id: 2 }]), "1\t2\n2\t0");
});

test("m111212721 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m111212721"))([]), "");
});
