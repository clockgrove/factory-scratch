// Plain lines: one note per line as id, title and ;-joined tags separated by tabs.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${r.title}\t${(r.tags || []).join(";")}`).join("\n");
}
