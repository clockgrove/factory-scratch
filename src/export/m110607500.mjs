// Tab-separated lines: id, title and semicolon-joined tags, one note per line.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${r.title}\t${(r.tags || []).join(";")}`).join("\n");
}
