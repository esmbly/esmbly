import { Tag } from 'doctrine';
import { Block, Comment, Node } from '@babel/types';
import { NodePath } from '@babel/traverse';

function countBlankLines(
  commentEnd: number,
  bodyStart: number,
  parent?: NodePath<Node>,
): number {
  let blankLines = 0;

  if (!parent) {
    return blankLines;
  }

  const { block } = parent.scope.getProgramParent();

  if (!block) {
    return blankLines;
  }

  // TODO: Investigate why this type does not seem to exist in @babel/types or @babel/traverse
  // @ts-ignore
  const { lines } = block.loc;

  for (let i = commentEnd; i < bodyStart; i += 1) {
    const { line } = lines.infos[i];

    if (line.trim() === '') {
      blankLines += 1;
    }
  }

  return blankLines;
}

export function isLeadingComment(
  node: Node,
  comment: Comment,
  parent?: NodePath<Node>,
): boolean {
  if ('body' in node) {
    const body = node.body as Block;

    if (!body.loc) {
      return false;
    }

    const commentEnd = comment.loc.end.line;
    const bodyStart = body.loc.start.line;
    const blankLines = countBlankLines(commentEnd, bodyStart, parent);
    return commentEnd === bodyStart - blankLines - 1;
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

export function isExternal(tag: Tag): boolean {
  return tag.title === 'external';
}

export function isConstant(tag: Tag): boolean {
  return tag.title === 'const' || tag.title === 'constant';
}

export function isTypeArgument(tag: Tag): boolean {
  return tag.title === 'typeArgument';
}
