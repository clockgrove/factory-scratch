import { greet } from "./greet.mjs";

/** The number of characters in the greeting for a name. */
export function length(name) {
  return greet(name).length;
}
