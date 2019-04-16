import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import traverse from './traverse';

export interface FlowTransformerOptions {
  removeFlowFlags?: boolean;
}

export default ({
  removeFlowFlags = true,
}: FlowTransformerOptions): Transformer => {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): File[] {
      return ([] as File[]).concat(
        ...output.map((out: Output) => {
          if (!this.outputFormats.includes(out.format)) {
            return [];
          }
          return trees.map((tree: SyntaxTree) => tree.toFile(out));
        }),
      );
    },
    inputFormat: Format.Flow,
    outputFormats: [Format.TypeScript],
    parserPlugins: ['flow', 'flowComments'],
    transform(trees: SyntaxTree[]): void {
      trees.forEach((tree: SyntaxTree) => {
        traverse(tree);
        tree.setFormat(Format.TypeScript);
        if (removeFlowFlags) {
          // remove all @flow comments
        }
      });
    },
  };
};
