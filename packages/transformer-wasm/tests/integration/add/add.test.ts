import { Format } from '@esmbly/types';
import testRunner from '../../helpers/testRunner';

const program = `
  export function add(a: number, b: number): number {
    return a + b;
  }
`;

describe('integration: add', () => {
  it('transforms the input program to WebAssembly', async () => {
    const output = [{ format: Format.WebAssembly }];
    const [{ content }] = await testRunner(program, output);
    // @ts-ignore
    const { instance } = await WebAssembly.instantiate(content, {});
    expect(instance.exports.add(2, 3)).toEqual(5);
  });

  it('transforms the input program to Wat', async () => {
    const output = [{ format: Format.Wat }];
    const [{ content }] = await testRunner(program, output);
    expect(content).toMatchSnapshot();
  });

  it('transforms the input program to asm.js', async () => {
    const output = [{ format: Format.Asm }];
    const [{ content }] = await testRunner(program, output);
    expect(content).toMatchSnapshot();
  });

  it('transforms the input program to AssemblyScript', async () => {
    const output = [{ format: Format.AssemblyScript }];
    const [{ content }] = await testRunner(program, output);
    expect(content).toMatchSnapshot();
  });
});
