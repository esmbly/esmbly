import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { Warning } from '@esmbly/types';

const info = 'AssemblyScript does not support using undefined';

const issueUrl =
  'https://github.com/AssemblyScript/assemblyscript/wiki/Limitations';

export function NoUndefined(warnings: Warning[]): Visitor<Node> {
  return {
    TSUndefinedKeyword(path: NodePath<t.TSUndefinedKeyword>) {
      warnings.push({
        info,
        issueUrl,
        loc: path.node.loc,
      });
    },
  };
}
