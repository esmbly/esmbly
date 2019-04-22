import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export default (): Visitor<Node> => ({
  TypeofTypeAnnotation(path: NodePath<t.TypeofTypeAnnotation>) {
    path.replaceWith(path.node.argument);
  },
});
