// @flow
import type { Position } from 'types/Position';

export type SourceLocation = {
  source: string | null,
  start: Position,
  end: Position,
};
