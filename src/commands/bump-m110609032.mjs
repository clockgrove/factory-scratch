// notes bump-m110609032 <id>

const INT4_MIN = -2147483648;
const INT4_MAX = 2147483647;

/** Increments the m110609032 counter of a note and reports the new value. */
export async function run(client, args) {
  const raw = typeof args[0] === "string" ? args[0].trim() : "";
  const id = Number(raw);
  if (raw === "" || !Number.isInteger(id)) {
    throw Object.assign(new Error("bump-m110609032 needs an integer id"), { code: "BAD_ID" });
  }
  if (id < INT4_MIN || id > INT4_MAX) return `no note #${raw}`;
  const { rows } = await client.query(
    "UPDATE notes SET m110609032_count = m110609032_count + 1 WHERE id = $1 RETURNING m110609032_count",
    [id],
  );
  const row = rows[0];
  if (!row) return `no note #${id}`;
  return `#${id} m110609032_count=${row.m110609032_count}`;
}
