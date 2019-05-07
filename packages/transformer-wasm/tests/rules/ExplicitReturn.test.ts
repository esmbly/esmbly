import { Writable } from 'stream';
import { printer } from '@esmbly/printer';
import { Format } from '@esmbly/types';
import { testRunner } from '../helpers/testRunner';

describe('rule: ExplicitReturn', () => {
  beforeAll(() => {
    printer.setOutStream(new Writable({ write: () => {} }));
    printer.forceDisableColors();
  });

  afterAll(() => {
    printer.setOutStream(process.stdout);
    printer.forceEnableColors();
  });

  it('throws an error that warns about non explicit return for arrow functions', async () => {
    const output = [{ format: Format.AssemblyScript }];
    const program = `const square = (n: number) => n * n;`;
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws an error that warns about non explicit return for class methods', async () => {
    const output = [{ format: Format.AssemblyScript }];
    const program = `
      class A {
        square(n: number) {
          return n * n;
        }
      }
    `;
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws an error that warns about non explicit return for function declarations', async () => {
    const output = [{ format: Format.AssemblyScript }];
    const program = `
      function square(n: number) {
        return n * n;
      }
    `;
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws an error that warns about non explicit return for function expressions', async () => {
    const output = [{ format: Format.AssemblyScript }];
    const program = `
      const square = function(n: number) {
        return n * n;
      }
    `;
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws an error that warns about non explicit return for object methods', async () => {
    const output = [{ format: Format.AssemblyScript }];
    const program = `
      const m = {
        square(n: number) {
          return n * n;
        }
      }
    `;
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws an error that warns about non explicit return for ts function declaration', async () => {
    const output = [{ format: Format.AssemblyScript }];
    const program = `declare function square(n: number);`;
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws an error that warns about non explicit return for ts method declaration', async () => {
    const output = [{ format: Format.AssemblyScript }];
    const program = `
      declare class M {
        public square(n: number);
      }
    `;
    await expect(
      testRunner(program, output),
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
