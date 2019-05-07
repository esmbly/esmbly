import { SyntaxTree } from '@esmbly/types';
import { Comment } from '@babel/types';
import traverse from '@babel/traverse';
import { isLeadingComment } from './filters';

export function stripAllComments(ast: SyntaxTree): void {
  traverse(ast.tree, {
    enter({ node }) {
      if ('comments' in node) {
        node.comments = node.comments.filter((comment: Comment) => {
          if (comment.type === 'CommentLine') {
            return true;
          }

          return !isLeadingComment(node, comment);
        });
      }
    },
  });
}
