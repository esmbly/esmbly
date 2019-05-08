const add = require('../');

describe('add', () => {
  it('adds two numbers', async () => {
    expect(add(2, 3)).toEqual(5);
  });
});
