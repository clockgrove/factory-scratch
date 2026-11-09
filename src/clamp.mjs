/** Returns n limited to the range lo..hi (inclusive). */
export function clamp(n, lo, hi) {
  return Math.min(Math.max(n, lo), hi);
}
