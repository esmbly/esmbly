import * as t from '@babel/types';
import parseComments from './parseComments';
import toTypeAnnotation from '../utils/toTypeAnnotation';

export default (
  node: t.VariableDeclaration,
  leadingComments: t.Comment[],
): void => {
  const { isExternal, isConstant, variableType } = parseComments(
    leadingComments,
  );

  // If there aren't any leading JSDoc comments
  if (leadingComments.length < 1) {
    return;
  }

  if (!variableType) {
    return;
  }

  if (isExternal) {
    node.declare = true;
  }

  if (isConstant) {
    node.kind = 'const';
  }

  node.declarations.forEach((declaration: t.VariableDeclarator) => {
    (declaration.id as t.Identifier).typeAnnotation = toTypeAnnotation(
      variableType,
    );
  });
};
