// @flow
import type { BinaryOperator } from 'types/BinaryOperator';

import binaryen from 'binaryen';

export default function binaryOperatorToI32(
  module: binaryen.Module,
  operator: BinaryOperator,
) {
  switch (operator) {
    case '==':
    case '===':
      return module.i32.eq;
    case '!=':
    case '!==':
      return module.i32.ne;
    case '<':
      return module.i32.lt_s;
    case '<=':
      return module.i32.le_s;
    case '>':
      return module.i32.gt_s;
    case '>=':
      return module.i32.ge_s;
    case '<<':
      return module.i32.shl;
    case '>>':
      return module.i32.shr_s;
    case '>>>':
      return module.i32.shr_u;
    case '+':
      return module.i32.add;
    case '-':
      return module.i32.sub;
    case '*':
      return module.i32.mul;
    case '/':
      return module.i32.div_s;
    case '%':
      return module.i32.rem_s;
    case '|':
      return module.i32.or;
    case '^':
      return module.i32.xor;
    case '&':
      return module.i32.and;
    default:
      throw new Error(`Operator ${operator} not supported`);
  }
}
