import * as t from '@babel/types';
import { Tag } from 'doctrine';
import toKeyword from './toKeyword';

export default (tag?: Tag): t.TSTypeAnnotation => {
  if (!tag) {
    return t.tsTypeAnnotation(toKeyword('any'));
  }

  const { type } = tag;

  if (!type) {
    return t.tsTypeAnnotation(toKeyword('any'));
  }

  // @ts-ignore
  if (type.elements) {
    // @ts-ignore
    const keywords = type.elements.map(element =>
      toKeyword(element.name || element.type),
    );
    return t.tsTypeAnnotation(t.tsUnionType(keywords));
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
      t.tsArrayType(toKeyword(a.name)),
    );
    if (arrayTypes.length > 1) {
      return t.tsTypeAnnotation(t.tsUnionType(arrayTypes));
    }
    return t.tsTypeAnnotation(arrayTypes[0] || toKeyword('any'));
  }

  // @ts-ignore
  return t.tsTypeAnnotation(toKeyword(type.name || type.type));
};
