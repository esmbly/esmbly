import * as esmbly from '@esmbly/core';
import { File, FileType, Format, Output } from '@esmbly/types';
import * as WasmTransformer from '../../src';

export async function testRunner(
  content: string,
  output: Output[] = [{ format: Format.WebAssembly }],
  options: WasmTransformer.WasmTransformerOptions = {},
): Promise<File[]> {
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
    transformers: [WasmTransformer.createTransformer(options)],
  });
}
