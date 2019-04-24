const add = require('.');

describe('add', () => {
  it('returns the sum of two numbers', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
