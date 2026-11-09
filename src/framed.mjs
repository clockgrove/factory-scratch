import { greet } from "./greet.mjs";

/** The greeting for a name, wrapped in square brackets. */
export function framed(name) {
  return `[${greet(name)}]`;
}
