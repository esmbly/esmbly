import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';

export default (): Visitor<Node> => ({
  ImportDeclaration(path: NodePath<t.ImportDeclaration>) {
    if (path.node.importKind === 'type') {
      path.replaceWith(
        t.importDeclaration(path.node.specifiers, path.node.source),
      );
    }
  },
});
