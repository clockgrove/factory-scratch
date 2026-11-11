import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { run } from "../../src/commands/m1111025311.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m1111025311"); });
after(async () => { await db.done(); });
beforeEach(async () => { await db.client.query("TRUNCATE notes RESTART IDENTITY"); });

/** Add three notes whose insertion order differs from their timestamp order. */
async function seed() {
  for (const title of ["middle", "newest", "oldest"]) await add(db.client, { title });
  await db.client.query("UPDATE notes SET created_at = CASE title WHEN 'oldest' THEN '2020-01-01'::timestamptz WHEN 'middle' THEN '2020-01-02'::timestamptz ELSE '2020-01-03'::timestamptz END");
}

test("an empty store returns an empty string", async () => {
  assert.equal(await run(db.client, []), "");
});

test("three titles come newest first joined by space, bar, space", async () => {
  await seed();
  assert.equal(await run(db.client, []), "newest | middle | oldest");
});

test("--limit keeps only the newest titles", async () => {
  await seed();
  assert.equal(await run(db.client, ["--limit", "2"]), "newest | middle");
  assert.equal(await run(db.client, ["--limit", "1"]), "newest");
  assert.equal(await run(db.client, ["--limit", "2147483647"]), "newest | middle | oldest");
});

test("the default limit is five titles", async () => {
  for (const title of ["one", "two", "three", "four", "five", "six"]) await add(db.client, { title });
  assert.equal(await run(db.client, []), "six | five | four | three | two");
});
