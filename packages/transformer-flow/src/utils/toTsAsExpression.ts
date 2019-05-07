import * as t from '@babel/types';
import { toTs } from './toTs';

export function toTsAsExpression(node: t.TypeCastExpression): t.TSAsExpression {
  return t.tsAsExpression(node.expression, toTs(
    node.typeAnnotation,
  ) as t.TSType);
}
