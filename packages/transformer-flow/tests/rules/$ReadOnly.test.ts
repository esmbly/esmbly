import testRunner from '../helpers/testRunner';

const input = `
  /* @flow */

  type A<B> = $ReadOnly<B>
`;

const expected = `
  type A<B> = Readonly<B>;
`;

describe('rule: $ReadOnly', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
