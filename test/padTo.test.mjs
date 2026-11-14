import assert from "node:assert/strict";
import { test } from "node:test";
import { padTo } from "../src/padTo.mjs";

test("padTo pads short text with spaces up to the width", () => {
  assert.equal(padTo("ab", 5), "ab   ");
});

test("padTo leaves text longer than the width unchanged", () => {
  assert.equal(padTo("abcdef", 3), "abcdef");
});
