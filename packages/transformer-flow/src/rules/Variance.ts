import {
  ObjectTypeProperty,
  tsPropertySignature,
  tsTypeAnnotation,
} from '@babel/types';
import { NodePath } from '@babel/traverse';
import { toTs } from '../utils/convert';

export default function(path: NodePath<ObjectTypeProperty>): void {
  const type = toTs(path.node.value);
  if (!type) {
    return;
  }
  const property = tsPropertySignature(path.node.key, tsTypeAnnotation(type));
  property.optional = path.node.optional;
  property.readonly = path.node.variance && path.node.variance.kind === 'plus';
  path.replaceWith(property);
}
