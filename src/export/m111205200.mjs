// One tab-separated note ID and tag count per line.
export function format(rows) {
  return rows.map((row) => `${row.id}\t${(row.tags || []).length}`).join("\n");
}
