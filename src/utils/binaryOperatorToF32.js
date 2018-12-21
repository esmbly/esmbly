// @flow
import type { BinaryOperator } from 'types/BinaryOperator';

import binaryen from 'binaryen';

export default function binaryOperatorToF32(
  module: binaryen.Module,
  operator: BinaryOperator,
) {
  switch (operator) {
    case '==':
    case '===':
      return module.f32.eq;
    case '!=':
    case '!==':
      return module.f32.ne;
    case '<':
      return module.f32.lt_s;
    case '<=':
      return module.f32.le_s;
    case '>':
      return module.f32.gt_s;
    case '>=':
      return module.f32.ge_s;
    case '<<':
      return module.f32.shl;
    case '>>':
      return module.f32.shr_s;
    case '>>>':
      return module.f32.shr_u;
    case '+':
      return module.f32.add;
    case '-':
      return module.f32.sub;
    case '*':
      return module.f32.mul;
    case '/':
      return module.f32.div_s;
    case '%':
      return module.f32.rem_s;
    case '|':
      return module.f32.or;
    case '^':
      return module.f32.xor;
    case '&':
      return module.f32.and;
    default:
      throw new Error(`Operator ${operator} not supported`);
  }
}
