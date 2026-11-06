// notes bump-m110608362 <id>

/** Increments the m110608362 counter of a note and reports the new value. */
export async function run(client, args) {
  if (!args[0] || !/^-?\d+$/.test(args[0])) {
    throw Object.assign(new Error("bump-m110608362 needs an integer id"), { code: "BAD_ID" });
  }
  const id = Number(args[0]);
  const { rows } = await client.query(
    "UPDATE notes SET m110608362_count = m110608362_count + 1 WHERE id = $1 RETURNING m110608362_count",
    [id],
  );
  const row = rows[0];
  if (!row) return `no note #${id}`;
  return `#${id} m110608362_count=${row.m110608362_count}`;
}
