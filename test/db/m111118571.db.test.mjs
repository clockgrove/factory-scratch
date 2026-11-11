import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111118571.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111118571"); });
after(async () => { await db.done(); });

test("an empty store returns an empty string", async () => {
  assert.equal(await run(db.client, []), "");
});

test("returns every title newest first by default", async () => {
  await add(db.client, { title: "first" });
  await add(db.client, { title: "second" });
  await add(db.client, { title: "third" });
  assert.equal(await run(db.client, []), "third | second | first");
});

test("--limit caps the titles to the newest N", async () => {
  assert.equal(await run(db.client, ["--limit", "2"]), "third | second");
});

test("--limit 1 returns only the newest title", async () => {
  assert.equal(await run(db.client, ["--limit", "1"]), "third");
});
