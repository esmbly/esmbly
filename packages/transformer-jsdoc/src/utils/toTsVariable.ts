import * as t from '@babel/types';
import getTypes from '../utils/getTypes';
import toTypeAnnotation from '../utils/toTypeAnnotation';

export default (
  node: t.VariableDeclaration,
  leadingComments: t.Comment[],
): void => {
  const { variableType } = getTypes(leadingComments);

  // If there aren't any leading JSDoc comments
  if (leadingComments.length < 1) {
    return;
  }

  if (!variableType) {
    return;
  }

  node.declarations.forEach((declaration: t.VariableDeclarator) => {
    (declaration.id as t.Identifier).typeAnnotation = toTypeAnnotation(
      variableType,
    );
  });
};
