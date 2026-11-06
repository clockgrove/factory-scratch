import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { exporter } from "../../src/export.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110608080"); });
after(async () => { await db.done(); });

test("m110608080 renders listed notes as tab-separated lines", async () => {
  const a = await add(db.client, { title: "first", tags: ["x"] });
  const b = await add(db.client, { title: "second", tags: ["x", "y"] });
  const out = (await exporter("m110608080"))(await list(db.client));
  assert.equal(out, `${b.id}\tsecond\tx;y\n${a.id}\tfirst\tx`);
});
