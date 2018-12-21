// @flow
import type { TypeAnnotation } from 'types/TypeAnnotation';
import type { ValueType } from 'types/ValueType';

import binaryen from 'binaryen';

export default function annotationToType(
  annotation: TypeAnnotation,
): ValueType {
  if (annotation.id.name === 'i32') {
    return binaryen.i32;
  }
  if (annotation.id.name === 'i64') {
    return binaryen.i64;
  }
  if (annotation.id.name === 'f32') {
    return binaryen.f32;
  }
  if (annotation.id.name === 'f64') {
    return binaryen.f64;
  }
  throw new Error(`Annotation not supported: ${JSON.stringify(annotation)}`);
}
