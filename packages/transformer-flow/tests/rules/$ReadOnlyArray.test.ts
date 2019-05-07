import { testRunner } from '../helpers/testRunner';

const input = `
  /* @flow */

  type A<B> = $ReadOnlyArray<B>
`;

const expected = `
  type A<B> = ReadonlyArray<B>;
`;

describe('rule: $ReadOnlyArray', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
