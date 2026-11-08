import { greet } from "./greet.mjs";

/** The greeting for a name, repeated twice and joined by one space. */
export function doubled(name) {
  return `${greet(name)} ${greet(name)}`;
}
