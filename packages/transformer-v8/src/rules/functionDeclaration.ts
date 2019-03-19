import { FunctionDeclaration, Identifier } from '@babel/types';
import {
  CoverageReport,
  FunctionCoverage,
  TypeProfile,
  TypeProfileEntry,
} from '@esmbly/types';
import { toTypeAnnotation } from '../utils';

export function functionDeclaration(
  node: FunctionDeclaration,
  typeProfile: TypeProfile,
  coverageReport: CoverageReport,
): void {
  if (!node.id) {
    return;
  }
  if (!node.id.loc) {
    return;
  }

  // @ts-ignore
  // eslint-disable-next-line
  const name = (node.id.loc as any).identifierName as string;
  const coverage = coverageReport.functions.find(
    (fn: FunctionCoverage) => fn.functionName === name,
  );

  if (!coverage) {
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
    return;
  }

  node.returnType = toTypeAnnotation(returnType);

  // @ts-ignore
  // eslint-disable-next-line
  node.params.forEach((param: Identifier, i: number) => {
    param.typeAnnotation = toTypeAnnotation(types[i]);
  });
}
