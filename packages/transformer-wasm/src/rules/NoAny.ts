import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { Warning } from '@esmbly/types';

const info = 'AssemblyScript does not support using any';

export default (warnings: Warning[]): Visitor<Node> => ({
  TSAnyKeyword(path: NodePath<t.TSAnyKeyword>) {
    warnings.push({
      info,
      issueUrl:
        'https://github.com/AssemblyScript/assemblyscript/wiki/Limitations',
      loc: path.node.loc,
    });
  },
});
