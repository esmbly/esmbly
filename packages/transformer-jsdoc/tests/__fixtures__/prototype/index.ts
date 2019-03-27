/**
 * US-Proto 2
 * As a package maintainer, I want to take a simple JavaScript
 * program with JSDoc comments and transform it to TypeScript using
 * the JSDoc transformer.
 */

/**
 * Left pads the string.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
function padLeft(str: string, maxLength: number): string {
  let s = str;
  while (s.length < maxLength) {
    s = ` ${s}`;
  }
  return s;
}

/**
 * Right pads the string.
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
function padRight(str: string, maxLength: number): string {
  let s = str;
  while (s.length < maxLength) {
    s = `${s} `;
  }
  return s;
}

/**
 * Checks if the string is padded.
 * @param {string} str
 * @returns {boolean}
 */
function isPadded(str: string): boolean {
  return str.length !== str.trim().length;
}

module.exports = {
  isPadded,
  padLeft,
  padRight,
};
