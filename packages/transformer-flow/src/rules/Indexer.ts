import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import generateFreeIdentifier from '../utils/generateId';

type IdentifiableType = t.FlowType & { id: t.Identifier };

export default (): Visitor<Node> => ({
  ObjectTypeIndexer(path: NodePath<t.ObjectTypeIndexer>) {
    if (path.node.id === null) {
      path.replaceWith(
        t.objectTypeIndexer(
          t.identifier(generateFreeIdentifier([])),
          path.node.key,
          path.node.value,
        ),
      );
      return;
    }

    if (
      !t.isStringTypeAnnotation(path.node.key) &&
      !t.isNumberTypeAnnotation(path.node.key)
    ) {
      const { key } = path.node;
      const binding = path.scope.getBinding((key as IdentifiableType).id.name);
      if (binding && t.isTypeAlias(binding.path.node)) {
        if (
          t.isStringTypeAnnotation(binding.path.node.right) ||
          t.isNumberTypeAnnotation(binding.path.node.right)
        ) {
          path.replaceWith(
            t.objectTypeIndexer(
              path.node.id,
              binding.path.node.right,
              path.node.value,
            ),
          );
        }
      }
    }
  },
});
