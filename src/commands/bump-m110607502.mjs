// notes bump-m110607502 <id>
import { parseArgs } from "node:util";

/** Increments the m110607502_count of one note and reports the new value. */
export async function run(client, args) {
  const { positionals } = parseArgs({ args, allowPositionals: true });
  const id = positionals[0];
  if (id === undefined || !/^-?\d+$/.test(id)) {
    throw Object.assign(new Error("bump-m110607502 needs a numeric id"), { code: "BAD_ID" });
  }
  const { rows } = await client.query(
    "UPDATE notes SET m110607502_count = m110607502_count + 1 WHERE id = $1 RETURNING m110607502_count",
    [id],
  );
  return rows.length ? `#${id} m110607502_count=${rows[0].m110607502_count}` : `no note #${id}`;
}
