import esmbly from '@esmbly/core';
import { File, FileType, Format, Output } from '@esmbly/types';
import WasmTransformer from '../../src';
import { WasmTransformerOptions } from '../../src/types';

export default async (
  content: string,
  output: Output[] = [{ format: Format.WebAssembly }],
  options: WasmTransformerOptions = {},
): Promise<File[]> => {
  return esmbly.run({
    input: [
      {
        content,
        dir: '/',
        name: 'testfile',
        type: FileType.TypeScript,
      },
    ],
    output,
    transformers: [WasmTransformer(options)],
  });
};
