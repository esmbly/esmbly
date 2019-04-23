import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export default (): Visitor<Node> => ({
  MixedTypeAnnotation(path: NodePath<t.MixedTypeAnnotation>) {
    path.replaceWith(t.genericTypeAnnotation(t.identifier('unknown')));
  },
});
