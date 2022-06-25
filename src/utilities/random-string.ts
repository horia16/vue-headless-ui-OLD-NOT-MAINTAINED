export default function (length = 20) {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
}
