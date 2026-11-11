// notes m111102531 [--limit N]
import { parseArgs } from "node:util";
import { list } from "../notes.mjs";

/** Builds an error carrying the BAD_ARGS code. */
function badArgs(message) {
  return Object.assign(new Error(message), { code: "BAD_ARGS" });
}

/** Parses the arguments, rethrowing parseArgs failures as BAD_ARGS. */
function parse(args) {
  try {
    return parseArgs({ args, options: { limit: { type: "string", default: "5" } }, strict: true, allowPositionals: false }).values;
  } catch (e) {
    throw badArgs(e.message);
  }
}

/** Returns the limit as a number once it is digits only and within 1..2147483647. */
function validLimit(text) {
  if (!/^\d+$/.test(text)) throw badArgs(`invalid --limit: ${text}`);
  const n = BigInt(text);
  if (n < 1n || n > 2147483647n) throw badArgs(`--limit out of range: ${text}`);
  return Number(n);
}

/** Returns the newest N note titles joined by " | ". */
export async function run(client, args) {
  const limit = validLimit(parse(args).limit);
  const rows = await list(client, { limit });
  return rows.map((r) => r.title).join(" | ");
}
