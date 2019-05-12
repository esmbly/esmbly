import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { CoverageReport, TypeProfile, Warning } from '@esmbly/types';
import { toTsFunction } from '../utils/toTsFunction';

export function ArrowFunctionExpression(
  warnings: Warning[],
  typeProfile: TypeProfile,
  coverageReport: CoverageReport,
): Visitor<Node> {
  return {
    ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
      const parent = path.getStatementParent().node;

      if (t.isVariableDeclaration(parent)) {
        const parentId = parent.declarations[0].id as t.Identifier;
        const functionName = parentId.name;
        toTsFunction(path, functionName, typeProfile, coverageReport, warnings);
      }
    },
  };
}
