import { Format, SyntaxTree, Transformer } from '@esmbly/types';
import traverse, { NodePath } from '@babel/traverse'; // eslint-disable-line
import { FunctionDeclaration } from '@babel/types'; // eslint-disable-line

export default (): Transformer => {
  return {
    inputFormat: Format.Any,
    outputFormats: [Format.Flow],
    transform(trees: SyntaxTree[]): void {
      trees.forEach((tree: SyntaxTree) => {
        traverse(tree.tree, {
          FunctionDeclaration: (path: NodePath<FunctionDeclaration>): void => {
            if (!path.node.id) {
              return;
            }
            if (path.node.id.name === 'foo') {
              path.node.id.name = 'bar';
            }
          },
        });
      });
    },
  };
};
