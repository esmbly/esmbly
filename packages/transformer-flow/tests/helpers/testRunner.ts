import * as esmbly from '@esmbly/core';
import { File, FileType, Format } from '@esmbly/types';
import * as FlowTransformer from '../../src';

export function testRunner(
  content: string,
  options: FlowTransformer.FlowTransformerOptions = {},
): Promise<File[]> {
  return esmbly.run({
    input: [
      {
        content,
        dir: '',
        name: 'input',
        type: FileType.JavaScript,
      },
    ],
    output: [{ format: Format.TypeScript }],
    transformers: [FlowTransformer.createTransformer(options)],
  });
}
