import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import toTs from '../utils/toTs';
import hasBound from '../utils/hasBound';

export default (): Visitor<Node> => ({
  TypeParameterDeclaration(path: NodePath<t.TypeParameterDeclaration>) {
    if (path.node.params.every((param: t.TypeParameter) => !hasBound(param))) {
      return;
    }

    path.replaceWith(toTs(path.node));
  },
});
