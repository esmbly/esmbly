const add = function add(a: number, b: number): number {
  return a + b;
};

// eslint-disable-next-line func-names
const add2 = function(a: number, b: number): number {
  return a + b;
};

module.exports = { add, add2 };
