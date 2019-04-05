/**
 * @param {number} n
 * @returns {number}
 */
const a = (n: number): number => n;
export { a };

/**
 * @param {number} n
 * @returns {number}
 */
export const b = (n: number): number => {
  return n;
};

/**
 * @param {number} n
 * @returns {number}
 */
export function c(n: number): number {
  return n;
}

/**
 * @param {number} n
 * @returns {number}
 */
function d(n: number): number {
  return n;
}

module.exports.d = d;

/**
 * @param {number} n
 * @returns {number}
 */
module.exports.e = function(n: number): number {
  return n;
};

/**
 * @param {number} n
 * @returns {number}
 */
exports.f = (n: number): number => n;

/**
 * @param {number} n
 * @returns {number}
 */
export const g = function(n: number): number {
  /**
   * @param {number} f
   * @returns {number}
   */
  const h = (f: number): number => f * 2;
  return h(2);
};

/**
 * @param {number} n
 * @returns {number}
 */
export const i = (n: number): number => {
  /**
   * @param {number} f
   * @returns {number}
   */
  function j(k: number): number {
    return k;
  }
  return j(n);
};

/**
 * @param {number} n
 * @returns {number}
 */
export default function(n: number): number {
  return n;
}
