const { operateOn } = require('../lib');

describe('operateOn', () => {
  it('perform math operations on the provided number', () => {
    expect(operateOn(2).add(1).multiply(5).done()).toEqual(15);
  });
});
