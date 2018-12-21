// @flow
import type { Statement } from 'types/Statement';

export type BlockStatement = Statement<'BlockStatement'> & {
  body: [Statement<any>],
};
