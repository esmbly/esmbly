import { Format } from '@esmbly/types';
import testRunner from '../__fixtures__/testRunner';

const program = `
  type A = number | undefined;
`;

describe('rule: NoUndefined', () => {
  it('throws an error that warns about the use of undefined', async () => {
    const output = [{ format: Format.AssemblyScript }];
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
