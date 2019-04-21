import t from '@babel/types';

export default function hasBound(node: t.Node): boolean {
  return t.isTypeParameter(node) && node.bound != null;
}
