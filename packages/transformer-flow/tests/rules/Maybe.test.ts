import testRunner from '../helpers/testRunner';

const input = `
  /* @flow */

  function Maybe(x: ?string): string {
    if (x) {
      return x;
    }
    return "default string";
  }
`;

const expected = `
  function Maybe(x: string | null | undefined): string {
    if (x) {
      return x;
    }
    return "default string";
  }
`;

describe('rule: Maybe', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
