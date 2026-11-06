import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110608081.mjs";

test("a --limit that is not a positive integer is rejected with BAD_ARGS before any database call", async () => {
  for (const v of ["0", "-1", "2.5", "abc", ""]) {
    await assert.rejects(run(null, [`--limit=${v}`]), { code: "BAD_ARGS" }, `--limit=${JSON.stringify(v)}`);
  }
});

test("a --limit given as a separate negative or missing value is rejected with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit", "-1"]), { code: "BAD_ARGS" });
  await assert.rejects(run(null, ["--limit"]), { code: "BAD_ARGS" });
});
