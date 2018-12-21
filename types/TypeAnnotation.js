// @flow
import type { SourceLocation } from 'types/SourceLocation';
import type { Identifier } from 'types/Identifier';

export type TypeAnnotation = {
  type: 'GenericTypeAnnotation',
  loc: SourceLocation,
  range: Array<number>,
  id: Identifier,
  typeParameters: TypeAnnotation,
};
