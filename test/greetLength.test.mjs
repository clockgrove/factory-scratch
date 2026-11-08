import assert from "node:assert/strict";
import { test } from "node:test";
import { greetLength } from "../src/greetLength.mjs";

test("greetLength counts the characters in the greeting for a name", () => {
  assert.equal(greetLength("Ada"), 11);
});

test("greetLength counts the generic greeting for an empty name", () => {
  assert.equal(greetLength(""), 6);
});
