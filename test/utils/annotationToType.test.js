import binaryen from 'binaryen';
import annotationToType from '../../src/utils/annotationToType';

const getAnnotation = type => ({
  type: 'GenericTypeAnnotation',
  loc: { source: null, start: [Object], end: [Object] },
  range: [66, 69],
  id: {
    type: 'Identifier',
    loc: [Object],
    range: [Array],
    name: type,
    typeAnnotation: null,
    optional: false,
  },
  typeParameters: null,
});

describe('Tests for annotationToType', () => {
  it('return the correct value type for each supported annotation', () => {
    const valueTypes = [
      getAnnotation('i32'),
      getAnnotation('i64'),
      getAnnotation('f32'),
      getAnnotation('f64'),
    ].map(annotationToType);
    expect(valueTypes).toEqual([
      binaryen.i32,
      binaryen.i64,
      binaryen.f32,
      binaryen.f64,
    ]);
  });
  it('throws an error on unsupported annotations', () => {
    const annotation = getAnnotation('CustomAnnotation');
    expect(() => annotationToType(annotation)).toThrowError();
  });
});
