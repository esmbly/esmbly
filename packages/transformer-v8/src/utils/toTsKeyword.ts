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
      return t.tsNullKeyword();
    case 'undefined':
      return t.tsVoidKeyword();
    default:
      return t.tsAnyKeyword();
  }
};
