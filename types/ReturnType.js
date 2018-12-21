// @flow
import type { SourceLocation } from 'types/SourceLocation';
import type { TypeAnnotation } from 'types/TypeAnnotation';

export type ReturnType = {
  type: 'TypeAnnotation',
  loc: SourceLocation,
  range: Array<number>,
  typeAnnotation: TypeAnnotation,
};
