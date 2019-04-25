import testRunner from '../helpers/testRunner';

const input = `
  /* @flow */

  type A = typeof undefined;
  const b = typeof number;
`;

const expected = `
  type A = undefined;
  const b = typeof number;
`;

describe('rule: Typeof', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
