import { greet } from "./greet.mjs";

/** The greeting for a name, said twice with one space between. */
export function twice111306570(name) {
  const greeting = greet(name);
  return `${greeting} ${greeting}`;
}
