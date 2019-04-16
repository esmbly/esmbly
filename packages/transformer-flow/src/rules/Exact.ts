import { ObjectTypeAnnotation } from '@babel/types';
import { NodePath } from '@babel/traverse';

export default function(path: NodePath<ObjectTypeAnnotation>): void {
  path.node.exact = false;
}
