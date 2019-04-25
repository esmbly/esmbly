import * as t from '@babel/types';

export default (str: string): t.TSType => {
  switch (str) {
    case 'string':
      return t.tsStringKeyword();
    case 'number':
      return t.tsNumberKeyword();
    case 'boolean':
      return t.tsBooleanKeyword();
    case 'null':
    case 'NullLiteral':
      return t.tsNullKeyword();
    case 'undefined':
      return t.tsVoidKeyword();
    case 'AllLiteral':
      return t.tsAnyKeyword();
    default:
      return t.tsTypeReference(t.identifier(str));
  }
};
