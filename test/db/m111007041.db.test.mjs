import assert from "node:assert/strict";
import { after, before, beforeEach, test } from "node:test";
import { run } from "../../src/commands/m111007041.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111007041"); });
after(async () => { await db.done(); });
beforeEach(async () => { await db.client.query("TRUNCATE notes RESTART IDENTITY"); });

/** Add three notes whose creation order differs from their timestamp order. */
async function seed() {
  for (const title of ["middle", "newest", "oldest"]) await add(db.client, { title });
  await db.client.query("UPDATE notes SET created_at = CASE title WHEN 'oldest' THEN '2020-01-01'::timestamptz WHEN 'middle' THEN '2020-01-02'::timestamptz ELSE '2020-01-03'::timestamptz END");
}

test("empty store returns an empty string", async () => {
  assert.equal(await run(db.client, []), "");
});

test("three titles appear newest first with the exact separator", async () => {
  await seed();
  assert.equal(await run(db.client, []), "newest | middle | oldest");
});

test("limit selects the newest titles and accepts decimal boundaries", async () => {
  await seed();
  assert.equal(await run(db.client, ["--limit", "2"]), "newest | middle");
  assert.equal(await run(db.client, ["--limit", "01"]), "newest");
  assert.equal(await run(db.client, ["--limit", "2147483647"]), "newest | middle | oldest");
});

test("default limit caps the result at five titles", async () => {
  for (const title of ["one", "two", "three", "four", "five", "six"]) await add(db.client, { title });
  assert.equal(await run(db.client, []), "six | five | four | three | two");
});
