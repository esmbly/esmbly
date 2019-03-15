import { OutputFormat, SyntaxTree } from '@esmbly/types';
import traverse, { NodePath } from '@babel/traverse'; // eslint-disable-line
import { FunctionDeclaration } from '@babel/types'; // eslint-disable-line
import { Transformer } from '../../src';

class FooTransformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.Flow];

  public transform(trees: SyntaxTree[]): void {
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
  }
}

export default FooTransformer;
