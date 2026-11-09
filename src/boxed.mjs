import { greet } from "./greet.mjs";

/** The greeting for a name between a pair of pipes with no space inside. */
export function boxed(name) {
  return "|" + greet(name) + "|";
}
