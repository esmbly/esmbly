import testRunner from '../helpers/testRunner';

const input = `
  /* @flow */

  type Indexer = { [string]: boolean }
`;

const expected = `
  type Indexer = { [a: string]: boolean };
`;

describe('rule: Indexers', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
