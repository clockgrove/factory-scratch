import { greet } from "./greet.mjs";

/** The greeting for a name, wrapped in square brackets. */
export function bracket1109140(name) {
  return `[${greet(name)}]`;
}
