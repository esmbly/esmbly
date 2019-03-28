import { TSTypeAnnotation, tsTypeAnnotation, tsUnionType } from '@babel/types';
import { TypeObject, TypeProfileEntry } from '@esmbly/types';
import { toKeyword } from '.';

export function toTypeAnnotation(entry: TypeProfileEntry): TSTypeAnnotation {
  const types = entry.types.map((type: TypeObject) => {
    return toKeyword(type.name);
  });
  if (types.length === 1) {
    return tsTypeAnnotation(types[0]);
  }
  return tsTypeAnnotation(tsUnionType(types));
}
