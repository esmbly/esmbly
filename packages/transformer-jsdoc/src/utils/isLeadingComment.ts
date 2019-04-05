import { Block, Comment, Node } from '@babel/types';

export function isLeadingComment(node: Node, comment: Comment): boolean {
  if ('body' in node) {
    const body = node.body as Block;
    if (!body.loc) {
      return false;
    }
    const commentEnd = comment.loc.end.line;
    const bodyStart = body.loc.start.line;
    return commentEnd === bodyStart - 1;
  }
  return false;
}
