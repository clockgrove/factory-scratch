import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m110608081.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110608081"); });
after(async () => { await db.done(); });

test("an empty store returns an empty string", async () => {
  assert.equal(await run(db.client, []), "");
});

test("returns the titles newest first", async () => {
  await add(db.client, { title: "first" });
  await add(db.client, { title: "second" });
  await add(db.client, { title: "third" });
  assert.equal(await run(db.client, []), "third | second | first");
});

test("--limit keeps only the newest titles", async () => {
  assert.equal(await run(db.client, ["--limit", "2"]), "third | second");
});
