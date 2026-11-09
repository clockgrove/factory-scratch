import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/show.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("show"); });
after(async () => { await db.done(); });

test("a note with tags and a multi-line body shows all three parts", async () => {
  const n = await add(db.client, { title: "Tagged", tags: ["a", "b"], body: "line one\nline two" });
  assert.equal(await run(db.client, [String(n.id)]), `#${n.id} Tagged\ntags: a, b\n\nline one\nline two`);
});

test("a note without tags or body shows tags: none and no body", async () => {
  const n = await add(db.client, { title: "Plain" });
  assert.equal(await run(db.client, [String(n.id)]), `#${n.id} Plain\ntags: none`);
});

test("a missing id rejects with NOT_FOUND", async () => {
  await assert.rejects(run(db.client, ["2147483647"]), {
    code: "NOT_FOUND",
    message: "no note #2147483647",
  });
});
