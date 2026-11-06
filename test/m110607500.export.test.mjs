import assert from "node:assert/strict";
import { test } from "node:test";
import { exporter } from "../src/export.mjs";

test("m110607500 export writes id, title and tags tab-separated, one note per line", async () => {
  const format = await exporter("m110607500");
  const out = format([{ id: 1, title: "a", tags: ["x", "y"] }, { id: 2, title: "b", tags: [] }]);
  assert.equal(out, "1\ta\tx;y\n2\tb\t");
});

test("m110607500 export of an empty list is an empty string", async () => {
  const format = await exporter("m110607500");
  assert.equal(format([]), "");
});
