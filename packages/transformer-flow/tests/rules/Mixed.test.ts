import { testRunner } from '../helpers/testRunner';

const input = `
  /* @flow */

  function Mixed(x: mixed): string {
    return \`default string \${x}\`;
  }
`;

const expected = `
  function Mixed(x: unknown): string {
    return \`default string \${x}\`;
  }
`;

describe('rule: Mixed', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
