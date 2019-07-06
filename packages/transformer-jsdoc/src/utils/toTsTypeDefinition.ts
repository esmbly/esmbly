import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';
import {
  TypeNode,
  convertStringToType,
  convertTypeToBabel,
  isOptionalType,
  resolveRecordEntry,
} from '../utils/typeParser';

interface CommentParserTag {
  tag: string;
  name: string;
  optional: boolean;
  type: string;
  description: string;
  line: number;
  source: string;
}

function resolveTypeDefType(
  tag: CommentParserTag,
  typeDefinition: TypeNode,
): t.TSTypeAliasDeclaration | undefined {
  let result;

  if (
    typeDefinition.type === 'ARROW' ||
    typeDefinition.type === 'FUNCTION' ||
    typeDefinition.type === 'GENERIC' ||
    typeDefinition.type === 'UNION'
  ) {
    result = t.tsTypeAliasDeclaration(
      t.identifier(tag.name),
      null,
      convertTypeToBabel(typeDefinition),
    );
  }

  return result;
}

function resolveTypeDefImport(
  tag: CommentParserTag,
  typeDefinition: TypeNode,
): t.ImportDeclaration | undefined {
  let result;

  if (
    typeDefinition.type === 'MEMBER' &&
    typeDefinition.owner &&
    typeDefinition.owner.type === 'IMPORT' &&
    typeDefinition.owner.path &&
    typeDefinition.owner.path.type === 'STRING_VALUE'
  ) {
    result = t.importDeclaration(
      [
        t.importSpecifier(
          t.identifier(typeDefinition.name),
          t.identifier(typeDefinition.name),
        ),
      ],
      t.stringLiteral(typeDefinition.owner.path.string),
    );
  }

  return result;
}

function resolveTypeDefInterface(
  tag: CommentParserTag,
  typeDefinition: TypeNode,
): t.TSInterfaceDeclaration | undefined {
  let result;

  if (typeDefinition.type === 'RECORD') {
    result = t.tsInterfaceDeclaration(
      t.identifier(tag.name),
      null,
      null,
      t.tsInterfaceBody(
        typeDefinition.entries.map((entry: TypeNode) =>
          resolveRecordEntry(entry),
        ),
      ),
    );
  }

  return result;
}

function resolveSimpleTypeDef(path: NodePath, tag: CommentParserTag): void {
  const typeDefinition = convertStringToType(tag.type);

  const result =
    resolveTypeDefType(tag, typeDefinition) ||
    resolveTypeDefImport(tag, typeDefinition) ||
    resolveTypeDefInterface(tag, typeDefinition);

  if (result) {
    path.insertBefore(result);
  } else {
    console.warn(
      `Needs to implement: ${typeDefinition.type}: `,
      tag.tag,
      tag.type,
      typeDefinition,
    );
  }
}

function resolvePropertyTypeDef(
  path: NodePath,
  tags: CommentParserTag[],
): void {
  const typedef = tags[0];
  const properties = tags.slice(1);

  const entries = properties.map((property: CommentParserTag) => {
    if (property.tag !== 'property') {
      throw new Error(`Unexpected tag: ${property.tag}`);
    }

    if (!property.type) {
      return t.tsPropertySignature(t.identifier(property.name));
    }

    const typeDefinition = convertStringToType(property.type);

    const babelType = convertTypeToBabel(
      isOptionalType(typeDefinition) ? typeDefinition.value : typeDefinition,
    );

    const result = t.tsPropertySignature(
      t.identifier(property.name),
      t.tsTypeAnnotation(babelType),
    );

    result.optional = property.optional || isOptionalType(typeDefinition);

    return result;
  });

  path.insertBefore(
    t.tsInterfaceDeclaration(
      t.identifier(typedef.name),
      null,
      null,
      t.tsInterfaceBody(entries),
    ),
  );
}

export function toTsTypeDefinition(
  path: NodePath,
  tags: CommentParserTag[],
): void {
  if (tags.some(tag => tag.tag === 'property')) {
    resolvePropertyTypeDef(path, tags);
  } else if (tags.length === 1 && tags[0].type) {
    resolveSimpleTypeDef(path, tags[0]);
  } else {
    console.warn('Unexpected @typedef construction');
  }
}
