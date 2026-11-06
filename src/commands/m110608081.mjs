// notes m110608081 [--limit N]: the newest titles in one line
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Throws a BAD_ARGS error with `message`. */
function badArgs(message) {
  throw Object.assign(new Error(message), { code: "BAD_ARGS" });
}

/** Returns the newest note titles joined by " | ", validating --limit before any database call. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } }));
  } catch (e) {
    badArgs(e.message);
  }
  if (!/^[1-9][0-9]*$/.test(values.limit)) badArgs("--limit must be a positive integer");
  const rows = await list(client, { limit: Number(values.limit) });
  return rows.map((r) => r.title).join(" | ");
}
