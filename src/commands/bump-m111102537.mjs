/** Increment a note's counter and return its new value with the original id spelling. */
export async function run(client, args) {
  const id = args[0];
  if (typeof id !== "string" || !/^-?\d+$/.test(id)) {
    throw Object.assign(new Error("bump-m111102537 needs a decimal id"), { code: "BAD_ID" });
  }
  const value = BigInt(id);
  if (value < -2147483648n || value > 2147483647n) return `no note #${id}`;
  const result = await client.query("UPDATE notes SET m111102537_count = m111102537_count + 1 WHERE id = $1 RETURNING m111102537_count", [id]);
  return result.rows.length ? `#${id} m111102537_count=${result.rows[0].m111102537_count}` : `no note #${id}`;
}
