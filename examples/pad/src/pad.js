// @flow

export function padLeft(str: string, maxLength: number): string {
  let s = str;
  while (s.length < maxLength) {
    s = ' ' + s;
  }
  return s;
}

export function padRight(str: string, maxLength: number): string {
  let s = str;
  while (s.length < maxLength) {
    s = s + ' ';
  }
  return s;
}
