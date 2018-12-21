import binaryen from 'binaryen';
import binaryOperatorToF32 from '../../src/utils/binaryOperatorToF32';

describe('Tests for binaryOperatorToF32', () => {
  it('returns the correct f32 operator for each supported binary operator', () => {
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
    ].map(operator => binaryOperatorToF32(module, operator));
    expect(operators).toEqual([
      module.f32.eq,
      module.f32.ne,
      module.f32.eq,
      module.f32.ne,
      module.f32.lt_s,
      module.f32.le_s,
      module.f32.gt_s,
      module.f32.ge_s,
      module.f32.shl,
      module.f32.shr_s,
      module.f32.shr_u,
      module.f32.add,
      module.f32.sub,
      module.f32.mul,
      module.f32.div_s,
      module.f32.rem_s,
      module.f32.or,
      module.f32.xor,
      module.f32.and,
    ]);
  });
  it('throws an error on unsupported operators', () => {
    const module = new binaryen.Module();
    expect(() => binaryOperatorToF32(module, 'in')).toThrowError();
    expect(() => binaryOperatorToF32(module, 'instanceof')).toThrowError();
  });
});
