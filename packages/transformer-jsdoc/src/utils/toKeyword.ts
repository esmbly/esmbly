import {
  TSType,
  identifier,
  tsAnyKeyword,
  tsBooleanKeyword,
  tsNullKeyword,
  tsNumberKeyword,
  tsStringKeyword,
  tsTypeReference,
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
    case 'NullLiteral':
      return tsNullKeyword();
    case 'undefined':
      return tsVoidKeyword();
    case 'AllLiteral':
      return tsAnyKeyword();
    default:
      return tsTypeReference(identifier(str));
  }
}
