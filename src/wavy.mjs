import { greet } from "./greet.mjs";

/** The greeting for a name between two tildes. */
export function wavy(name) {
  return `~${greet(name)}~`;
}
