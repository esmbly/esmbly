import { outputFactory, toOutputFormat } from '../src';
import { OutputFormat } from '@esmbly/types';

describe('outputFactory', () => {
  it('returns an output object when called with a string', () => {
    expect(outputFactory('ts')).toEqual({
      format: OutputFormat.TypeScript,
    });
  });

  it('returns an output object when called with an output object', () => {
    const output = { dir: '/some/path', format: 'ts' };
    // @ts-ignore-line
    expect(outputFactory(output)).toEqual({
      dir: '/some/path',
      format: OutputFormat.TypeScript,
    });
  });

  it('throws an error when there is no matching output type', () => {
    expect(() => outputFactory('coffee')).toThrowError(
      'Output format: coffee is not supported',
    );
  });
});

describe('toOutputFormat', () => {
  it('converts a string to OutputFormat.Asm', () => {
    expect(toOutputFormat('asm')).toEqual(OutputFormat.Asm);
    expect(toOutputFormat('asm.js')).toEqual(OutputFormat.Asm);
    expect(toOutputFormat('.asm')).toEqual(OutputFormat.Asm);
    expect(toOutputFormat('.asm.js')).toEqual(OutputFormat.Asm);
    expect(toOutputFormat('Asm')).toEqual(OutputFormat.Asm);
    expect(toOutputFormat('ASM')).toEqual(OutputFormat.Asm);
  });

  it('converts a string to OutputFormat.Flow', () => {
    expect(toOutputFormat('flow')).toEqual(OutputFormat.Flow);
    expect(toOutputFormat('.flow')).toEqual(OutputFormat.Flow);
    expect(toOutputFormat('Flow')).toEqual(OutputFormat.Flow);
    expect(toOutputFormat('FLOW')).toEqual(OutputFormat.Flow);
  });

  it('converts a string to OutputFormat.TypeScript', () => {
    expect(toOutputFormat('ts')).toEqual(OutputFormat.TypeScript);
    expect(toOutputFormat('typescript')).toEqual(OutputFormat.TypeScript);
    expect(toOutputFormat('.ts')).toEqual(OutputFormat.TypeScript);
    expect(toOutputFormat('Ts')).toEqual(OutputFormat.TypeScript);
    expect(toOutputFormat('TS')).toEqual(OutputFormat.TypeScript);
    expect(toOutputFormat('TypeScript')).toEqual(OutputFormat.TypeScript);
    expect(toOutputFormat('TYPESCRIPT')).toEqual(OutputFormat.TypeScript);
  });

  it('correctly coverts a string to OutputFormat.WebAssembly', () => {
    expect(toOutputFormat('wasm')).toEqual(OutputFormat.WebAssembly);
    expect(toOutputFormat('webassembly')).toEqual(OutputFormat.WebAssembly);
    expect(toOutputFormat('.wasm')).toEqual(OutputFormat.WebAssembly);
    expect(toOutputFormat('Wasm')).toEqual(OutputFormat.WebAssembly);
    expect(toOutputFormat('WebAssembly')).toEqual(OutputFormat.WebAssembly);
    expect(toOutputFormat('WASM')).toEqual(OutputFormat.WebAssembly);
    expect(toOutputFormat('WEBASSEMBLY')).toEqual(OutputFormat.WebAssembly);
  });

  it('correctly coverts a string to OutputFormat.Wat', () => {
    expect(toOutputFormat('wat')).toEqual(OutputFormat.Wat);
    expect(toOutputFormat('.wat')).toEqual(OutputFormat.Wat);
    expect(toOutputFormat('Wat')).toEqual(OutputFormat.Wat);
    expect(toOutputFormat('WAT')).toEqual(OutputFormat.Wat);
  });

  it('throws an error when no matching output format is found', () => {
    expect(() => toOutputFormat('coffee')).toThrowError(
      'Output format: coffee is not supported',
    );
  });
});
