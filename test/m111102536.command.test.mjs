import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111102536.mjs";

for (const args of [
  ["--limit", "0"], ["--limit", "1e1"], ["--unknown"],
  ["--limit", "+5"], ["--limit", "5.0"], ["--limit", " 5"],
  ["--limit", "2147483648"], ["--limit", "-1"], ["--limit", ""],
  ["--limit"], ["extra"], ["--", "extra"],
]) {
  test(`rejects ${JSON.stringify(args)} with BAD_ARGS before querying`, async () => {
    let queries = 0;
    const client = { query() { queries++; throw new Error("unexpected query"); } };
    await assert.rejects(run(client, args), { code: "BAD_ARGS" });
    assert.equal(queries, 0);
  });
}
