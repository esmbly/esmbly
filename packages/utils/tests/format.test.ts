import { Format, Output } from '@esmbly/types';
import { outputFactory, toOutputFormat } from '../src';

describe('outputFactory', () => {
  it('returns an output object when called with a string', () => {
    expect(outputFactory('ts')).toEqual({
      format: Format.TypeScript,
    });
  });

  it('returns an output object when called with an output object', () => {
    const output: Output = { format: Format.TypeScript, outDir: '/some/path' };
    expect(outputFactory(output)).toEqual({
      format: Format.TypeScript,
      outDir: '/some/path',
    });
  });

  it('defaults to returning the provided string when there is no matching output type', () => {
    expect(outputFactory('coffee')).toEqual({
      format: 'coffee',
    });
  });
});

describe('toOutputFormat', () => {
  it('converts a string to Format.AssemblyScript', () => {
    expect(toOutputFormat('as')).toEqual(Format.AssemblyScript);
    expect(toOutputFormat('.as.js')).toEqual(Format.AssemblyScript);
    expect(toOutputFormat('.as')).toEqual(Format.AssemblyScript);
    expect(toOutputFormat('AssemblyScript')).toEqual(Format.AssemblyScript);
    expect(toOutputFormat('ASSEMBLYSCRIPT')).toEqual(Format.AssemblyScript);
  });

  it('converts a string to Format.Asm', () => {
    expect(toOutputFormat('asm')).toEqual(Format.Asm);
    expect(toOutputFormat('asm.js')).toEqual(Format.Asm);
    expect(toOutputFormat('.asm')).toEqual(Format.Asm);
    expect(toOutputFormat('.asm.js')).toEqual(Format.Asm);
    expect(toOutputFormat('Asm')).toEqual(Format.Asm);
    expect(toOutputFormat('ASM')).toEqual(Format.Asm);
  });

  it('converts a string to Format.Flow', () => {
    expect(toOutputFormat('flow')).toEqual(Format.Flow);
    expect(toOutputFormat('.flow')).toEqual(Format.Flow);
    expect(toOutputFormat('Flow')).toEqual(Format.Flow);
    expect(toOutputFormat('FLOW')).toEqual(Format.Flow);
  });

  it('converts a string to Format.TypeScript', () => {
    expect(toOutputFormat('ts')).toEqual(Format.TypeScript);
    expect(toOutputFormat('typescript')).toEqual(Format.TypeScript);
    expect(toOutputFormat('.ts')).toEqual(Format.TypeScript);
    expect(toOutputFormat('Ts')).toEqual(Format.TypeScript);
    expect(toOutputFormat('TS')).toEqual(Format.TypeScript);
    expect(toOutputFormat('TypeScript')).toEqual(Format.TypeScript);
    expect(toOutputFormat('TYPESCRIPT')).toEqual(Format.TypeScript);
  });

  it('correctly coverts a string to Format.WebAssembly', () => {
    expect(toOutputFormat('wasm')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('webassembly')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('.wasm')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('Wasm')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('WebAssembly')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('WASM')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('WEBASSEMBLY')).toEqual(Format.WebAssembly);
  });

  it('correctly coverts a string to Format.Wat', () => {
    expect(toOutputFormat('wat')).toEqual(Format.Wat);
    expect(toOutputFormat('.wat')).toEqual(Format.Wat);
    expect(toOutputFormat('Wat')).toEqual(Format.Wat);
    expect(toOutputFormat('WAT')).toEqual(Format.Wat);
  });

  it('defaults to returning the provided string', () => {
    expect(toOutputFormat('coffee')).toEqual('coffee');
  });
});
