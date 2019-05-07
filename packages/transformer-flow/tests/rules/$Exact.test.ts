import testRunner from '../helpers/testRunner';

jest.mock('@esmbly/printer');

const input = `
  /* @flow */

  type A<B> = $Exact<B>;
`;

const expected = `
  type A<B> = B;
`;

describe('rule: $Exact', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
