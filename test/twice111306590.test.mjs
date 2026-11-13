import assert from "node:assert/strict";
import { test } from "node:test";
import { twice111306590 } from "../src/twice111306590.mjs";

test("twice111306590 repeats a named greeting with one space", () => {
  assert.equal(twice111306590("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice111306590 repeats the generic greeting for an empty name", () => {
  assert.equal(twice111306590(""), "Hello. Hello.");
});
