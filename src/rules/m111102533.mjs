export const code = "M111102533";

/** Refuse a title containing the whitespace-separated word m111102533, ignoring case. */
export function check(note) {
  return typeof note.title === "string" && note.title.toLowerCase().split(/\s+/u).includes("m111102533")
    ? "title contains m111102533"
    : null;
}
