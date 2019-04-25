import testRunner from '../helpers/testRunner';

const input = `
  /* @flow */

  const a = (42: B);
`;

const expected = `
  const a = (42 as B);
`;

describe('rule: Casting', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
