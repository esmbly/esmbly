import * as t from '@babel/types';

type StatementWithComments = t.Statement & { comments: t.Comment[] };

function notFlowAnnotation(comment: t.Comment): boolean {
  const value = comment.value.trim();
  return value !== '@flow' && value !== '@flow strict';
}

export default (ast: t.File): void => {
  const body = ast.program.body[0] as StatementWithComments;

  if (body.leadingComments) {
    body.leadingComments = body.leadingComments.filter(notFlowAnnotation);
  }

  if (body.comments) {
    body.comments = body.comments.filter(notFlowAnnotation);
  }
};
