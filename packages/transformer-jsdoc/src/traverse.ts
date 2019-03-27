import { SyntaxTree } from '@esmbly/types';
import { FunctionDeclaration } from '@babel/types';
import traverse, { NodePath } from '@babel/traverse';
import * as rules from './rules';

export default function(ast: SyntaxTree, stripComments: boolean): void {
  traverse(ast.tree, {
    FunctionDeclaration: (path: NodePath<FunctionDeclaration>) => {
      rules.functionDeclaration(path.node, stripComments);
    },
  });
}
