import assert from "node:assert/strict";
import { test } from "node:test";
import { code, check } from "../src/rules/m111007043.mjs";

test("m111007043 exports its rule code", () => {
  assert.equal(code, "M111007043");
});

test("m111007043 rejects the exact word", () => {
  assert.equal(check({ title: "m111007043" }), "title contains m111007043");
});

test("m111007043 rejects the word ignoring case", () => {
  assert.equal(check({ title: "a M111007043 note" }), "title contains m111007043");
});

test("m111007043 splits words on whitespace", () => {
  assert.equal(check({ title: "before\tm111007043\nafter" }), "title contains m111007043");
});

test("m111007043 accepts longer words containing it", () => {
  assert.equal(check({ title: "prem111007043post" }), null);
});

test("m111007043 treats punctuation as part of a word", () => {
  assert.equal(check({ title: "m111007043." }), null);
});

test("m111007043 defers missing and non-string titles", () => {
  for (const title of [undefined, null, 123, {}, []]) {
    assert.equal(check({ title }), null);
  }
  assert.equal(check({}), null);
});
