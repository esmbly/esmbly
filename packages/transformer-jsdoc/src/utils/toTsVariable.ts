import * as t from '@babel/types';
import { parseComments } from './parseComments';
import { toTypeAnnotation } from '../utils/toTypeAnnotation';

export function toTsVariable(
  node: t.VariableDeclaration,
  leadingComments: t.Comment[],
): void {
  const { declare, constantType, variableType } = parseComments(
    leadingComments,
  );

  // If there aren't any leading JSDoc comments
  if (leadingComments.length < 1) {
    return;
  }

  if (!variableType && !constantType) {
    return;
  }

  if (declare) {
    node.declare = true;
  }

  if (constantType) {
    node.kind = 'const';
  }

  node.declarations.forEach((declaration: t.VariableDeclarator) => {
    (declaration.id as t.Identifier).typeAnnotation = toTypeAnnotation(
      variableType || constantType,
    );
  });
}
