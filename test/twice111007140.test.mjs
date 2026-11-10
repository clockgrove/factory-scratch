import assert from "node:assert/strict";
import { test } from "node:test";
import { twice111007140 } from "../src/twice111007140.mjs";

test("twice111007140 repeats the greeting for a name twice", () => {
  assert.equal(twice111007140("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice111007140 repeats the generic greeting for an empty name", () => {
  assert.equal(twice111007140(""), "Hello. Hello.");
});
