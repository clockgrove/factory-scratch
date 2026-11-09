// notes show <id>
import { parseArgs } from "node:util";
import { get } from "../notes.mjs";

const badId = () => Object.assign(new Error("show needs a positive integer id"), { code: "BAD_ID" });

/** Parse the single positive integer id from `args`, or throw BAD_ID. */
function parseId(args) {
  let positionals;
  try {
    ({ positionals } = parseArgs({ args, options: {}, allowPositionals: true, strict: true }));
  } catch {
    throw badId();
  }
  if (positionals.length !== 1 || !/^[1-9]\d*$/.test(positionals[0]) || Number(positionals[0]) > 2147483647) throw badId();
  return Number(positionals[0]);
}

/** Show one note: its id and title, its tags, and its body when it has one. */
export async function run(client, args) {
  const id = parseId(args);
  const note = await get(client, id);
  if (!note) throw Object.assign(new Error(`no note #${id}`), { code: "NOT_FOUND" });
  const lines = [`#${note.id} ${note.title}`, `tags: ${note.tags?.length ? note.tags.join(", ") : "none"}`];
  if (note.body) lines.push("", note.body);
  return lines.join("\n");
}
