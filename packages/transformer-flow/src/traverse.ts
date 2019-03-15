import * as rules from './rules';
import { SyntaxTree } from '@esmbly/types';
import traverse from '@babel/traverse';

export default function(ast: SyntaxTree): void {
  traverse(ast.tree, {
    FunctionDeclaration: rules.example,
  });
}
