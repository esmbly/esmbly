import testRunner from '../helpers/testRunner';

const input = `
  /* @flow */

  opaque type Opaque = number;
`;

const expected = `
  type Opaque = number;
`;

describe('rule: Opaque', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
