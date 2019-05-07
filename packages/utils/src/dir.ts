import fs from './fs';

export async function mkdirp(dir: string): Promise<void> {
  return fs.mkdir(dir);
}
