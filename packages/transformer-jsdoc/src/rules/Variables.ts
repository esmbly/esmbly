import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { getLeadingComments } from '../utils/getLeadingComments';
import { toTsVariable } from '../utils/toTsVariable';

export function Variables(): Visitor<Node> {
  return {
    ExportNamedDeclaration(path: NodePath<t.ExportNamedDeclaration>) {
      if (t.isVariableDeclaration(path.node.declaration)) {
        const leadingComments = getLeadingComments(path.node, path);
        toTsVariable(path.node.declaration, leadingComments);
      }
    },
    VariableDeclaration(path: NodePath<t.VariableDeclaration>) {
      const leadingComments = getLeadingComments(path.node, path);
      toTsVariable(path.node, leadingComments);
    },
  };
}
