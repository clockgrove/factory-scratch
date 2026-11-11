import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../src/commands/m111102531.mjs";

const noQuery = { query: async () => { throw new Error("queried"); } };

test("m111102531 rejects --limit 0 with BAD_ARGS", async () => {
  await assert.rejects(run(noQuery, ["--limit", "0"]), { code: "BAD_ARGS" });
});

test("m111102531 rejects --limit 1e1 with BAD_ARGS", async () => {
  await assert.rejects(run(noQuery, ["--limit", "1e1"]), { code: "BAD_ARGS" });
});

test("m111102531 rejects an unknown option with BAD_ARGS", async () => {
  await assert.rejects(run(noQuery, ["--tag", "x"]), { code: "BAD_ARGS" });
});
