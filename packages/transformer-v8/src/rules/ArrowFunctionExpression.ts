import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { CoverageReport, TypeProfile, Warning } from '@esmbly/types';
import toTsFunction from '../utils/toTsFunction';

export default (
  warnings: Warning[],
  typeProfile: TypeProfile,
  coverageReport: CoverageReport,
): Visitor<Node> => ({
  ArrowFunctionExpression(path: NodePath<t.ArrowFunctionExpression>) {
    const parent = path.getStatementParent().node as t.VariableDeclaration;
    const parentId = parent.declarations[0].id as t.Identifier;
    const functionName = parentId.name;

    toTsFunction(path, functionName, typeProfile, coverageReport, warnings);
  },
});
