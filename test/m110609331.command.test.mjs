import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m110609331.mjs";

test("m110609331 rejects a --limit that is not a positive integer with BAD_ARGS", async () => {
  for (const value of ["0", "-1", "1.5", "abc"]) {
    await assert.rejects(run(null, [`--limit=${value}`]), { code: "BAD_ARGS" }, value);
  }
});

test("m110609331 rejects a --limit beyond the safe integer range with BAD_ARGS", async () => {
  await assert.rejects(run(null, ["--limit=9007199254740992"]), { code: "BAD_ARGS" });
});
