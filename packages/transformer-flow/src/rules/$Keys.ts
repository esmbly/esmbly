import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export function $Keys(): Visitor<Node> {
  return {
    GenericTypeAnnotation(path: NodePath<t.GenericTypeAnnotation>) {
      if (!t.isIdentifier(path.node.id)) {
        return;
      }

      if (path.node.id.name !== '$Keys') {
        return;
      }

      if (!path.node.typeParameters) {
        return;
      }

      const [param] = path.node.typeParameters.params;

      if (!t.isGenericTypeAnnotation(param)) {
        return;
      }

      if (!t.isIdentifier(param.id)) {
        return;
      }

      const replacement = t.tsTypeOperator(t.tsTypeReference(param.id));
      replacement.operator = 'keyof';
      path.replaceWith(replacement);
    },
  };
}
