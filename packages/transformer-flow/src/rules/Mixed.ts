import {
  MixedTypeAnnotation,
  genericTypeAnnotation,
  identifier,
} from '@babel/types';
import { NodePath } from '@babel/traverse';

export default function(path: NodePath<MixedTypeAnnotation>): void {
  // Todo: replacing with tsTypeAnnotation(.....) throws an error
  // Workaround: Replace with Flow syntax instead
  path.replaceWith(genericTypeAnnotation(identifier('unknown')));
}
