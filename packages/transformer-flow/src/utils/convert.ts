import {
  FlowType,
  TSType,
  nullLiteralTypeAnnotation,
  numberTypeAnnotation,
  stringTypeAnnotation,
  tsNullKeyword,
  tsNumberKeyword,
  tsStringKeyword,
} from '@babel/types';
import { Format } from '@esmbly/types';

interface TMap {
  [type: string]: {
    [key: string]: Function;
  };
}

const TypeMap: TMap = {
  null: {
    [Format.Flow]: nullLiteralTypeAnnotation,
    [Format.TypeScript]: tsNullKeyword,
  },
  number: {
    [Format.Flow]: numberTypeAnnotation,
    [Format.TypeScript]: tsNumberKeyword,
  },
  string: {
    [Format.Flow]: stringTypeAnnotation,
    [Format.TypeScript]: tsStringKeyword,
  },
};

// @ts-ignore
export function convertAnnotation(
  node: TSType | FlowType,
  to: string,
): TSType | FlowType | null {
  switch (node.type) {
    case 'TSStringKeyword':
    case 'StringTypeAnnotation':
      return TypeMap.string[to]();
    case 'TSNumberKeyword':
    case 'NumberTypeAnnotation':
      return TypeMap.number[to]();
    default:
      return null;
  }
}

export function toTs(node: TSType | FlowType): TSType {
  return convertAnnotation(node, 'TypeScript') as TSType;
}
