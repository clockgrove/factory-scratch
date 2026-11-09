import assert from "node:assert/strict";
import { test } from "node:test";
import { clamp } from "../src/clamp.mjs";

test("clamp keeps a number inside the range", () => {
  assert.equal(clamp(5, 1, 10), 5);
});

test("clamp limits a number below or above the range", () => {
  assert.equal(clamp(-3, 1, 10), 1);
  assert.equal(clamp(42, 1, 10), 10);
});
