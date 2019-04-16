import { TypeCastExpression, tsAsExpression } from '@babel/types';
import { NodePath } from '@babel/traverse';
import { toTs } from '../utils/convert';

export default function(path: NodePath<TypeCastExpression>): void {
  const type = toTs(path.node.typeAnnotation.typeAnnotation);
  if (!type) {
    return;
  }
  path.replaceWith(tsAsExpression(path.node.expression, type));
}
