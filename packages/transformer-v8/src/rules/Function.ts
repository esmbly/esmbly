import * as t from '@babel/types';
import { Node, NodePath, Visitor } from '@babel/traverse';
import { CoverageReport, TypeProfile, Warning } from '@esmbly/types';
import toTsFunction from '../utils/toTsFunction';

export default (
  warnings: Warning[],
  typeProfile: TypeProfile,
  coverageReport: CoverageReport,
): Visitor<Node> => ({
  FunctionDeclaration(path: NodePath<t.FunctionDeclaration>) {
    toTsFunction(path.node, typeProfile, coverageReport, warnings);
  },
  FunctionExpression(path: NodePath<t.FunctionExpression>) {
    toTsFunction(path.node, typeProfile, coverageReport, warnings);
  },
});
