import * as t from '@babel/types';
import { Type, type } from 'doctrine';

/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-use-before-define */

function handleTypeApplication(tag: type.TypeApplication): t.TSType {
  const { name } = tag.expression as type.NameExpression;

  if (name === 'Array') {
    if (
      tag.applications[0].type === 'UnionType' &&
      tag.applications.length === 1
    ) {
      const [union] = tag.applications;
      return t.tsUnionType(
        union.elements.map((element: Type) =>
          t.tsArrayType(toKeyword(element)),
        ),
      );
    }

    const arrayTypes = tag.applications.map(toKeyword);

    if (arrayTypes.length > 1) {
      return t.tsArrayType(t.tsUnionType(arrayTypes));
    }

    return t.tsArrayType(arrayTypes[0] || t.tsAnyKeyword());
  }

  // TODO: Handle other type of type applications?
  return t.tsAnyKeyword();
}

function handleNameExpression(tag: type.NameExpression): t.TSType {
  switch (tag.name) {
    case 'Array':
    case 'array':
      return t.tsArrayType(t.tsAnyKeyword());
    case 'String':
    case 'string':
      return t.tsStringKeyword();
    case 'Number':
    case 'number':
      return t.tsNumberKeyword();
    case 'Boolean':
    case 'boolean':
      return t.tsBooleanKeyword();
    case 'null':
      return t.tsNullKeyword();
    case 'undefined':
      return t.tsVoidKeyword();
    case 'any':
      return t.tsAnyKeyword();
    case 'void':
      return t.tsVoidKeyword();
    default:
      return t.tsTypeReference(t.identifier(tag.name));
  }
}

function handleRestType(tag: type.RestType): t.TSType {
  if (tag.expression && tag.expression.type === 'UnionType') {
    return t.tsUnionType(
      tag.expression.elements.map((element: Type) =>
        t.tsArrayType(toKeyword(element)),
      ),
    );
  }

  return t.tsArrayType(toKeyword(tag.expression));
}

export function toKeyword(tag?: Type): t.TSType {
  if (!tag) {
    return t.tsAnyKeyword();
  }

  if (!tag.type) {
    return t.tsAnyKeyword();
  }

  switch (tag.type.toString()) {
    case 'AllLiteral':
      return t.tsAnyKeyword();
    case 'NullLiteral':
      return t.tsNullKeyword();
    case 'UndefinedLiteral':
      return t.tsUndefinedKeyword();
    case 'VoidLiteral':
      return t.tsVoidKeyword();
    case 'UnionType':
      return t.tsUnionType((tag as type.UnionType).elements.map(toKeyword));
    case 'RestType':
      return handleRestType(tag as type.RestType);
    case 'OptionalType':
      return toKeyword((tag as type.OptionalType).expression);
    case 'NameExpression':
      return handleNameExpression(tag as type.NameExpression);
    case 'TypeApplication':
      return handleTypeApplication(tag as type.TypeApplication);
    default:
      return t.tsAnyKeyword();
  }
}
