import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110607503"); });
after(async () => { await db.done(); });

test("add rejects a 61-character title with the rule code and message", async () => {
  await assert.rejects(
    add(db.client, { title: "a".repeat(61) }),
    (e) => e.code === "M110607503" && e.message === "title longer than 60 characters",
  );
});

test("add accepts a 60-character title", async () => {
  const row = await add(db.client, { title: "a".repeat(60) });
  assert.equal(row.title, "a".repeat(60));
});
