import * as t from '@babel/types';
import { toTsType } from './toTsType';

export function toTsTypeLiteral(node: t.ObjectTypeAnnotation): t.TSTypeLiteral {
  const properties = node.properties.map(
    (property: t.ObjectTypeProperty | t.ObjectTypeSpreadProperty) => {
      if (t.isObjectTypeSpreadProperty(property)) {
        return property;
      }

      const s = t.tsPropertySignature(
        property.key,
        t.tsTypeAnnotation(toTsType(property.value)),
      );
      s.optional = property.optional;
      return s;
    },
  );

  const indexers = node.indexers || [];
  const indexSignatures = indexers.map((indexer: t.ObjectTypeIndexer) => {
    let key = indexer.id as t.Identifier;

    if (!key) {
      key = t.identifier('key');
    }

    key.typeAnnotation = t.tsTypeAnnotation(toTsType(indexer.key));
    return t.tsIndexSignature(
      [key],
      t.tsTypeAnnotation(toTsType(indexer.value)),
    );
  });

  return t.tsTypeLiteral([
    ...(properties as t.TSTypeElement[]),
    ...indexSignatures,
  ]);
}
