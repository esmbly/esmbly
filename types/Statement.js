// @flow
import type { SourceLocation } from 'types/SourceLocation';

export type Statement<type> = {
  type: type,
  loc: SourceLocation,
  range: Array<number>,
};
