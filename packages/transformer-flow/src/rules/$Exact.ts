import t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { Warning } from '../types';

export default (warnings: Warning[]): Visitor<Node> => ({
  GenericTypeAnnotation(path: NodePath<t.GenericTypeAnnotation>) {
    if (!t.isIdentifier(path.node.id)) {
      return;
    }
    if (path.node.id.name !== '$Exact') {
      return;
    }
    if (!path.node.typeParameters) {
      return;
    }

    warnings.push({
      info: `$Exact types can't be expressed in TypeScript`,
      issueUrl: 'https://github.com/Microsoft/TypeScript/issues/12936',
      node: path.node,
    });

    path.replaceWith(path.node.typeParameters.params[0]);
  },
});
