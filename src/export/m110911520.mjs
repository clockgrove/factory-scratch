// One tab-separated line per note: id, title and semicolon-joined tags, as stored.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${r.title}\t${(r.tags || []).join(";")}`).join("\n");
}
