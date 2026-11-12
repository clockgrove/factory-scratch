// Return each note's id and JavaScript title length separated by a tab.
export function format(rows) {
  return rows.map((row) => `${row.id}\t${(row.title ?? "").length}`).join("\n");
}
