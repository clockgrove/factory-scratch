// Export each note's id and tag count as a tab-separated line.
export function format(rows) {
  return rows.map((r) => `${r.id}\t${(r.tags ?? []).length}`).join("\n");
}
