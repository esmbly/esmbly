import * as t from '@babel/types';
import { NodePath } from '@babel/traverse';

export function exportMemory(path: NodePath<t.Program>): void {
  // @ts-ignore
  path.unshiftContainer(
    'body',
    t.exportNamedDeclaration(null, [
      t.exportSpecifier(t.identifier('memory'), t.identifier('memory')),
    ]),
  );
}

export function importAllocator(
  path: NodePath<t.Program>,
  allocator: string,
): void {
  // @ts-ignore
  path.unshiftContainer(
    'body',
    t.importDeclaration([], t.stringLiteral(allocator)),
  );
}
