import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110608083"); });
after(async () => { await db.done(); });

test("add rejects a 61 character title with the rule code", async () => {
  await assert.rejects(
    add(db.client, { title: "a".repeat(61) }),
    (e) => e.code === "M110608083" && e.message === "title longer than 60 characters",
  );
});

test("add accepts a 60 character title", async () => {
  const title = "a".repeat(60);
  const row = await add(db.client, { title });
  assert.equal(row.title, title);
});
