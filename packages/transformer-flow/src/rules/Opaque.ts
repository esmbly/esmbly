import { OpaqueType, typeAlias } from '@babel/types';
import { NodePath } from '@babel/traverse';

export default function(path: NodePath<OpaqueType>): void {
  const type = typeAlias(
    path.node.id,
    path.node.typeParameters,
    path.node.impltype,
  );
  // @ts-ignore
  type.comments = path.node.comments;
  path.replaceWith(type);
}
