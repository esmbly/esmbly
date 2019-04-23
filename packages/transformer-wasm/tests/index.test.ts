import { Format } from '@esmbly/types';
import WasmTransformerFactory from '../src';

describe('transformer-wasm', () => {
  it('specifies the correct name', async () => {
    const transformer = WasmTransformerFactory({});
    expect(transformer.name).toEqual('WebAssembly');
  });

  it('specifies the correct input format', () => {
    const transformer = WasmTransformerFactory({});
    expect(transformer.inputFormat).toEqual(Format.TypeScript);
  });

  it('specifies the correct output format', () => {
    const transformer = WasmTransformerFactory({});
    expect(transformer.outputFormats).toEqual([
      Format.WebAssembly,
      Format.Wat,
      Format.Asm,
      Format.AssemblyScript,
    ]);
  });

  it('specifies the correct parser plugins', () => {
    const transformer = WasmTransformerFactory({});
    expect(transformer.parserPlugins).toEqual(['typescript']);
  });
});
