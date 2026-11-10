/** Render notes in row order as tab-separated id, title and semicolon-separated tags. */
export function format(rows) {
  return rows.map((row) => `${row.id}\t${row.title}\t${row.tags.join(";")}`).join("\n");
}
