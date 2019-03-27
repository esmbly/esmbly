function padLeft(str: string, maxLength: number): string {
  let s = str;
  while (s.length < maxLength) {
    s = ` ${s}`;
  }
  return s;
}

function padRight(str: string, maxLength: number): string {
  let s = str;
  while (s.length < maxLength) {
    s = `${s} `;
  }
  return s;
}

function isPadded(str: string): boolean {
  return str.length !== str.trim().length;
}

module.exports = {
  isPadded,
  padLeft,
  padRight,
};
