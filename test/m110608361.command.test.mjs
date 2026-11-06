import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110608361.mjs";

test("m110608361 rejects a --limit that is not a positive integer with BAD_ARGS", async () => {
  for (const value of ["0", "-1", "1.5", "abc"]) {
    await assert.rejects(run(null, [`--limit=${value}`]), { code: "BAD_ARGS" }, value);
  }
});

test("m110608361 rejects an unknown option with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--nope"]), { code: "BAD_ARGS" });
});
