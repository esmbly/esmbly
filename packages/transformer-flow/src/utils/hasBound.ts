import * as t from '@babel/types';

export default (node: t.Node): boolean => {
  return t.isTypeParameter(node) && node.bound != null;
};
