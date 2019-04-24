import { Format } from '@esmbly/types';
import testRunner from '../helpers/testRunner';

const program = `
  function noDelete(a: number[]): number[] {
    if (a.length > 0) {
      delete a[1];
    }
    return a;
  }
`;

describe('rule: NoDelete', () => {
  it('throws an error that warns about the use of delete', async () => {
    const output = [{ format: Format.AssemblyScript }];
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
