import t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import toTs from '../utils/toTs';

export default (): Visitor<Node> => ({
  TypeCastExpression(path: NodePath<t.TypeCastExpression>) {
    path.replaceWith(toTs(path.node));
  },
});
