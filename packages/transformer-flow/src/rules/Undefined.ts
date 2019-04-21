import t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export default (): Visitor<Node> => ({
  VoidTypeAnnotation(path: NodePath<t.VoidTypeAnnotation>) {
    path.replaceWith(t.genericTypeAnnotation(t.identifier('undefined')));
  },
});

// export default function(path: NodePath<TypeofTypeAnnotation>): void {
//   path.replaceWith(path.node.argument);
// }
