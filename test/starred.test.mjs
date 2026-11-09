import assert from "node:assert/strict";
import { test } from "node:test";
import { starred } from "../src/starred.mjs";

test("starred puts the greeting for a name between asterisks", () => {
  assert.equal(starred("Ada"), "*Hello, Ada.*");
});

test("starred puts the generic greeting for an empty name between asterisks", () => {
  assert.equal(starred(""), "*Hello.*");
});
