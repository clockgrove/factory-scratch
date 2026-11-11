// notes m111118571 [--limit N]: the newest note titles in one line.
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Parses and validates `--limit` (decimal digits, 1 to 2147483647, default 5) before any query. */
function parseLimit(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } }));
  } catch (cause) {
    throw Object.assign(new Error(cause.message), { code: "BAD_ARGS" });
  }
  const limit = /^\d+$/.test(values.limit) ? Number(values.limit) : 0;
  if (limit < 1 || limit > 2147483647) {
    throw Object.assign(new Error("Expected --limit from 1 to 2147483647"), { code: "BAD_ARGS" });
  }
  return limit;
}

/** Returns the newest `--limit` titles, newest first, joined by " | ". */
export async function run(client, args) {
  const limit = parseLimit(args);
  const rows = await list(client, { limit });
  return rows.map((row) => row.title).join(" | ");
}
