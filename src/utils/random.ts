/**
 * Create a random string with a specified length
 */
export function randomString(length = 30) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
}
