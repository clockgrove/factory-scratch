// notes tags [--min N]
import { parseArgs } from "node:util";
import { tagCounts } from "../notes.mjs";

/** Prints each tag and its note count, one "tag<TAB>count" line per tag, for tags on at least --min notes. */
export async function run(client, args) {
  let values;
  try {
    ({ values } = parseArgs({ args, options: { min: { type: "string", default: "1" } }, allowPositionals: false, strict: true }));
  } catch (err) {
    // `--min -1` or a bare `--min` is a bad --min value, not a parse problem.
    if (err.code === "ERR_PARSE_ARGS_INVALID_OPTION_VALUE") throw Object.assign(new Error("tags needs --min as a positive integer"), { code: "BAD_MIN" });
    throw err;
  }
  const min = Number(values.min);
  if (!/^\d+$/.test(values.min) || min < 1 || min > 2147483647) {
    throw Object.assign(new Error("tags needs --min as a positive integer"), { code: "BAD_MIN" });
  }
  return (await tagCounts(client, { min })).map((r) => `${r.tag}\t${r.count}`).join("\n");
}
