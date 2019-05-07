import * as esmbly from '@esmbly/core';
import { File, FileType, Format } from '@esmbly/types';
import * as JSDocTransformer from '../../src';

export async function testRunner(
  content: string,
  options: JSDocTransformer.JSDocTransformerOptions = {},
): Promise<File[]> {
  return esmbly.run({
    input: [
      {
        content,
        dir: '/',
        name: 'testfile',
        type: FileType.JavaScript,
      },
    ],
    output: [{ format: Format.TypeScript }],
    transformers: [JSDocTransformer.createTransformer(options)],
  });
}
