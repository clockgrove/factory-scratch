import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { add, similarByTag } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m110608364"); });
after(async () => { await db.done(); });

test("a tagged near note comes first with distance 0", async () => {
  const near = await add(db.client, { title: "near", tags: ["t1"], embedding: [1, 0, 0] });
  await add(db.client, { title: "far", tags: ["t1"], embedding: [0, 10, 0] });
  const rows = await similarByTag(db.client, "t1", [1, 0, 0]);
  assert.equal(rows[0].id, near.id);
  assert.equal(Number(rows[0].distance), 0);
});

test("an untagged nearer note is excluded", async () => {
  const untagged = await add(db.client, { title: "untagged", tags: [], embedding: [1, 0, 0] });
  const tagged = await add(db.client, { title: "tagged", tags: ["t2"], embedding: [0, 5, 0] });
  const rows = await similarByTag(db.client, "t2", [1, 0, 0]);
  assert.equal(rows[0].id, tagged.id);
  assert.equal(rows.map((r) => r.id).includes(untagged.id), false);
});

test("k caps the rows", async () => {
  for (const x of [1, 2, 3]) await add(db.client, { title: `n${x}`, tags: ["t3"], embedding: [x, 0, 0] });
  const rows = await similarByTag(db.client, "t3", [0, 0, 0], 2);
  assert.equal(rows.length, 2);
});
