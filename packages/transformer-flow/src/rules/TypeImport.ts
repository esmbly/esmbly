import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export function TypeImport(): Visitor<Node> {
  return {
    ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
      if (path.node.importKind === 'type') {
        path.replaceWith(
          t.importDeclaration(path.node.specifiers, path.node.source),
        );
      }
    },
  };
}
