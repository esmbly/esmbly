// @flow
import type { BinaryOperator } from 'types/BinaryOperator';

import binaryen from 'binaryen';

export default function binaryOperatorToI64(
  module: binaryen.Module,
  operator: BinaryOperator,
) {
  switch (operator) {
    case '==':
    case '===':
      return module.i64.eq;
    case '!=':
    case '!==':
      return module.i64.ne;
    case '<':
      return module.i64.lt_s;
    case '<=':
      return module.i64.le_s;
    case '>':
      return module.i64.gt_s;
    case '>=':
      return module.i64.ge_s;
    case '<<':
      return module.i64.shl;
    case '>>':
      return module.i64.shr_s;
    case '>>>':
      return module.i64.shr_u;
    case '+':
      return module.i64.add;
    case '-':
      return module.i64.sub;
    case '*':
      return module.i64.mul;
    case '/':
      return module.i64.div_s;
    case '%':
      return module.i64.rem_s;
    case '|':
      return module.i64.or;
    case '^':
      return module.i64.xor;
    case '&':
      return module.i64.and;
    default:
      throw new Error(`Operator ${operator} not supported`);
  }
}
