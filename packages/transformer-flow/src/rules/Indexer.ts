import { ObjectTypeIndexer, identifier, objectTypeIndexer } from '@babel/types';
import { NodePath } from '@babel/traverse';

export default function(path: NodePath<ObjectTypeIndexer>): void {
  if (path.node.id === null) {
    path.replaceWith(
      objectTypeIndexer(identifier('key'), path.node.key, path.node.value),
    );
  }
}
