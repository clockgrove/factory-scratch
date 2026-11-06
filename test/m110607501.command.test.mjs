import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110607501.mjs";

const badArgs = (e) => e.code === "BAD_ARGS";

test("a --limit that is not a positive integer is rejected with BAD_ARGS", async () => {
  for (const limit of ["0", "-1", "1.5", "abc", ""]) {
    await assert.rejects(run(null, ["--limit", limit]), badArgs, `limit ${JSON.stringify(limit)}`);
  }
});

test("an unknown option is rejected with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--nope"]), badArgs);
});
