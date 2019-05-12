import * as t from '@babel/types';

export function toTsKeyword(str: string): t.TSType {
  switch (str) {
    case 'string':
      return t.tsStringKeyword();
    case 'number':
      return t.tsNumberKeyword();
    case 'boolean':
      return t.tsBooleanKeyword();
    case 'null':
      return t.tsNullKeyword();
    case 'undefined':
      return t.tsVoidKeyword();
    case 'Array':
      return t.tsArrayType(t.tsAnyKeyword());
    case 'Object':
      return t.tsObjectKeyword();
    default:
      return t.tsTypeReference(t.identifier(str));
  }
}
