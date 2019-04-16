import run from './__fixtures__/testRunner';

describe('transformer-flow', () => {
  it('transforms the prototype example', async () => {
    const { expected, results } = await run('prototype');
    expect(results.content).toEqual(expected);
  });
});
