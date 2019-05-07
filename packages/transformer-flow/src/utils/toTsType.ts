import * as t from '@babel/types';
import { getId } from './getId';
import { toTsFunction } from './toTsFunction';
import { toTsTypeLiteral } from './toTsTypeLiteral';

export function toTsType(node: t.Flow): t.TSType {
  switch (node.type) {
    case 'AnyTypeAnnotation':
      return t.tsAnyKeyword();
    case 'ArrayTypeAnnotation':
      return t.tsArrayType(toTsType(node.elementType));
    case 'BooleanTypeAnnotation':
      return t.tsBooleanKeyword();
    case 'BooleanLiteralTypeAnnotation':
      return t.tsLiteralType(t.booleanLiteral(node.value));
    case 'FunctionTypeAnnotation':
      return toTsFunction(node);
    case 'GenericTypeAnnotation':
      return t.tsTypeReference(getId(node));
    case 'IntersectionTypeAnnotation':
      return t.tsIntersectionType(node.types.map(toTsType));
    case 'MixedTypeAnnotation':
      return t.tsUnknownKeyword();
    case 'NullLiteralTypeAnnotation':
      return t.tsNullKeyword();
    case 'NullableTypeAnnotation':
      return t.tsUnionType([
        toTsType(node.typeAnnotation),
        t.tsNullKeyword(),
        t.tsUndefinedKeyword(),
      ]);
    case 'NumberLiteralTypeAnnotation':
      return t.tsLiteralType(t.numericLiteral(node.value));
    case 'NumberTypeAnnotation':
      return t.tsNumberKeyword();
    case 'StringLiteralTypeAnnotation':
      return t.tsLiteralType(t.stringLiteral(node.value));
    case 'StringTypeAnnotation':
      return t.tsStringKeyword();
    case 'ThisTypeAnnotation':
      return t.tsThisType();
    case 'TupleTypeAnnotation':
      return t.tsTupleType(node.types.map(toTsType));
    case 'TypeofTypeAnnotation':
      return t.tsTypeQuery(getId(node.argument));
    case 'ObjectTypeAnnotation':
      return toTsTypeLiteral(node);
    case 'UnionTypeAnnotation':
      return t.tsUnionType(node.types.map(toTsType));
    case 'VoidTypeAnnotation':
      return t.tsVoidKeyword();
    default:
      throw new Error(
        `Could not convert node of type: ${node.type} to TypeScript`,
      );
  }
}
