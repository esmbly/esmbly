import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export function Undefined(): Visitor<Node> {
  return {
    VoidTypeAnnotation(path: NodePath<t.VoidTypeAnnotation>) {
      path.replaceWith(t.genericTypeAnnotation(t.identifier('undefined')));
    },
  };
}
