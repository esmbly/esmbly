import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export function $ReadOnlyArray(): Visitor<Node> {
  return {
    GenericTypeAnnotation(path: NodePath<t.GenericTypeAnnotation>) {
      if (!t.isIdentifier(path.node.id)) {
        return;
      }

      if (path.node.id.name !== '$ReadOnlyArray') {
        return;
      }

      path.replaceWith(
        t.genericTypeAnnotation(
          t.identifier('ReadonlyArray'),
          path.node.typeParameters,
        ),
      );
    },
  };
}
