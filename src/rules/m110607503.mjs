// A note title may be at most 60 characters long; a missing title is left to title-required.
export const code = "M110607503";
export function check(note) {
  if (typeof note.title !== "string") return null;
  return note.title.length > 60 ? "title longer than 60 characters" : null;
}
