import * as t from '@babel/types';
import { AstNode } from 'jsdoctypeparser';
export {
  AstNode as TypeNode,
  parse as convertStringToType,
} from 'jsdoctypeparser';

const niceParamPlaceholders = ['firstParam', 'secondParam', 'thirdParam'];

function getParamPlaceholderName(index: number): string {
  return niceParamPlaceholders[index] || `param${index}`;
}

export function isOptionalType(entry: AstNode): boolean {
  return !!(entry.type === 'OPTIONAL' || entry.type === 'NULLABLE');
}

function convertTypeNameToBabel(
  typeName: string,
  objectForSubject?: t.TSType[],
): t.TSType {
  const firstObjectForSubject = objectForSubject
    ? objectForSubject[0]
    : undefined;

  let result: t.TSType;

  // TODO: Ensure this list is exhaustive
  if (typeName === 'Array') {
    result = t.tsArrayType(firstObjectForSubject || t.tsAnyKeyword());
  } else if (
    typeName === 'Object' &&
    objectForSubject &&
    objectForSubject.length === 2
  ) {
    const key = t.identifier('key');
    key.typeAnnotation = t.tsTypeAnnotation(objectForSubject[0]);

    result = t.tsTypeLiteral([
      t.tsIndexSignature([key], t.tsTypeAnnotation(objectForSubject[1])),
    ]);
  } else if (typeName === 'boolean') {
    result = t.tsBooleanKeyword();
  } else if (typeName === 'number') {
    result = t.tsNumberKeyword();
  } else if (typeName === 'string') {
    result = t.tsStringKeyword();
  } else if (typeName === 'any') {
    result = t.tsAnyKeyword();
  } else if (typeName === 'undefined') {
    result = t.tsUndefinedKeyword();
  } else if (typeName === 'null') {
    result = t.tsNullKeyword();
  } else if (typeName === 'void') {
    result = t.tsVoidKeyword();
  } else {
    console.warn(`Possibly unknown type name: ${typeName}`);
    result = t.tsTypeReference(
      t.identifier(typeName),
      objectForSubject === undefined
        ? null
        : t.tsTypeParameterInstantiation(objectForSubject),
    );
  }

  return result;
}

let resolveRecordEntry: (entry: AstNode) => t.TSPropertySignature;

export function convertTypeToBabel(typeNode: AstNode): t.TSType {
  let result;

  if (typeNode.type === 'NAME') {
    result = convertTypeNameToBabel(typeNode.name);
  } else if (typeNode.type === 'PARENTHESIS') {
    result = t.tsUnionType([convertTypeToBabel(typeNode.value)]);
  } else if (typeNode.type === 'UNION') {
    result = t.tsUnionType([
      convertTypeToBabel(typeNode.left),
      convertTypeToBabel(typeNode.right),
    ]);
  } else if (typeNode.type === 'GENERIC' && typeNode.subject.type === 'NAME') {
    result = convertTypeNameToBabel(
      typeNode.subject.name,
      typeNode.objects.map((objectNode: AstNode) =>
        convertTypeToBabel(objectNode),
      ),
    );
  } else if (typeNode.type === 'RECORD') {
    result = t.tsTypeLiteral(
      typeNode.entries.map((entry: AstNode) => resolveRecordEntry(entry)),
    );
  } else if (typeNode.type === 'ARROW' || typeNode.type === 'FUNCTION') {
    result = t.tsFunctionType(
      null,
      t.tsTypeAnnotation(convertTypeToBabel(typeNode.returns)),
    );
    result.parameters = (typeNode.params || []).map(
      (paramNode: AstNode, j: number) => {
        let { name, value } = paramNode;

        if (paramNode.type === 'NAMED_PARAMETER') {
          value = paramNode.typeName;
        } else {
          name = undefined;
        }

        const id = t.identifier(name || getParamPlaceholderName(j));

        const babelType = convertTypeToBabel(
          isOptionalType(value) ? value.value : value,
        );

        id.typeAnnotation = t.tsTypeAnnotation(babelType);
        id.optional = isOptionalType(value);

        return id;
      },
    );
  } else {
    console.warn(`Unknown type: ${typeNode.type}`, typeNode);
    result = t.tsAnyKeyword();
  }

  return result;
}

resolveRecordEntry = (entry: AstNode): t.TSPropertySignature => {
  if (entry.type !== 'RECORD_ENTRY') {
    throw new Error(`Unexpected record entry type: ${entry.type}`);
  }

  if (!entry.value) {
    return t.tsPropertySignature(t.identifier(entry.key));
  }

  const babelType = convertTypeToBabel(
    isOptionalType(entry.value) ? entry.value.value : entry.value,
  );

  const property = t.tsPropertySignature(
    t.identifier(entry.key),
    t.tsTypeAnnotation(babelType),
  );

  property.optional = isOptionalType(entry.value);

  return property;
};

export { resolveRecordEntry };
