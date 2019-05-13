import * as esmbly from '@esmbly/core';
import { File, FileType, Format } from '@esmbly/types';
import * as DefinitionsTransformer from '../../src';

export async function testRunner(content: string): Promise<File[]> {
  return esmbly.run({
    input: [
      {
        content,
        dir: '/',
        name: 'testfile',
        type: FileType.TypeScript,
      },
    ],
    output: [{ format: Format.TSDefinition }],
    transformers: [DefinitionsTransformer.createTransformer()],
  });
}
