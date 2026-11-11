import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/untagged96c.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => {
  db = await freshClient("untagged96c");
  await add(db.client, { title: "first" });
  await add(db.client, { title: "second" });
  await add(db.client, { title: "tagged", tags: ["x"] });
});
after(async () => { await db.done(); });

test("counts only notes without tags", async () => {
  assert.equal(await run(db.client, []), "2 untagged");
});

test("a count equal to --min is reported as a count", async () => {
  assert.equal(await run(db.client, ["--min", "2"]), "2 untagged");
});

test("a count below --min reports fewer than the minimum", async () => {
  assert.equal(await run(db.client, ["--min", "3"]), "fewer than 3 untagged");
});
