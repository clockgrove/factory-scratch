import assert from "node:assert/strict";
import { test } from "node:test";
import { check, code } from "../src/rules/m111007033.mjs";

test("m111007033 exports its rule code", () => {
  assert.equal(code, "M111007033");
});

test("m111007033 rejects the exact word", () => {
  assert.equal(check({ title: "m111007033" }), "title contains m111007033");
});

test("m111007033 rejects the word ignoring case", () => {
  assert.equal(check({ title: "before M111007033 after" }), "title contains m111007033");
});

test("m111007033 accepts a longer word containing it", () => {
  assert.equal(check({ title: "prem111007033post" }), null);
});

test("m111007033 treats punctuation as part of a word", () => {
  assert.equal(check({ title: "m111007033." }), null);
});

test("m111007033 defers a missing title to title-required", () => {
  assert.equal(check({}), null);
});
