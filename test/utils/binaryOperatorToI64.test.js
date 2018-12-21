import binaryen from 'binaryen';
import binaryOperatorToI64 from '../../src/utils/binaryOperatorToI64';

describe('Tests for binaryOperatorToI64', () => {
  it('returns the correct i64 operator for each supported binary operator', () => {
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
    ].map(operator => binaryOperatorToI64(module, operator));
    expect(operators).toEqual([
      module.i64.eq,
      module.i64.ne,
      module.i64.eq,
      module.i64.ne,
      module.i64.lt_s,
      module.i64.le_s,
      module.i64.gt_s,
      module.i64.ge_s,
      module.i64.shl,
      module.i64.shr_s,
      module.i64.shr_u,
      module.i64.add,
      module.i64.sub,
      module.i64.mul,
      module.i64.div_s,
      module.i64.rem_s,
      module.i64.or,
      module.i64.xor,
      module.i64.and,
    ]);
  });
  it('throws an error on unsupported operators', () => {
    const module = new binaryen.Module();
    expect(() => binaryOperatorToI64(module, 'in')).toThrowError();
    expect(() => binaryOperatorToI64(module, 'instanceof')).toThrowError();
  });
});
