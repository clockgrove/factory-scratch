// notes m110610171 [--limit N]
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Lists the newest note titles, joined by " | ", up to a positive limit. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { limit: { type: "string", default: "5" } } }));
  } catch (err) {
    throw Object.assign(new Error(err.message), { code: "BAD_ARGS" });
  }
  if (!/^[1-9]\d*$/.test(values.limit)) throw Object.assign(new Error("m110610171 needs --limit as a positive integer"), { code: "BAD_ARGS" });
  const rows = await list(client, { limit: Number(values.limit) });
  return rows.map((r) => r.title).join(" | ");
}
