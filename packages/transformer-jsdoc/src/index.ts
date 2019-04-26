import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import createFiles from './createFiles';
import transform from './transform';

export interface JSDocTransformerOptions {
  stripComments?: boolean;
}

export default (options: JSDocTransformerOptions = {}): Transformer => {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): File[] {
      return createFiles(trees, output, this.format.files);
    },
    format: {
      files: [Format.TypeScript],
      input: Format.JSDoc,
      output: Format.TypeScript,
    },
    name: 'JSDoc',
    transform(trees: SyntaxTree[]): void {
      return transform(trees, options);
    },
  };
};
