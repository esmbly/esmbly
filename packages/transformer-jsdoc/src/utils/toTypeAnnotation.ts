import {
  TSTypeAnnotation,
  tsArrayType,
  tsTypeAnnotation,
  tsUnionType,
} from '@babel/types';
import { toKeyword } from '.';
import { Tag } from '../types/Tag';

export function toTypeAnnotation({ type }: Tag): TSTypeAnnotation {
  if (type.elements) {
    const keywords = type.elements.map(t => toKeyword(t.name || t.type));
    return tsTypeAnnotation(tsUnionType(keywords));
  }
  if (
    type.expression &&
    type.expression.name === 'Array' &&
    type.applications
  ) {
    const arrayTypes = type.applications.map(a =>
      tsArrayType(toKeyword(a.name)),
    );
    if (arrayTypes.length > 1) {
      return tsTypeAnnotation(tsUnionType(arrayTypes));
    }
    return tsTypeAnnotation(arrayTypes[0] || toKeyword('any'));
  }
  return tsTypeAnnotation(toKeyword(type.name || type.type));
}
