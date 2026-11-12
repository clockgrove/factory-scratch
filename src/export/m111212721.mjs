// Tag count: one `<id><TAB><tags>` line per note.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${(r.tags || []).length}`).join("\n");
}
