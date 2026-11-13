import assert from "node:assert/strict";
import { test } from "node:test";
import { twice111307040 } from "../src/twice111307040.mjs";

test("twice111307040 repeats a named greeting twice with one space", () => {
  assert.equal(twice111307040("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice111307040 repeats the generic greeting for an empty name", () => {
  assert.equal(twice111307040(""), "Hello. Hello.");
});
