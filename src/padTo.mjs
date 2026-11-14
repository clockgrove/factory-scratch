/** The text followed by spaces up to width characters, never cut when already at or past width. */
export function padTo(text, width) {
  return text.padEnd(width);
}
