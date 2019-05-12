import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import { getLeadingComments } from './getLeadingComments';
import { parseComments } from './parseComments';
import { toTypeAnnotation } from './toTypeAnnotation';

export function toTsFunction(
  node:
    | t.FunctionDeclaration
    | t.FunctionExpression
    | t.ArrowFunctionExpression,
  parentPath: NodePath<t.Node>,
): void {
  const leadingComments = getLeadingComments(node, parentPath);
  const { declare, returnType, paramTypes } = parseComments(leadingComments);

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

  if (declare && !t.isArrowFunctionExpression(node)) {
    const declaration = t.tsDeclareFunction(
      node.id,
      node.typeParameters as t.TSTypeParameterDeclaration,
      node.params,
      node.returnType as t.TSTypeAnnotation,
    );
    declaration.declare = true;
    parentPath.replaceWith(declaration);
  }
}
