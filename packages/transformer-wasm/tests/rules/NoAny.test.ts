import { Format } from '@esmbly/types';
import testRunner from '../__fixtures__/testRunner';

const program = `
  function noAny(a: any): any {
    return a;
  }
`;

describe('rule: NoAny', () => {
  it('throws an error that warns about the use of any', async () => {
    const output = [{ format: Format.AssemblyScript }];
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
