import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111118571.mjs";

const invalid = [
  ["--limit", "0"],
  ["--limit", "1e1"],
  ["--unknown", "1"],
  ["--limit", "+5"],
  ["--limit", "5.0"],
  ["--limit", " 5"],
  ["--limit", ""],
  ["--limit", "2147483648"],
  ["--limit"],
  ["positional"],
];

for (const args of invalid) {
  test(`m111118571 rejects ${JSON.stringify(args)} before querying`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
