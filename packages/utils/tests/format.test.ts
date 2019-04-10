import { Format } from '@esmbly/types';
import { outputFactory, toOutputFormat } from '../src';

describe('outputFactory', () => {
  it('returns an output object when called with a string', () => {
    expect(outputFactory('ts')).toEqual({
      format: Format.TypeScript,
    });
  });

  it('returns an output object when called with an output object', () => {
    const output = { dir: '/some/path', format: 'ts' };
    // @ts-ignore-line
    expect(outputFactory(output)).toEqual({
      dir: '/some/path',
      format: Format.TypeScript,
    });
  });

  it('throws an error when there is no matching output type', () => {
    expect(() => outputFactory('coffee')).toThrow(
      'Output format: coffee is not supported',
    );
  });
});

describe('toOutputFormat', () => {
  it('converts a string to OutputFormat.Asm', () => {
    expect(toOutputFormat('asm')).toEqual(Format.Asm);
    expect(toOutputFormat('asm.js')).toEqual(Format.Asm);
    expect(toOutputFormat('.asm')).toEqual(Format.Asm);
    expect(toOutputFormat('.asm.js')).toEqual(Format.Asm);
    expect(toOutputFormat('Asm')).toEqual(Format.Asm);
    expect(toOutputFormat('ASM')).toEqual(Format.Asm);
  });

  it('converts a string to OutputFormat.Flow', () => {
    expect(toOutputFormat('flow')).toEqual(Format.Flow);
    expect(toOutputFormat('.flow')).toEqual(Format.Flow);
    expect(toOutputFormat('Flow')).toEqual(Format.Flow);
    expect(toOutputFormat('FLOW')).toEqual(Format.Flow);
  });

  it('converts a string to OutputFormat.TypeScript', () => {
    expect(toOutputFormat('ts')).toEqual(Format.TypeScript);
    expect(toOutputFormat('typescript')).toEqual(Format.TypeScript);
    expect(toOutputFormat('.ts')).toEqual(Format.TypeScript);
    expect(toOutputFormat('Ts')).toEqual(Format.TypeScript);
    expect(toOutputFormat('TS')).toEqual(Format.TypeScript);
    expect(toOutputFormat('TypeScript')).toEqual(Format.TypeScript);
    expect(toOutputFormat('TYPESCRIPT')).toEqual(Format.TypeScript);
  });

  it('correctly coverts a string to OutputFormat.WebAssembly', () => {
    expect(toOutputFormat('wasm')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('webassembly')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('.wasm')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('Wasm')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('WebAssembly')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('WASM')).toEqual(Format.WebAssembly);
    expect(toOutputFormat('WEBASSEMBLY')).toEqual(Format.WebAssembly);
  });

  it('correctly coverts a string to OutputFormat.Wat', () => {
    expect(toOutputFormat('wat')).toEqual(Format.Wat);
    expect(toOutputFormat('.wat')).toEqual(Format.Wat);
    expect(toOutputFormat('Wat')).toEqual(Format.Wat);
    expect(toOutputFormat('WAT')).toEqual(Format.Wat);
  });

  it('throws an error when no matching output format is found', () => {
    expect(() => toOutputFormat('coffee')).toThrow(
      'Output format: coffee is not supported',
    );
  });
});
