import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { Warning } from '@esmbly/types';

const info = 'AssemblyScript does not support the delete operator';

const issueUrl =
  'https://github.com/AssemblyScript/assemblyscript/wiki/Limitations';

export default (warnings: Warning[]): Visitor<Node> => ({
  // @ts-ignore
  UnaryExpression(path: NodePath<t.UnaryExpression>) {
    if (path.node.operator === 'delete') {
      warnings.push({
        info,
        issueUrl,
        loc: path.node.loc,
      });
    }
  },
});
