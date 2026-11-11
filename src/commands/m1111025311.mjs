// notes m1111025311 [--limit N]: the newest note titles in one line.
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Return the newest `--limit` note titles (default 5), newest first, joined by " | ". */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } }, strict: true, allowPositionals: false }));
  } catch (error) {
    throw Object.assign(new Error(error.message), { code: "BAD_ARGS" });
  }
  const limit = Number(values.limit);
  if (!/^\d+$/.test(values.limit) || limit < 1 || limit > 2147483647) {
    throw Object.assign(new Error("--limit must be decimal digits from 1 to 2147483647"), { code: "BAD_ARGS" });
  }
  return (await list(client, { limit })).map((row) => row.title).join(" | ");
}
