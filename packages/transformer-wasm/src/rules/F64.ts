import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export default (): Visitor<Node> => ({
  NumberTypeAnnotation(path: NodePath<t.NumberTypeAnnotation>) {
    // @ts-ignore
    // TODO: Investigate why this is happening. Make sure to transform this to TS before?
    path.replaceWith(t.genericTypeAnnotation(t.identifier('f64')));
  },
  TSNumberKeyword(path: NodePath<t.TSNumberKeyword>) {
    // @ts-ignore
    path.replaceWith(t.tsTypeReference(t.identifier('f64')));
  },
});
