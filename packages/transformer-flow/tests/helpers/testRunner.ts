import esmbly from '@esmbly/core';
import { File, FileType, Format } from '@esmbly/types';
import FlowTransformer, { FlowTransformerOptions } from '../../src';

export default (
  content: string,
  options: FlowTransformerOptions = {},
): Promise<File[]> => {
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
    transformers: [FlowTransformer(options)],
  });
};
