import assert from "node:assert/strict";
import { test } from "node:test";
import { code, check } from "../src/rules/m111102538.mjs";

test("m111102538 exports its rule code", () => {
  assert.equal(code, "M111102538");
});

test("m111102538 rejects the exact word", () => {
  assert.equal(check({ title: "m111102538" }), "title contains m111102538");
});

test("m111102538 rejects the word ignoring case", () => {
  assert.equal(check({ title: "a M111102538 note" }), "title contains m111102538");
});

test("m111102538 splits words on whitespace", () => {
  assert.equal(check({ title: "before\tm111102538\nafter" }), "title contains m111102538");
});

test("m111102538 accepts longer words containing it", () => {
  assert.equal(check({ title: "prem111102538post" }), null);
});

test("m111102538 treats punctuation as part of a word", () => {
  assert.equal(check({ title: "m111102538." }), null);
});

test("m111102538 defers missing and non-string titles", () => {
  for (const title of [undefined, null, 123, {}, []]) {
    assert.equal(check({ title }), null);
  }
  assert.equal(check({}), null);
});
