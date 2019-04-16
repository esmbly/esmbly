import {
  GenericTypeAnnotation,
  Identifier,
  genericTypeAnnotation,
  identifier,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

export default function(path: NodePath<GenericTypeAnnotation>): void {
  const { name } = path.node.id as Identifier;
  if (name === '$ReadOnly') {
    path.replaceWith(
      genericTypeAnnotation(identifier('Readonly'), path.node.typeParameters),
    );
  }
  if (name === '$ReadOnlyArray') {
    path.replaceWith(
      genericTypeAnnotation(
        identifier('ReadonlyArray'),
        path.node.typeParameters,
      ),
    );
  }
}
