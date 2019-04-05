/**
 * @param {number} n
 * @returns {number}
 */
const a = n => n;
export { a };

/**
 * @param {number} n
 * @returns {number}
 */
export const b = n => {
  return n;
};

/**
 * @param {number} n
 * @returns {number}
 */
export function c(n) {
  return n;
}

/**
 * @param {number} n
 * @returns {number}
 */
function d(n) {
  return n;
}

module.exports.d = d;

/**
 * @param {number} n
 * @returns {number}
 */
module.exports.e = function(n) { // eslint-disable-line
  return n;
};

/**
 * @param {number} n
 * @returns {number}
 */
exports.f = n => n;

/**
 * @param {number} n
 * @returns {number}
 */
export const g = function(n) { // eslint-disable-line
  /**
   * @param {number} f
   * @returns {number}
   */
  const h = f => f * 2;
  return h(2);
};

/**
 * @param {number} n
 * @returns {number}
 */
export const i = n => {
  /**
   * @param {number} f
   * @returns {number}
   */
  function j(k) {
    return k;
  }
  return j(n);
};

/**
 * @param {number} n
 * @returns {number}
 */
export default function(n) {
  return n;
}
