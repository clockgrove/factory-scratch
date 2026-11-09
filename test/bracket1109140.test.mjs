import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket1109140 } from "../src/bracket1109140.mjs";

test("bracket1109140 wraps the greeting for a name in brackets", () => {
  assert.equal(bracket1109140("Ada"), "[Hello, Ada.]");
});

test("bracket1109140 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket1109140(""), "[Hello.]");
});
