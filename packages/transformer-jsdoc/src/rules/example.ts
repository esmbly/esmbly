import { FunctionDeclaration } from '@babel/types';
import { NodePath } from '@babel/traverse';

// Example rule
export function example(path: NodePath<FunctionDeclaration>): void {
  if (!path.node.id) {
    return;
  }
  if (path.node.id.name === 'foo') {
    path.node.id.name = 'bar';
  }
}
