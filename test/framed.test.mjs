import assert from "node:assert/strict";
import { test } from "node:test";
import { framed } from "../src/framed.mjs";

test("framed wraps the greeting for a name in square brackets", () => {
  assert.equal(framed("Ada"), "[Hello, Ada.]");
});

test("framed wraps the generic greeting for an empty name in square brackets", () => {
  assert.equal(framed(""), "[Hello.]");
});
