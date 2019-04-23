import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export default (): Visitor<Node> => ({
  TSNumberKeyword(path: NodePath<t.TSNumberKeyword>) {
    // @ts-ignore
    path.replaceWith(t.tsTypeReference(t.identifier('f64')));
  },
});
