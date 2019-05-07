import * as t from '@babel/types';

export function hasBound(node: t.Node): boolean {
  return t.isTypeParameter(node) && node.bound != null;
}
