import { NodePath } from '@babel/traverse';
import { Comment, Node } from '@babel/types';
import { isLeadingComment } from './filters';

export function getLeadingComments(
  node: Node,
  parentPath: NodePath,
): Comment[] {
  // If the node itself has leading comments
  if (node.leadingComments) {
    return [...node.leadingComments];
  }

  // If the parent node has leading comments
  if (parentPath.node && parentPath.node.leadingComments) {
    return parentPath.node.leadingComments.filter((comment: Comment) =>
      isLeadingComment(node, comment, parentPath),
    );
  }

  // Recursively check all parent nodes for leading comments
  if (parentPath.parentPath) {
    return getLeadingComments(node, parentPath.parentPath);
  }

  return [];
}
