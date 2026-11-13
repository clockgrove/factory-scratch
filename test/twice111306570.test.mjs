import assert from "node:assert/strict";
import { test } from "node:test";
import { twice111306570 } from "../src/twice111306570.mjs";

test("twice111306570 repeats the greeting for a name", () => {
  assert.equal(twice111306570("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice111306570 repeats the generic greeting for an empty name", () => {
  assert.equal(twice111306570(""), "Hello. Hello.");
});
