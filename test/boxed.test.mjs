import assert from "node:assert/strict";
import { test } from "node:test";
import { boxed } from "../src/boxed.mjs";

test("boxed puts the greeting for a name between pipes", () => {
  assert.equal(boxed("Ada"), "|Hello, Ada.|");
});

test("boxed puts the generic greeting for an empty name between pipes", () => {
  assert.equal(boxed(""), "|Hello.|");
});
