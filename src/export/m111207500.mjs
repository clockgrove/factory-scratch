// One tab-separated id and title word count per note.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${(r.title?.match(/\S+/gu) || []).length}`).join("\n");
}
