import * as t from '@babel/types';
import { Tag } from 'doctrine';
import toKeyword from './toKeyword';

export default (tag?: Tag): t.TSTypeAnnotation => {
  if (!tag) {
    return t.tsTypeAnnotation(t.tsAnyKeyword());
  }

  const { type } = tag;

  if (!type) {
    return t.tsTypeAnnotation(t.tsAnyKeyword());
  }

  return t.tsTypeAnnotation(toKeyword(type));
};
