import testRunner from '../helpers/testRunner';

const input = `
  /* @flow */

  function a(x: void): string {
    return x || "default string";
  }
`;

const expected = `
  function a(x: undefined): string {
    return x || "default string";
  }
`;

describe('rule: Undefined', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
