import { Format } from '@esmbly/types';
import { testRunner } from '../../helpers/testRunner';

jest.mock('@esmbly/printer');

const program = `
  export function first(arr: Int32Array): string {
    return arr[0];
  }
`;

describe('integration: compile-errors', () => {
  it('prints an error message', async () => {
    expect.assertions(1);

    try {
      const output = [{ format: Format.WebAssembly }];
      await testRunner(program, output);
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });
});
