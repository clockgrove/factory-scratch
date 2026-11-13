import { greet } from "./greet.mjs";

/** The greeting for a name repeated twice, joined by one space. */
export function twice111307040(name) {
  const greeting = greet(name);
  return `${greeting} ${greeting}`;
}
