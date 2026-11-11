import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Validates the result limit before querying. */
function parseOptions(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: {
      limit: { type: "string", default: "5" },
    } }));
  } catch (cause) {
    throw Object.assign(new Error(cause.message), { code: "BAD_ARGS" });
  }
  const limit = /^\d+$/.test(values.limit) ? Number(values.limit) : 0;
  if (limit < 1 || limit > 2147483647) {
    throw Object.assign(new Error("Expected --limit from 1 to 2147483647"), { code: "BAD_ARGS" });
  }
  return { limit };
}

/** Returns the titles of the newest notes joined by " | ", up to the limit. */
export async function run(client, args) {
  const { limit } = parseOptions(args);
  const rows = await list(client, { limit });
  return rows.map((r) => r.title).join(" | ");
}
