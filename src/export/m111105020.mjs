/** Render each note in row order as one line of id, title and semicolon-joined tags separated by tabs, as stored. */
export function format(rows) {
  return rows.map((r) => `${r.id}\t${r.title}\t${(r.tags || []).join(";")}`).join("\n");
}
