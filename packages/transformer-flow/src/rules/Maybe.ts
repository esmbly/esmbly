import {
  NullableTypeAnnotation,
  genericTypeAnnotation,
  identifier,
  nullLiteralTypeAnnotation,
  unionTypeAnnotation,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

export default function(path: NodePath<NullableTypeAnnotation>): void {
  // Todo: replacing with tsTypeAnnotation(tSUnionType(....)) throws an error
  // TypeError: Property value of ObjectTypeProperty expected node to be of a type ["FlowType"] but instead got "TSTypeAnnotation". Why?
  // Workaround: Replace with Flow syntax instead
  path.replaceWith(
    unionTypeAnnotation([
      path.node.typeAnnotation,
      nullLiteralTypeAnnotation(),
      genericTypeAnnotation(identifier('undefined')),
    ]),
  );
}
