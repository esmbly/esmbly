import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import transform from './transform';
import createFiles from './createFiles';

export interface FlowTransformerOptions {
  removeFlowFlags?: boolean;
}

export default (options: FlowTransformerOptions): Transformer => {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): File[] {
      return createFiles(trees, output, this.format.files);
    },
    format: {
      files: [Format.TypeScript],
      input: Format.Flow,
      output: Format.TypeScript,
    },
    name: 'Flow',
    parserPlugins: ['classProperties', 'flow', 'objectRestSpread'],
    transform(trees: SyntaxTree[]): void {
      transform(trees, options);
    },
  };
};
