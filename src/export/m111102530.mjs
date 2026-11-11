/** Render notes in row order as tab-separated id, title and semicolon-separated tags. */
export function format(rows) {
  return rows.map((r) => `${r.id}\t${r.title}\t${(r.tags || []).join(";")}`).join("\n");
}
