import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { Warning } from '@esmbly/types';

const info =
  'AssemblyScript require functions to have a return type annotation.';

export default (warnings: Warning[]): Visitor<Node> => ({
  // @ts-ignore
  ArrowFunctionExpression({ node }: NodePath<t.ArrowFunctionExpression>) {
    if (!node.returnType) {
      warnings.push({ info, node });
    }
  },
  // @ts-ignore
  ClassMethod({ node }: NodePath<t.ClassMethod>) {
    if (!node.returnType) {
      warnings.push({ info, node });
    }
  },
  // @ts-ignore
  FunctionDeclaration({ node }: NodePath<t.FunctionDeclaration>) {
    if (!node.returnType) {
      warnings.push({ info, node });
    }
  },
  // @ts-ignore
  FunctionExpression({ node }: NodePath<t.FunctionExpression>) {
    if (!node.returnType) {
      warnings.push({ info, node });
    }
  },
  // @ts-ignore
  ObjectMethod({ node }: NodePath<t.ObjectMethod>) {
    if (!node.returnType) {
      warnings.push({ info, node });
    }
  },
  // @ts-ignore
  TSDeclareFunction({ node }: NodePath<t.TSDeclareFunction>) {
    if (!node.returnType) {
      warnings.push({ info, node });
    }
  },
  // @ts-ignore
  TSDeclareMethod({ node }: NodePath<t.TSDeclareMethod>) {
    if (!node.returnType) {
      warnings.push({ info, node });
    }
  },
});
