import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import traverse, { NodePath } from '@babel/traverse'; // eslint-disable-line
import { FunctionDeclaration } from '@babel/types'; // eslint-disable-line

export function createTransformer(): Transformer {
  return {
    after: () => {},
    before: () => {},
    createFiles(trees: SyntaxTree[], output: Output[]): File[] {
      return ([] as File[]).concat(
        ...output.map((out: Output) => {
          if (!this.format.files.includes(out.format)) {
            return [];
          }
          return trees.map((tree: SyntaxTree) => tree.toFile(out));
        }),
      );
    },
    format: {
      files: [Format.Flow],
      input: Format.Any,
      output: Format.Flow,
    },
    parserPlugins: ['flow', 'flowComments'],
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
}
