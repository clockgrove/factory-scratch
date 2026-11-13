import assert from "node:assert/strict";
import { test } from "node:test";
import { twice111307030 } from "../src/twice111307030.mjs";

test("twice111307030 repeats a named greeting with one space", () => {
  assert.equal(twice111307030("Ada"), "Hello, Ada. Hello, Ada.");
});

test("twice111307030 repeats the generic greeting for an empty name", () => {
  assert.equal(twice111307030(""), "Hello. Hello.");
});
