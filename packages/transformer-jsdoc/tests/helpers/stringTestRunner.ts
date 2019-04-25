import esmbly from '@esmbly/core';
import { File, FileType, Format } from '@esmbly/types';
import JSDocTransformer, { JSDocTransformerOptions } from '../../src';

export default async function run(
  content: string,
  options: JSDocTransformerOptions = {},
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
    transformers: [JSDocTransformer(options)],
  });
}
