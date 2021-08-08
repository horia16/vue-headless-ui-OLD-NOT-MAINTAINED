export default function randomString() {
  return [...Array(30)].map(() => Math.random().toString(36)[2]).join("");
}
