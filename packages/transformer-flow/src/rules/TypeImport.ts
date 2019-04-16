import { ImportDeclaration } from '@babel/types';
import { NodePath } from '@babel/traverse';

export default function(path: NodePath<ImportDeclaration>): void {
  path.node.importKind = null;
}
