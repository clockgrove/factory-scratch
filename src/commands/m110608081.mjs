// notes m110608081 [--limit N]: the newest titles in one line
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Returns the newest note titles joined by " | ", validating --limit before any database call. */
export async function run(client, args) {
  const { values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } });
  if (!/^[1-9][0-9]*$/.test(values.limit)) {
    throw Object.assign(new Error("--limit must be a positive integer"), { code: "BAD_ARGS" });
  }
  const rows = await list(client, { limit: Number(values.limit) });
  return rows.map((r) => r.title).join(" | ");
}
