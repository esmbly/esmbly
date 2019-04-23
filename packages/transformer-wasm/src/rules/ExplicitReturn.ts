import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { Warning } from '../types';

const info =
  'AssemblyScript require functions to have a return type annotation.';

function warnForNode(node: t.Node, warnings: Warning[]): void {
  warnings.push({ info, node });
}

export default (warnings: Warning[]): Visitor<Node> => ({
  // @ts-ignore
  ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
    if (!path.node.returnType) {
      warnForNode(path.node, warnings);
    }
  },
  // @ts-ignore
  ClassMethod(path: NodePath<t.ClassMethod>) {
    if (!path.node.returnType) {
      warnForNode(path.node, warnings);
    }
  },
  // @ts-ignore
  FunctionDeclaration(path: NodePath<t.FunctionDeclaration>) {
    if (!path.node.returnType) {
      warnForNode(path.node, warnings);
    }
  },
  // @ts-ignore
  FunctionExpression(path: NodePath<t.FunctionExpression>) {
    if (!path.node.returnType) {
      warnForNode(path.node, warnings);
    }
  },
  // @ts-ignore
  ObjectMethod(path: NodePath<t.ObjectMethod>) {
    if (!path.node.returnType) {
      warnForNode(path.node, warnings);
    }
  },
  // @ts-ignore
  TSDeclareFunction(path: NodePath<t.TSDeclareFunction>) {
    if (!path.node.returnType) {
      warnForNode(path.node, warnings);
    }
  },
  // @ts-ignore
  TSDeclareMethod(path: NodePath<t.TSDeclareMethod>) {
    if (!path.node.returnType) {
      warnForNode(path.node, warnings);
    }
  },
});
