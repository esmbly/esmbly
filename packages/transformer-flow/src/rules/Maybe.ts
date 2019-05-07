import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export function Maybe(): Visitor<Node> {
  return {
    NullableTypeAnnotation(path: NodePath<t.NullableTypeAnnotation>) {
      path.replaceWith(
        t.unionTypeAnnotation([
          path.node.typeAnnotation,
          t.nullLiteralTypeAnnotation(),
          t.genericTypeAnnotation(t.identifier('undefined')),
        ]),
      );
    },
  };
}
