import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111105541.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111105541"); });
after(async () => { await db.done(); });

test("an empty store returns an empty string", async () => {
  assert.equal(await run(db.client, []), "");
});

test("titles of the newest notes are joined newest first and obey --limit", async () => {
  await add(db.client, { title: "first" });
  await add(db.client, { title: "second" });
  await add(db.client, { title: "third" });
  assert.equal(await run(db.client, []), "third | second | first");
  assert.equal(await run(db.client, ["--limit", "2"]), "third | second");
  assert.equal(await run(db.client, ["--limit", "1"]), "third");
  assert.equal(await run(db.client, ["--limit", "2147483647"]), "third | second | first");
});
