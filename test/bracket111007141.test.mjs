import assert from "node:assert/strict";
import { test } from "node:test";
import { bracket111007141 } from "../src/bracket111007141.mjs";

test("bracket111007141 wraps the named greeting in brackets", () => {
  assert.equal(bracket111007141("Ada"), "[Hello, Ada.]");
});

test("bracket111007141 wraps the generic greeting when the name is empty", () => {
  assert.equal(bracket111007141(""), "[Hello.]");
});
