import { testRunner } from '../helpers/testRunner';

const input = `
  /* @flow */

  type A<B> = B | $Keys<A>
`;

const expected = `
  type A<B> = B | keyof A;
`;

describe('rule: $Keys', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
