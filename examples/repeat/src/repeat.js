export function repeat(str, times) {
  let s = str;
  for (let i = 1; i < times; i += 1) {
    s = s + str;
  }
  return s;
}
