/**
 * Create a random string
 */
export default function randomString(length = 30) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
}
