import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export function Mixed(): Visitor<Node> {
  return {
    MixedTypeAnnotation(path: NodePath<t.MixedTypeAnnotation>) {
      path.replaceWith(t.genericTypeAnnotation(t.identifier('unknown')));
    },
  };
}
