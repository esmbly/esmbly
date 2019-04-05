import run from './__fixtures__/testRunner';

describe('transformer-jsdoc', () => {
  it('transforms the prototype example', async () => {
    const { expected, results } = await run('prototype');
    expect(results.content).toEqual(expected);
  });

  it('transforms the stripComments example', async () => {
    const { expected, results } = await run('stripComments', {
      stripComments: true,
    });
    expect(results.content).toEqual(expected);
  });

  it('transforms the variables example', async () => {
    const { expected, results } = await run('variables');
    expect(results.content).toEqual(expected);
  });

  it('transforms the functions example', async () => {
    const { expected, results } = await run('functions');
    expect(results.content).toEqual(expected);
  });
});
