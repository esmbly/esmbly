import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { parseComments } from '../utils/parseComments';
import { getLeadingComments } from '../utils/getLeadingComments';

export function CallExpression(): Visitor<Node> {
  return {
    CallExpression(path: NodePath<t.CallExpression>) {
      const parent = path.getStatementParent();
      const leadingComments = getLeadingComments(parent.node, parent);

      if (!leadingComments) {
        return;
      }

      const { typeArgument } = parseComments(leadingComments);

      if (!typeArgument) {
        return;
      }

      if (!typeArgument.description) {
        return;
      }

      // Parse the provided type, ex: {number}
      // @ts-ignore
      const type = typeArgument.description
        .match(/{(.*)}/)
        .pop()
        .trim();

      if (!type || type === '') {
        return;
      }

      // TODO: Try adding the type parameter to path.node.typeParameter instead?
      // @ts-ignore
      path.node.callee.name = `${path.node.callee.name}<${type}>`;
    },
  };
}
