// notes m110609031 [--limit N]: the newest titles in one line.
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Reads --limit from args, turning a parse failure (such as `--limit -1`) into BAD_ARGS. */
function parseLimit(args) {
  try {
    return parseArgs({ args, options: { limit: { type: "string", default: "5" } } }).values.limit;
  } catch (err) {
    throw Object.assign(new Error(`m110609031: ${err.message}`), { code: "BAD_ARGS" });
  }
}

/** Returns the newest N note titles joined by " | ", validating --limit before touching the store. */
export async function run(client, args) {
  const n = Number(parseLimit(args));
  if (!Number.isInteger(n) || n <= 0) {
    throw Object.assign(new Error("m110609031 needs --limit to be a positive integer"), { code: "BAD_ARGS" });
  }
  const rows = await list(client, { limit: n });
  return rows.map((r) => r.title).join(" | ");
}
