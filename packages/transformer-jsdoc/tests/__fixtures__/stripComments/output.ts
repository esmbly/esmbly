/**
 * US-Proto 2
 * As a package maintainer, I want to take a simple JavaScript
 * program with JSDoc comments and transform it to TypeScript using
 * the JSDoc transformer.
 */

// Some comment

function padLeft(str: string, maxLength: number): string {
  let s = str; // Inline comment
  while (s.length < maxLength) {
    s = ` ${s}`;
  }
  return s;
}

function padRight(str: string, maxLength: number): string {
  let s = str;
  // Inline comment
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
