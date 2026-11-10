/** Increment a note's counter and return its new value with the original id spelling. */
export async function run(client, args) {
  const id = args[0];
  if (typeof id !== "string" || !/^-?\d+$/.test(id)) {
    throw Object.assign(new Error("bump-m111007042 needs a decimal id"), { code: "BAD_ID" });
  }
  const value = BigInt(id);
  if (value < -2147483648n || value > 2147483647n) return `no note #${id}`;
  const result = await client.query("UPDATE notes SET m111007042_count = m111007042_count + 1 WHERE id = $1 RETURNING m111007042_count", [id]);
  return result.rows.length ? `#${id} m111007042_count=${result.rows[0].m111007042_count}` : `no note #${id}`;
}
