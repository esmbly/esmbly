import { SyntaxTree } from '@esmbly/types';
import traverse from '@babel/traverse';
import * as rules from './rules';

export default function(ast: SyntaxTree): void {
  traverse(ast.tree, {
    FunctionDeclaration: rules.example,
  });
}
