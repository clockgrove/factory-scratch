// notes bump-m110608082 <id>

/** Increments the note's m110608082_count and reports the new value. */
export async function run(client, args) {
  const id = Number(args[0]);
  if (!Number.isInteger(id)) throw Object.assign(new Error("bump-m110608082 needs a numeric id"), { code: "BAD_ID" });
  const { rows } = await client.query(
    "UPDATE notes SET m110608082_count = m110608082_count + 1 WHERE id = $1 RETURNING m110608082_count",
    [id],
  );
  return rows.length ? `#${id} m110608082_count=${rows[0].m110608082_count}` : `no note #${id}`;
}
