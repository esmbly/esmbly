import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { toTs } from '../utils/toTs';

export function Casting(): Visitor<Node> {
  return {
    TypeCastExpression(path: NodePath<t.TypeCastExpression>) {
      path.replaceWith(toTs(path.node));
    },
  };
}
