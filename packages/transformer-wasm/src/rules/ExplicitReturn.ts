import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { Warning } from '@esmbly/types';

const info =
  'AssemblyScript require functions to have a return type annotation.';

const issueUrl =
  'https://github.com/AssemblyScript/assemblyscript/wiki/Limitations';

export function ExplicitReturn(warnings: Warning[]): Visitor<Node> {
  return {
    // @ts-ignore
    ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
      if (!path.node.returnType) {
        warnings.push({
          info,
          issueUrl,
          loc: path.node.loc,
        });
      }
    },
    // @ts-ignore
    ClassMethod(path: NodePath<t.ClassMethod>) {
      if (!path.node.returnType) {
        warnings.push({
          info,
          issueUrl,
          loc: path.node.loc,
        });
      }
    },
    // @ts-ignore
    FunctionDeclaration(path: NodePath<t.FunctionDeclaration>) {
      if (!path.node.returnType) {
        warnings.push({
          info,
          issueUrl,
          loc: path.node.loc,
        });
      }
    },
    // @ts-ignore
    FunctionExpression(path: NodePath<t.FunctionExpression>) {
      if (!path.node.returnType) {
        warnings.push({
          info,
          issueUrl,
          loc: path.node.loc,
        });
      }
    },
    // @ts-ignore
    ObjectMethod(path: NodePath<t.ObjectMethod>) {
      if (!path.node.returnType) {
        warnings.push({
          info,
          issueUrl,
          loc: path.node.loc,
        });
      }
    },
    // @ts-ignore
    TSDeclareFunction(path: NodePath<t.TSDeclareFunction>) {
      if (!path.node.returnType) {
        warnings.push({
          info,
          issueUrl,
          loc: path.node.loc,
        });
      }
    },
    // @ts-ignore
    TSDeclareMethod(path: NodePath<t.TSDeclareMethod>) {
      if (!path.node.returnType) {
        warnings.push({
          info,
          issueUrl,
          loc: path.node.loc,
        });
      }
    },
  };
}
