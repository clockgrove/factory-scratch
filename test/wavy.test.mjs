import assert from "node:assert/strict";
import { test } from "node:test";
import { wavy } from "../src/wavy.mjs";

test("wavy puts the greeting for a name between tildes", () => {
  assert.equal(wavy("Ada"), "~Hello, Ada.~");
});

test("wavy puts the generic greeting between tildes for an empty name", () => {
  assert.equal(wavy(""), "~Hello.~");
});
