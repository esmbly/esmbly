import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { toTsFunction } from '../utils/toTsFunction';

export function Functions(): Visitor<Node> {
  return {
    ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
      toTsFunction(path.node, path);
    },
    ExportDefaultDeclaration(path: NodePath<t.ExportDefaultDeclaration>) {
      if (
        t.isFunctionDeclaration(path.node.declaration) ||
        t.isArrowFunctionExpression(path.node.declaration) ||
        t.isFunctionExpression(path.node.declaration)
      ) {
        toTsFunction(path.node.declaration, path);
      }
    },
    ExportNamedDeclaration(path: NodePath<t.ExportNamedDeclaration>) {
      if (
        t.isFunctionDeclaration(path.node.declaration) ||
        t.isArrowFunctionExpression(path.node.declaration) ||
        t.isFunctionExpression(path.node.declaration)
      ) {
        toTsFunction(path.node.declaration, path);
      }
    },
    FunctionDeclaration(path: NodePath<t.FunctionDeclaration>) {
      toTsFunction(path.node, path);
    },
    FunctionExpression(path: NodePath<t.FunctionExpression>) {
      toTsFunction(path.node, path);
    },
  };
}
