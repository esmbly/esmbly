import * as t from '@babel/types';
import toTsType from './toTsType';
import hasBound from './hasBound';
import toTsPropertySignature from './toTsPropertySignature';
import toTsAsExpression from './toTsAsExpression';

/* eslint-disable */

// TODO: Add overloads
// @ts-ignore
export default function toTs(node: t.Flow | t.TSType): t.TSType {
  switch (node.type) {
    // TS types
    // TODO: Why does tsTs get called with TSTypes? It should only get called with Flow types.
    case 'TSAnyKeyword':
    case 'TSArrayType':
    case 'TSBooleanKeyword':
    case 'TSConstructorType':
    case 'TSExpressionWithTypeArguments':
    case 'TSFunctionType':
    case 'TSIndexedAccessType':
    case 'TSIntersectionType':
    case 'TSLiteralType':
    case 'TSMappedType':
    case 'TSNeverKeyword':
    case 'TSNullKeyword':
    case 'TSNumberKeyword':
    case 'TSObjectKeyword':
    case 'TSParenthesizedType':
    case 'TSStringKeyword':
    case 'TSSymbolKeyword':
    case 'TSThisType':
    case 'TSTupleType':
    // @ts-ignore
    case 'TSTypeAnnotation':
    case 'TSTypeLiteral':
    case 'TSTypeOperator':
    case 'TSTypePredicate':
    case 'TSTypeQuery':
    case 'TSTypeReference':
    case 'TSUndefinedKeyword':
    case 'TSUnionType':
    case 'TSVoidKeyword':
    // @ts-ignore
    case 'TSTypeParameterDeclaration':
    // @ts-ignore
    case 'TSAsExpression':
    // @ts-ignore
    case 'TSPropertySignature':
      return node;

    // Flow types
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
    // @ts-ignore
    case 'NumericLiteralTypeAnnotation':
    case 'NumberTypeAnnotation':
    case 'StringLiteralTypeAnnotation':
    case 'StringTypeAnnotation':
    case 'ThisTypeAnnotation':
    case 'TupleTypeAnnotation':
    case 'TypeofTypeAnnotation':
    case 'TypeAnnotation':
    case 'ObjectTypeAnnotation':
    case 'UnionTypeAnnotation':
    case 'VoidTypeAnnotation':
      return toTsType(node);

    case 'ObjectTypeProperty':
      // @ts-ignore
      return toTsPropertySignature(node);

    case 'TypeCastExpression':
      // @ts-ignore
      return toTsAsExpression(node)

    case 'TypeParameterDeclaration':
      // @ts-ignore
      return t.tsTypeParameterDeclaration(
        node.params.map(_ => {
          const d = ((_ as any) as t.TypeParameter).default;
          const p = t.tsTypeParameter(
            hasBound(_) ? toTsType(_.bound!.typeAnnotation) : undefined,
            d ? toTs(d) : undefined,
          );
          p.name = _.name;
          return p;
        }),
      );

    case 'ClassImplements':
    // @ts-ignore
    case 'ClassProperty':
    case 'DeclareClass':
    case 'DeclareFunction':
    case 'DeclareInterface':
    case 'DeclareModule':
    case 'DeclareTypeAlias':
    case 'DeclareVariable':
    // @ts-ignore
    case 'ExistentialTypeParam':
    case 'FunctionTypeParam':
    case 'InterfaceExtends':
    case 'InterfaceDeclaration':
    case 'TypeAlias':
    case 'TypeParameterInstantiation':
    case 'ObjectTypeCallProperty':
    case 'ObjectTypeIndexer':
    case 'QualifiedTypeIdentifier':
      throw 'wut';
    default:
      break;
  }
}
