const { getLength } = require('./index');

describe('getLength', () => {
  it('gets the length of an array', () => {
    expect(getLength([1, 2, 3])).toEqual(3);
    expect(getLength([1, 2, 3, 4])).toEqual(4);
  });
});