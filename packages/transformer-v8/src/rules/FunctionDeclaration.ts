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
    const { name } = path.node.id || { name: null };

    if (!name) {
      warnings.push({
        info: 'Could not collect type information for function.',
        node: path.node,
      });
      return;
    }

    toTsFunction(path.node, name, typeProfile, coverageReport, warnings);
  },
});
