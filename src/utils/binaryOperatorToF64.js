// @flow
import type { BinaryOperator } from 'types/BinaryOperator';

import binaryen from 'binaryen';

export default function binaryOperatorToF64(
  module: binaryen.Module,
  operator: BinaryOperator,
) {
  switch (operator) {
    case '==':
    case '===':
      return module.f64.eq;
    case '!=':
    case '!==':
      return module.f64.ne;
    case '<':
      return module.f64.lt_s;
    case '<=':
      return module.f64.le_s;
    case '>':
      return module.f64.gt_s;
    case '>=':
      return module.f64.ge_s;
    case '<<':
      return module.f64.shl;
    case '>>':
      return module.f64.shr_s;
    case '>>>':
      return module.f64.shr_u;
    case '+':
      return module.f64.add;
    case '-':
      return module.f64.sub;
    case '*':
      return module.f64.mul;
    case '/':
      return module.f64.div_s;
    case '%':
      return module.f64.rem_s;
    case '|':
      return module.f64.or;
    case '^':
      return module.f64.xor;
    case '&':
      return module.f64.and;
    default:
      throw new Error(`Operator ${operator} not supported`);
  }
}
