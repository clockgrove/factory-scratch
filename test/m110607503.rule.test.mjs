import test from "node:test";
import assert from "node:assert/strict";
import { code, check } from "../src/rules/m110607503.mjs";

test("code is M110607503", () => {
  assert.equal(code, "M110607503");
});

test("a 60-character title passes", () => {
  assert.equal(check({ title: "a".repeat(60) }), null);
});

test("a 61-character title is reported", () => {
  assert.equal(check({ title: "a".repeat(61) }), "title longer than 60 characters");
});

test("a missing title is left to title-required", () => {
  assert.equal(check({}), null);
});
