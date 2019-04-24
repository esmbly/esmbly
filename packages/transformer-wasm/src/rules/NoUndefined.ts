import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { Warning } from '@esmbly/types';

const info = 'AssemblyScript does not support the delete operator';

export default (warnings: Warning[]): Visitor<Node> => ({
  TSUndefinedKeyword({ node }: NodePath<t.TSUndefinedKeyword>) {
    warnings.push({ info, node });
  },
});
