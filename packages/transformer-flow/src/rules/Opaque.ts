import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { Warning } from '@esmbly/types';

export function Opaque(warnings: Warning[]): Visitor<Node> {
  return {
    OpaqueType(path: NodePath<t.OpaqueType>) {
      warnings.push({
        info: `Opaque types can't be expressed in TypeScript.`,
        issueUrl: 'https://github.com/Microsoft/TypeScript/issues/202',
        loc: path.node.loc,
      });

      path.replaceWith(
        t.typeAlias(path.node.id, path.node.typeParameters, path.node.impltype),
      );
    },
  };
}
