const { add, add2 } = require('.');

describe('add', () => {
  it('returns the sum of two numbers', () => {
    expect(add(1, 2)).toEqual(3);
  });
});

describe('add2', () => {
  it('returns the sum of two numbers', () => {
    expect(add2(1, 2)).toEqual(3);
  });
});
