import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { run } from "../../src/commands/m111102534.mjs";
import { add } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

let db;
before(async () => { db = await freshClient("m111102534"); });
after(async () => { await db.done(); });

test("a tagged near note comes first and an untagged nearer note is excluded", async () => {
  await add(db.client, { title: "untagged", embedding: [1, 0, 0] });
  const far = await add(db.client, { title: "far", tags: ["t"], embedding: [5, 0, 0] });
  const near = await add(db.client, { title: "near", tags: ["t"], embedding: [2, 0, 0] });
  const out = await run(db.client, ["--tag", "t", "--embedding", "1,0,0"]);
  assert.equal(out, `#${near.id} near (1.000)\n#${far.id} far (4.000)`);
});

test("--k caps the rows", async () => {
  const near = await add(db.client, { title: "near", tags: ["k"], embedding: [2, 0, 0] });
  await add(db.client, { title: "far", tags: ["k"], embedding: [5, 0, 0] });
  const out = await run(db.client, ["--tag", "k", "--embedding", "1,0,0", "--k", "1"]);
  assert.equal(out, `#${near.id} near (1.000)`);
});

test("no matching note returns an empty string", async () => {
  assert.equal(await run(db.client, ["--tag", "none", "--embedding", "1,0,0"]), "");
});
