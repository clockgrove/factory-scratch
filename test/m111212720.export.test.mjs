import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m111212720 prints the title word count per note", async () => {
  const format = await exporter("m111212720");
  assert.equal(format([{ id: 1, title: "  buy  oat milk " }, { id: 2, title: "" }]), "1\t3\n2\t0");
});

test("m111212720 gives an empty string for an empty list", async () => {
  assert.equal((await exporter("m111212720"))([]), "");
});
