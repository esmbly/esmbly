import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export function Typeof(): Visitor<Node> {
  return {
    TypeofTypeAnnotation(path: NodePath<t.TypeofTypeAnnotation>) {
      path.replaceWith(path.node.argument);
    },
  };
}
