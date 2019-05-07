import { testRunner } from '../helpers/testRunner';

jest.mock('@esmbly/printer');

const input = `
  /* @flow */

  type Exact = {| a: number, b: string |}
`;

const expected = `
  type Exact = {
    a: number,
    b: string,
  };
`;

describe('rule: Exact', () => {
  it('correctly transforms the input to TypeScript', async () => {
    const [{ content }] = await testRunner(input);
    expect(content).toEqual(expected);
  });
});
