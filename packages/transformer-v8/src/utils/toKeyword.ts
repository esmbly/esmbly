import {
  TSType,
  tsAnyKeyword,
  tsBooleanKeyword,
  tsNullKeyword,
  tsNumberKeyword,
  tsStringKeyword,
  tsVoidKeyword,
} from '@babel/types';

export function toKeyword(str: string): TSType {
  switch (str) {
    case 'string':
      return tsStringKeyword();
    case 'number':
      return tsNumberKeyword();
    case 'boolean':
      return tsBooleanKeyword();
    case 'null':
      return tsNullKeyword();
    case 'undefined':
      return tsVoidKeyword();
    default:
      return tsAnyKeyword();
  }
}
