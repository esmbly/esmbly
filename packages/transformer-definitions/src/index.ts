import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import { createFiles } from './createFiles';

export function createTransformer(): Transformer {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): File[] {
      return createFiles(trees, output);
    },
    format: {
      files: [Format.Any],
      input: Format.TypeScript,
      output: Format.TypeScript,
    },
    name: 'Definitions',
    parserPlugins: ['typescript'],
  };
}
