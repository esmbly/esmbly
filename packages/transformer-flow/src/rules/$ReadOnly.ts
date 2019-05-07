import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export function $ReadOnly(): Visitor<Node> {
  return {
    GenericTypeAnnotation(path: NodePath<t.GenericTypeAnnotation>) {
      if (!t.isIdentifier(path.node.id)) {
        return;
      }

      if (path.node.id.name !== '$ReadOnly') {
        return;
      }

      path.replaceWith(
        t.genericTypeAnnotation(
          t.identifier('Readonly'),
          path.node.typeParameters,
        ),
      );
    },
  };
}
