import {
  TSTypeAnnotation,
  tsArrayType,
  tsTypeAnnotation,
  tsUnionType,
} from '@babel/types';
import { Tag } from 'doctrine';
import { toKeyword } from '.';

export function toTypeAnnotation(tag?: Tag): TSTypeAnnotation {
  if (!tag) {
    return tsTypeAnnotation(toKeyword('any'));
  }

  const { type } = tag;

  if (!type) {
    return tsTypeAnnotation(toKeyword('any'));
  }

  // @ts-ignore
  if (type.elements) {
    // @ts-ignore
    const keywords = type.elements.map(t => toKeyword(t.name || t.type));
    return tsTypeAnnotation(tsUnionType(keywords));
  }

  if (
    // @ts-ignore
    type.expression &&
    // @ts-ignore
    type.expression.name === 'Array' &&
    // @ts-ignore
    type.applications
  ) {
    // @ts-ignore
    const arrayTypes = type.applications.map(a =>
      tsArrayType(toKeyword(a.name)),
    );
    if (arrayTypes.length > 1) {
      return tsTypeAnnotation(tsUnionType(arrayTypes));
    }
    return tsTypeAnnotation(arrayTypes[0] || toKeyword('any'));
  }

  // @ts-ignore
  return tsTypeAnnotation(toKeyword(type.name || type.type));
}
