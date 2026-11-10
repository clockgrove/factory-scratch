import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/bump-m111007032.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111007032"); });
after(async () => { await db.done(); });

test("m111007032 a new note starts at 0", async () => {
  const note = await add(db.client, { title: "fresh" });
  const { rows } = await db.client.query("SELECT m111007032_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(rows[0].m111007032_count, 0);
});

test("m111007032 two bumps give 2", async () => {
  const note = await add(db.client, { title: "bumped" });
  assert.equal(await run(db.client, [String(note.id)]), `#${note.id} m111007032_count=1`);
  assert.equal(await run(db.client, [String(note.id), "ignored"]), `#${note.id} m111007032_count=2`);
});

test("m111007032 an unknown id returns the no-note line", async () => {
  assert.equal(await run(db.client, ["999999"]), "no note #999999");
});

test("m111007032 an id outside int4 returns the no-note line", async () => {
  assert.equal(await run(db.client, ["2147483648"]), "no note #2147483648");
});

test("m111007032 a missing id throws BAD_ID", async () => {
  await assert.rejects(() => run(db.client, []), { code: "BAD_ID" });
});

test("m111007032 1e2 throws BAD_ID", async () => {
  await assert.rejects(() => run(db.client, ["1e2"]), { code: "BAD_ID" });
});
