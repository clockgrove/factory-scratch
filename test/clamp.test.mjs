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

test("clamp includes both range endpoints", () => {
  assert.equal(clamp(1, 1, 10), 1);
  assert.equal(clamp(10, 1, 10), 10);
});

test("clamp accepts equal bounds", () => {
  assert.equal(clamp(3, 5, 5), 5);
  assert.equal(clamp(5, 5, 5), 5);
  assert.equal(clamp(7, 5, 5), 5);
});

test("clamp rejects a lower bound greater than the upper bound", () => {
  assert.throws(() => clamp(5, 10, 1), RangeError);
});
