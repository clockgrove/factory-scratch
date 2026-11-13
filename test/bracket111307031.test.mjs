import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket111307031 } from "../src/bracket111307031.mjs";

test("bracket111307031 wraps a named greeting", () => {
  assert.equal(bracket111307031("Ada"), "[Hello, Ada.]");
});

test("bracket111307031 wraps the generic greeting for an empty name", () => {
  assert.equal(bracket111307031(""), "[Hello.]");
});
