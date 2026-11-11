import { parseArgs } from "node:util";

/** Validates the optional minimum count before querying. */
function parseOptions(args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { min: { type: "string" } } }));
  } catch (cause) {
    throw Object.assign(new Error(cause.message), { code: "BAD_ARGS" });
  }
  if (values.min === undefined) return { min: null };
  const min = /^\d+$/.test(values.min) ? Number(values.min) : 0;
  if (min < 1 || min > 2147483647) {
    throw Object.assign(new Error("Expected --min from 1 to 2147483647"), { code: "BAD_ARGS" });
  }
  return { min };
}

/** Reports how many notes have no tags, or that there are fewer than the minimum. */
export async function run(client, args) {
  const { min } = parseOptions(args);
  const { rows } = await client.query("SELECT COUNT(*)::int AS count FROM notes WHERE cardinality(tags) = 0");
  const { count } = rows[0];
  return min !== null && count < min ? `fewer than ${min} untagged` : `${count} untagged`;
}
