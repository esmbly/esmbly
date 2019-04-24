import * as t from '@babel/types';
import { TypeObject, TypeProfileEntry } from '@esmbly/types';
import toTsKeyword from './toTsKeyword';

export default (entry: TypeProfileEntry): t.TSTypeAnnotation => {
  const types = entry.types.map((type: TypeObject) => {
    return toTsKeyword(type.name);
  });

  if (types.length === 1) {
    return t.tsTypeAnnotation(types[0]);
  }

  return t.tsTypeAnnotation(t.tsUnionType(types));
};
