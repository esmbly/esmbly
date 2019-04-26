const { add } = require('../src/add');

describe('add', () => {
  it('adds two numbers', async () => {
    await expect(add(2, 3)).resolves.toEqual(5);
  });
});
