import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m110608082.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110608082"); });
after(async () => { await db.done(); });

test("a new note has m110608082_count 0", async () => {
  const note = await add(db.client, { title: "counted" });
  const { rows } = await db.client.query("SELECT m110608082_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m110608082_count, 0);
});

test("two bumps count up to 1 then 2", async () => {
  const note = await add(db.client, { title: "bumped" });
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110608082_count=1`);
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m110608082_count=2`);
});

test("an unknown id reports no note", async () => {
  assert.equal(await run(db.client, ["999999"]), "no note #999999");
});

test("a missing or non-numeric id is rejected with BAD_ID", async () => {
  await assert.rejects(run(db.client, []), (e) => e.code === "BAD_ID");
  await assert.rejects(run(db.client, ["abc"]), (e) => e.code === "BAD_ID");
});
