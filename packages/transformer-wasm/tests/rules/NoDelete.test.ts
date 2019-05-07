import { Writable } from 'stream';
import printer from '@esmbly/printer';
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
  beforeAll(() => {
    printer.setOutStream(new Writable({ write: () => {} }));
    printer.forceDisableColors();
  });

  afterAll(() => {
    printer.setOutStream(process.stdout);
    printer.forceEnableColors();
  });

  it('throws an error that warns about the use of delete', async () => {
    const output = [{ format: Format.AssemblyScript }];
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
