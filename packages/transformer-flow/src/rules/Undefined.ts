import { TypeofTypeAnnotation } from '@babel/types';
import { NodePath } from '@babel/traverse';

export default function(path: NodePath<TypeofTypeAnnotation>): void {
  // Todo: replacing with tsTypeAnnotation(tsUndefinedKeyword()) throws an error
  // TypeError: Property typeAnnotation of TypeAnnotation expected node to be of a type ["FlowType"] but instead got "TSTypeAnnotation" Why?
  // Workaround: Replace with Flow syntax instead
  path.replaceWith(path.node.argument);
}
