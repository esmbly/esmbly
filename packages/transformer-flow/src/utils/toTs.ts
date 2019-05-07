import * as t from '@babel/types';
import { toTsType } from './toTsType';
import { toTsPropertySignature } from './toTsPropertySignature';
import { toTsAsExpression } from './toTsAsExpression';

export function toTs(
  node: t.Flow | t.TSType | t.Node,
): t.TSType | t.TSTypeElement | t.Expression {
  if (t.isTSType(node)) {
    return node;
  }

  switch (node.type) {
    case 'AnyTypeAnnotation':
    case 'ArrayTypeAnnotation':
    case 'BooleanTypeAnnotation':
    case 'BooleanLiteralTypeAnnotation':
    case 'FunctionTypeAnnotation':
    case 'GenericTypeAnnotation':
    case 'IntersectionTypeAnnotation':
    case 'MixedTypeAnnotation':
    case 'NullableTypeAnnotation':
    case 'NullLiteralTypeAnnotation':
    case 'NumberTypeAnnotation':
    case 'StringLiteralTypeAnnotation':
    case 'StringTypeAnnotation':
    case 'ThisTypeAnnotation':
    case 'TupleTypeAnnotation':
    case 'TypeofTypeAnnotation':
    case 'ObjectTypeAnnotation':
    case 'UnionTypeAnnotation':
    case 'VoidTypeAnnotation':
      return toTsType(node);

    case 'TypeAnnotation':
      return toTsType(node.typeAnnotation);

    case 'ObjectTypeProperty':
      return toTsPropertySignature(node);

    case 'TypeCastExpression':
      return toTsAsExpression(node);

    default:
      throw new Error(
        `Could not convert node of type: ${node.type} to TypeScript`,
      );
  }
}
