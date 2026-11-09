import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/list.mjs";
import { format } from "../../src/export/m110911520.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110911520"); });
after(async () => { if (db) await db.done(); });

test("m110911520 formats listed notes and the discovered list command newest first", async () => {
  const a = await add(db.client, { title: "first", tags: [] });
  const b = await add(db.client, { title: "second", tags: ["x", "y"] });
  const expected = `${b.id}\tsecond\tx;y\n${a.id}\tfirst\t`;
  assert.equal(format(await list(db.client)), expected);
  assert.equal(await run(db.client, ["--format", "m110911520"]), expected);
});
