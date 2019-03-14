import traverse from '@babel/traverse';
import { SyntaxTree } from '@esmbly/types';
import * as rules from './rules';

export default function(ast: SyntaxTree): void {
  traverse(ast.tree, {
    FunctionDeclaration: rules.example,
  });
}
