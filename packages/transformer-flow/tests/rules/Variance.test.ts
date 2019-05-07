import { testRunner } from '../helpers/testRunner';

jest.mock('@esmbly/printer');

const input = `
  /* @flow */

  interface Variance {
    +a: string,
    -b: number
  }
`;

const expected = `
  interface Variance {
    readonly a: string,
    b: number,
  }
`;

describe('rule: Variance', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
