const { add } = require('./utils/add');
const { multiply } = require('./utils/multiply');

/**
 * Perform operations on a number
 * @param {number} n
 * @returns {object}
 */
function operateOn(n) {
  let current = n;

  const operatorObject = {
    add(n) {
      current = add(current, n);
      return this;
    },
    multiply(n) {
      current = multiply(current, n);
      return this;
    },
    done() {
      return current;
    }
  }

  return operatorObject;
}

module.exports.operateOn = operateOn;
