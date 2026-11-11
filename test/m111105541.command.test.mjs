import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111105541.mjs";

const invalid = [
  ["--limit", "0"],
  ["--limit", "1e1"],
  ["--unknown", "x"],
  ["--limit=+5"],
  ["--limit=5.0"],
  ["--limit= 5"],
  ["--limit=2147483648"],
  ["--limit="],
  ["--limit"],
  ["extra"],
];

for (const args of invalid) {
  test(`m111105541 rejects ${JSON.stringify(args)} before querying`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
