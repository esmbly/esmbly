import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import traverse, { NodePath } from '@babel/traverse'; // eslint-disable-line
import { FunctionDeclaration } from '@babel/types'; // eslint-disable-line

export default (): Transformer => {
  return {
    after: () => {},
    before: () => {},
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
    inputFormat: Format.Any,
    outputFormats: [Format.Flow],
    transform(trees: SyntaxTree[]): void {
      trees.forEach((tree: SyntaxTree) => {
        traverse(tree.tree, {
          FunctionDeclaration: ({
            node,
          }: NodePath<FunctionDeclaration>): void => {
            if (!node.id) {
              return;
            }
            if (node.id.name === 'foo') {
              node.id.name = 'bar';
            }
          },
        });
      });
    },
  };
};
