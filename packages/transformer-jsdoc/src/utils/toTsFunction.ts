import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import getLeadingComments from './getLeadingComments';
import getTypes from './getTypes';
import toTypeAnnotation from './toTypeAnnotation';

export default (
  node:
    | t.FunctionDeclaration
    | t.FunctionExpression
    | t.ArrowFunctionExpression,
  parentPath: NodePath<t.Node>,
): void => {
  const leadingComments = getLeadingComments(node, parentPath);
  const { returnType, paramTypes } = getTypes(leadingComments);

  // If there aren't any leading JSDoc comments
  if (leadingComments.length < 1) {
    return;
  }

  if (returnType) {
    node.returnType = toTypeAnnotation(returnType);
  }

  if (paramTypes) {
    (node.params as t.Identifier[]).forEach(
      (param: t.Identifier, i: number) => {
        param.typeAnnotation = toTypeAnnotation(paramTypes[i]);
      },
    );
  }
};
