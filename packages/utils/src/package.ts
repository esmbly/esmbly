import path from 'path';

export async function getRoot(): Promise<string> {
  return process.cwd();
}

export async function getRelativePathTo(file: string): Promise<string> {
  const root = await getRoot();
  return path.relative(root, file);
}
