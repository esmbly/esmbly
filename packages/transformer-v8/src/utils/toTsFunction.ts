import * as t from '@babel/types';
import {
  CoverageReport,
  FunctionCoverage,
  TypeProfile,
  TypeProfileEntry,
  Warning,
} from '@esmbly/types';
import { NodePath } from '@babel/traverse';
import { toTsTypeAnnotation } from './toTsTypeAnnotation';

export function toTsFunction(
  path: NodePath<
    t.FunctionDeclaration | t.FunctionExpression | t.ArrowFunctionExpression
  >,
  name: string,
  typeProfile: TypeProfile,
  coverageReport: CoverageReport,
  warnings: Warning[],
): void {
  const coverage = coverageReport.functions.find(
    (fn: FunctionCoverage) => fn.functionName === name,
  );

  if (!coverage) {
    warnings.push({
      info: 'Could not collect type information for function.',
      loc: path.node.loc,
    });
    return;
  }

  const [{ startOffset, endOffset }] = coverage.ranges;

  const types = typeProfile.entries
    .filter((entry: TypeProfileEntry) => {
      return entry.offset >= startOffset && entry.offset <= endOffset;
    })
    .sort((a: TypeProfileEntry, b: TypeProfileEntry) => {
      return a.offset - b.offset;
    });

  const returnType = types.pop();

  if (!returnType) {
    warnings.push({
      info: 'Could not collect type information for function.',
      loc: path.node.loc,
    });
    return;
  }

  path.node.returnType = toTsTypeAnnotation(returnType);

  (path.node.params as t.Identifier[]).forEach(
    (param: t.Identifier, i: number) => {
      param.typeAnnotation = toTsTypeAnnotation(types[i]);
    },
  );
}
