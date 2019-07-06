import { NodePath } from '@babel/traverse';

export function hasTypeDefComments(path: NodePath): boolean {
  return (path.node.leadingComments || []).some(
    block => block.type === 'CommentBlock' && block.value.includes('@typedef'),
  );
}
