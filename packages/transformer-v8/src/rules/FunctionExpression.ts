import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { CoverageReport, TypeProfile, Warning } from '@esmbly/types';
import { toTsFunction } from '../utils/toTsFunction';

export function FunctionExpression(
  warnings: Warning[],
  typeProfile: TypeProfile,
  coverageReport: CoverageReport,
): Visitor<Node> {
  return {
    FunctionExpression(path: NodePath<t.FunctionExpression>) {
      const id = path.node.id || { name: null };
      let functionName = id.name;

      if (!functionName) {
        const parent = path.getStatementParent().node as t.VariableDeclaration;
        const parentId = parent.declarations[0].id as t.Identifier;
        functionName = parentId.name;
      }

      toTsFunction(path, functionName, typeProfile, coverageReport, warnings);
    },
  };
}
