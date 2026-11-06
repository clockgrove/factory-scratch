// notes m110607501 [--limit N]
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Returns the titles of the newest notes joined by " | ", up to --limit (default 5). */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } }));
  } catch (err) {
    throw Object.assign(new Error(err.message), { code: "BAD_ARGS" });
  }
  if (!/^[1-9][0-9]*$/.test(values.limit)) throw Object.assign(new Error("--limit must be a positive integer"), { code: "BAD_ARGS" });
  const rows = await list(client, { limit: Number(values.limit) });
  return rows.map((r) => r.title).join(" | ");
}
