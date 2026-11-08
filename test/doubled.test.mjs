import assert from "node:assert/strict";
import { test } from "node:test";
import { doubled } from "../src/doubled.mjs";

test("doubled repeats the greeting for a name", () => {
  assert.equal(doubled("Ada"), "Hello, Ada. Hello, Ada.");
});

test("doubled repeats the generic greeting for an empty name", () => {
  assert.equal(doubled(""), "Hello. Hello.");
});
