import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111007043"); });
after(async () => { await db.done(); });

test("add rejects the m111007043 word with its rule code", async () => {
  await assert.rejects(add(db.client, { title: "a m111007043 note" }), {
    code: "M111007043",
    message: "title contains m111007043",
  });
});

test("add accepts a title without the m111007043 word", async () => {
  const note = await add(db.client, { title: "ordinary note" });
  assert.equal(note.title, "ordinary note");
});
