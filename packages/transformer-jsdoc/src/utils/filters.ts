import { Tag } from 'doctrine';
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

export function isVariable(tag: Tag): boolean {
  return tag.title === 'type';
}

export function isReturn(tag: Tag): boolean {
  return tag.title === 'returns' || tag.title === 'return';
}

export function isParam(tag: Tag): boolean {
  return (
    tag.title === 'param' || tag.title === 'arg' || tag.title === 'argument'
  );
}
