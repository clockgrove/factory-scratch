import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { command } from "../../src/commands.mjs";
import { run } from "../../src/commands/bump-m111103562.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111103562"); });
after(async () => { await db.done(); });

test("new notes start at zero", async () => {
  const note = await add(db.client, { title: "counter default" });
  assert.equal(note.m111103562_count, 0);
});

test("discovered bump command increments twice and persists two", async () => {
  const note = await add(db.client, { title: "counter bumps" });
  const bump = await command("bump-m111103562");
  assert.equal(await bump(db.client, [String(note.id)]), `#${note.id} m111103562_count=1`);
  assert.equal(await bump(db.client, [String(note.id)]), `#${note.id} m111103562_count=2`);
  const result = await db.client.query("SELECT m111103562_count FROM notes WHERE id = $1", [note.id]);
  assert.equal(result.rows[0].m111103562_count, 2);
});

test("unknown ids including int4 endpoints return no note", async () => {
  for (const id of ["-1", "-2147483648", "2147483647"]) {
    assert.equal(await run(db.client, [id]), `no note #${id}`);
  }
});

test("out-of-int4 ids return no note without querying", async () => {
  const query = db.client.query;
  db.client.query = () => { assert.fail("out-of-int4 id must not query"); };
  try {
    for (const id of ["2147483648", "-2147483649", "999999999999999999999999", "0002147483648"]) {
      assert.equal(await run(db.client, [id]), `no note #${id}`);
    }
  } finally {
    db.client.query = query;
  }
});

test("missing and malformed ids throw BAD_ID", async () => {
  for (const args of [[], ["1.5"], ["1e2"], ["0x10"], ["+7"], [" 7"], [""], ["--id"], [7], [null]]) {
    await assert.rejects(run(db.client, args), { code: "BAD_ID" });
  }
});

test("raw id spelling is preserved and trailing arguments are ignored", async () => {
  const note = await add(db.client, { title: "raw counter id" });
  const id = `000${note.id}`;
  assert.equal(await run(db.client, [id, "--unknown", "ignored"]), `#${id} m111103562_count=1`);
  assert.equal(await run(db.client, ["-0001", "ignored"]), "no note #-0001");
});
