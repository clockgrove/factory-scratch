export const code = "M111007043";

/** Refuse a title containing the whitespace-separated word m111007043, ignoring case. */
export function check(note) {
  return typeof note.title === "string" && note.title.toLowerCase().split(/\s+/u).includes("m111007043")
    ? "title contains m111007043"
    : null;
}
