import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/untagged30s.mjs";

const invalid = [
  ["--min", "0"],
  ["--min", "x"],
  ["positional"],
  ["--min"],
  ["--min", "-1"],
  ["--min", "2147483648"],
  ["--min", "1.0"],
  ["--min", ""],
  ["--unknown", "1"],
];

for (const args of invalid) {
  test(`untagged30s rejects ${JSON.stringify(args)} before querying`, async () => {
    await assert.rejects(run(null, args), { code: "BAD_ARGS" });
  });
}
