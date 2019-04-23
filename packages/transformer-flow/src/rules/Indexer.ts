import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import generateFreeIdentifier from '../utils/generateId';

export default (): Visitor<Node> => ({
  ObjectTypeIndexer(path: NodePath<t.ObjectTypeIndexer>) {
    if (path.node.id !== null) {
      return;
    }

    path.replaceWith(
      t.objectTypeIndexer(
        t.identifier(generateFreeIdentifier([])),
        path.node.key,
        path.node.value,
      ),
    );
  },
});
