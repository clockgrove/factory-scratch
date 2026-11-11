import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111102531.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111102531"); });
after(async () => { await db.done(); });

test("m111102531 returns an empty string for an empty store", async () => {
  assert.equal(await run(db.client, []), "");
});

test("m111102531 joins the newest titles newest first", async () => {
  for (const title of ["one", "two", "three"]) await add(db.client, { title });
  assert.equal(await run(db.client, []), "three | two | one");
});

test("m111102531 caps the titles at --limit", async () => {
  assert.equal(await run(db.client, ["--limit", "2"]), "three | two");
});
