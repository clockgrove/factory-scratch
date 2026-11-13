import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket111306571 } from "../src/bracket111306571.mjs";

test("bracket111306571 wraps a named greeting", () => {
  assert.equal(bracket111306571("Ada"), "[Hello, Ada.]");
});

test("bracket111306571 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket111306571(""), "[Hello.]");
});
