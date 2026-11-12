/** One line per note: <id><TAB><word count>. */
export function format(rows) {
  return rows.map((r) => `${r.id}\t${((r.title ?? "").match(/\S+/g) || []).length}`).join("\n");
}
