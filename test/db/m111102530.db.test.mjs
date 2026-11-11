import assert from "node:assert/strict";
import { test } from "node:test";
import { run } from "../../src/commands/list.mjs";
import { format } from "../../src/export/m111102530.mjs";
import { add, list } from "../../src/notes.mjs";
import { freshClient } from "./helpers.mjs";

test("m111102530 formats two stored notes from list and the discovered list command", async () => {
  const db = await freshClient("m111102530");
  try {
    const first = await add(db.client, { title: "first", tags: ["alpha", "beta"] });
    const second = await add(db.client, { title: "second", tags: [] });
    const expected = `${second.id}\tsecond\t\n${first.id}\tfirst\talpha;beta`;
    assert.equal(format(await list(db.client)), expected);
    assert.equal(await run(db.client, ["--format", "m111102530"]), expected);
  } finally {
    await db.done();
  }
});
