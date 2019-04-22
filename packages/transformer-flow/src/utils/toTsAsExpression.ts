import * as t from '@babel/types';
import toTs from './toTs';

export default function toTsAsExpression(
  node: t.TypeCastExpression,
): t.TSAsExpression {
  console.log(node.typeAnnotation);
  return t.tsAsExpression(node.expression, toTs(node.typeAnnotation));
}
