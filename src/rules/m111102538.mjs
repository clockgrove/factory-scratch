export const code = "M111102538";

/** Refuse a title containing the whitespace-separated word m111102538, ignoring case. */
export function check(note) {
  return typeof note.title === "string" && note.title.toLowerCase().split(/\s+/u).includes("m111102538")
    ? "title contains m111102538"
    : null;
}
