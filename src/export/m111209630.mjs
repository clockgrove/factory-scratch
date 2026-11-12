// Count maximal non-whitespace runs in each note's title.
export function format(rows) {
  return rows.map((row) => `${row.id}\t${(row.title ?? "").match(/\S+/gu)?.length ?? 0}`).join("\n");
}
