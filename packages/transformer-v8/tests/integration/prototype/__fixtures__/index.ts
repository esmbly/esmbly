/**
 * US-Proto 3
 * As a developer interested in migrating to TypeScript, I want to
 * take a simple JavaScript program that is covered by a test suite,
 * and transform it to TypeScript using the V8 transformer
 */

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
