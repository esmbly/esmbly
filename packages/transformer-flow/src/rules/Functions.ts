import t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import toTs from '../utils/toTs';

export default (): Visitor<Node> => ({
  FunctionTypeAnnotation(path: NodePath<t.FunctionTypeAnnotation>) {
    path.replaceWith(toTs(path.node));
  },
});
