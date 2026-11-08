import { greet } from "./greet.mjs";

/** The greeting for a name with its final full stop replaced by an exclamation mark. */
export function excited(name) {
  return greet(name).replace(/\.$/, "!");
}
