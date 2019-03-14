import path from 'path';

export function getRoot(): string {
  return process.cwd();
}

export function getRelativePathTo(file: string): string {
  const root = getRoot();
  return path.relative(root, file);
}
