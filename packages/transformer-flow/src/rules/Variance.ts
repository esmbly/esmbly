import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { Warning } from '@esmbly/types';
import toTs from '../utils/toTs';

export default (warnings: Warning[]): Visitor<Node> => ({
  ObjectTypeProperty(path: NodePath<t.ObjectTypeProperty>) {
    if (path.node.variance && path.node.variance.kind === 'minus') {
      warnings.push({
        info: `Contravariance can't be expressed in TypeScript`,
        issueUrl: 'https://github.com/Microsoft/TypeScript/issues/1394',
        node: path.node,
      });
    }
    path.replaceWith(toTs(path.node));
  },
});
