import { Writable } from 'stream';
import printer from '@esmbly/printer';
import { Format } from '@esmbly/types';
import testRunner from '../helpers/testRunner';

const program = `
  function noAny(a: any): any {
    return a;
  }
`;

describe('rule: NoAny', () => {
  beforeAll(() => {
    printer.setOutStream(new Writable({ write: () => {} }));
    printer.forceDisableColors();
  });

  afterAll(() => {
    printer.setOutStream(process.stdout);
    printer.forceEnableColors();
  });

  it('throws an error that warns about the use of any', async () => {
    const output = [{ format: Format.AssemblyScript }];
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
