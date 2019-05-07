import { Format } from '@esmbly/types';
import { createTransformer } from '../../src';

describe('unit: transformer-wasm', () => {
  it('specifies the correct name', async () => {
    const transformer = createTransformer({});
    expect(transformer.name).toEqual('WebAssembly');
  });

  it('specifies the correct input format', () => {
    const transformer = createTransformer({});
    expect(transformer.format.input).toEqual(Format.TypeScript);
  });

  it('specifies the correct output format', () => {
    const transformer = createTransformer({});
    expect(transformer.format.output).toEqual(Format.AssemblyScript);
  });

  it('specifies the correct file formats', () => {
    const transformer = createTransformer({});
    expect(transformer.format.files).toEqual([
      Format.WebAssembly,
      Format.Wat,
      Format.Asm,
      Format.AssemblyScript,
    ]);
  });

  it('specifies the correct parser plugins', () => {
    const transformer = createTransformer({});
    expect(transformer.parserPlugins).toEqual(['typescript']);
  });
});
