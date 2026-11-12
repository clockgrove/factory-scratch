// Title word count: one `<id><TAB><words>` line per note.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${((r.title ?? "").match(/\S+/g) || []).length}`).join("\n");
}
