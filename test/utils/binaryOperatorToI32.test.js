import binaryen from 'binaryen';
import binaryOperatorToI32 from '../../src/utils/binaryOperatorToI32';

describe('Tests for binaryOperatorToI32', () => {
  it('returns the correct i32 operator for each supported binary operator', () => {
    const module = new binaryen.Module();
    const operators = [
      '==',
      '!=',
      '===',
      '!==',
      '<',
      '<=',
      '>',
      '>=',
      '<<',
      '>>',
      '>>>',
      '+',
      '-',
      '*',
      '/',
      '%',
      '|',
      '^',
      '&',
    ].map(operator => binaryOperatorToI32(module, operator));
    expect(operators).toEqual([
      module.i32.eq,
      module.i32.ne,
      module.i32.eq,
      module.i32.ne,
      module.i32.lt_s,
      module.i32.le_s,
      module.i32.gt_s,
      module.i32.ge_s,
      module.i32.shl,
      module.i32.shr_s,
      module.i32.shr_u,
      module.i32.add,
      module.i32.sub,
      module.i32.mul,
      module.i32.div_s,
      module.i32.rem_s,
      module.i32.or,
      module.i32.xor,
      module.i32.and,
    ]);
  });
  it('throws an error on unsupported operators', () => {
    const module = new binaryen.Module();
    expect(() => binaryOperatorToI32(module, 'in')).toThrowError();
    expect(() => binaryOperatorToI32(module, 'instanceof')).toThrowError();
  });
});
