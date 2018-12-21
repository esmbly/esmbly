// @flow
import type { SourceLocation } from 'types/SourceLocation';
import type { TypeAnnotation } from 'types/TypeAnnotation';

export type Identifier = {
  type: 'Identifier',
  loc: SourceLocation,
  range: Array<number>,
  name: string,
  typeAnnotation: TypeAnnotation,
  optional: boolean,
};
