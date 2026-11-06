import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { exporter } from "../../src/export.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110607500"); });
after(async () => { await db.done(); });

test("m110607500 renders listed notes as tab-separated lines, newest first", async () => {
  const a = await add(db.client, { title: "first", tags: ["x", "y"] });
  const b = await add(db.client, { title: "second", tags: [] });
  const out = (await exporter("m110607500"))(await list(db.client));
  assert.equal(out, `${b.id}\tsecond\t\n${a.id}\tfirst\tx;y`);
});
