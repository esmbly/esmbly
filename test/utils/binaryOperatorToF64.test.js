import binaryen from 'binaryen';
import binaryOperatorToF64 from '../../src/utils/binaryOperatorToF64';

describe('Tests for binaryOperatorToF64', () => {
  it('returns the correct f64 operator for each supported binary operator', () => {
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
    ].map(operator => binaryOperatorToF64(module, operator));
    expect(operators).toEqual([
      module.f64.eq,
      module.f64.ne,
      module.f64.eq,
      module.f64.ne,
      module.f64.lt_s,
      module.f64.le_s,
      module.f64.gt_s,
      module.f64.ge_s,
      module.f64.shl,
      module.f64.shr_s,
      module.f64.shr_u,
      module.f64.add,
      module.f64.sub,
      module.f64.mul,
      module.f64.div_s,
      module.f64.rem_s,
      module.f64.or,
      module.f64.xor,
      module.f64.and,
    ]);
  });
  it('throws an error on unsupported operators', () => {
    const module = new binaryen.Module();
    expect(() => binaryOperatorToF64(module, 'in')).toThrowError();
    expect(() => binaryOperatorToF64(module, 'instanceof')).toThrowError();
  });
});
