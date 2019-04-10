import { SyntaxTree } from '@esmbly/types';
import {
  Expression,
  Identifier,
  VariableDeclarator,
  isArrowFunctionExpression,
  isExportDefaultDeclaration,
  isExportNamedDeclaration,
  isExpressionStatement,
  isFunctionDeclaration,
  isFunctionExpression,
  isVariableDeclaration,
} from '@babel/types';
import traverse from '@babel/traverse';
import { getLeadingComments, getTypes, toTypeAnnotation } from './utils';

export default function(ast: SyntaxTree): void {
  traverse(ast.tree, {
    enter({ node, parentPath }) {
      if (!node || !parentPath) {
        return;
      }
      if (
        isArrowFunctionExpression(node) ||
        isFunctionDeclaration(node) ||
        isFunctionExpression(node) ||
        isExportNamedDeclaration(node) ||
        isExportDefaultDeclaration(node) ||
        isExpressionStatement(node) ||
        isVariableDeclaration(node)
      ) {
        // @ts-ignore
        const base = node.declaration || node;
        const leadingComments = getLeadingComments(node, parentPath);
        const { returnType, paramTypes, variableType } = getTypes(
          leadingComments,
        );
        // If there aren't any leading JSDoc comments
        if (leadingComments.length < 1) {
          return;
        }

        // Variables
        if (variableType) {
          base.declarations.forEach((declaration: VariableDeclarator) => {
            (declaration.id as Identifier).typeAnnotation = toTypeAnnotation(
              variableType,
            );
          });
        }

        // Function declaration
        if (base.params) {
          base.params.forEach((param: Identifier, i: number) => {
            param.typeAnnotation = toTypeAnnotation(paramTypes[i]);
          });
          base.returnType = toTypeAnnotation(returnType);
          return;
        }

        // Function expression
        if (base.declarations) {
          base.declarations.forEach((declaration: VariableDeclarator) => {
            const fn: Expression | null = declaration.init;
            if (!fn) {
              return;
            }
            if ('params' in fn) {
              (fn.params as Identifier[]).forEach(
                (param: Identifier, i: number) => {
                  param.typeAnnotation = toTypeAnnotation(paramTypes[i]);
                },
              );
            }
            // @ts-ignore
            fn.returnType = toTypeAnnotation(returnType);
          });
        }
      }
    },
  });
}
