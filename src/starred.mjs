import { greet } from "./greet.mjs";

/** The greeting for a name between two asterisks, e.g. `*Hello, Ada.*`. */
export function starred(name) {
  return `*${greet(name)}*`;
}
