export const code = "M111007033";

/** Reject titles containing the whitespace-separated word m111007033, ignoring case. */
export function check(note) {
  if (typeof note.title !== "string") return null;
  return note.title.toLowerCase().split(/\s+/).includes("m111007033")
    ? "title contains m111007033"
    : null;
}
