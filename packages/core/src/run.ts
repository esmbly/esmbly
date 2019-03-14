import { validateRunConfig } from './config';
import parser from '@esmbly/parser';
import { RunConfig, File } from '@esmbly/types';

export default async function run({
  input,
  transformers,
  output,
}: RunConfig): Promise<File[]> {
  validateRunConfig({ input, transformers, output });
  let files: File[] = [];
  const trees = parser.parse(input);
  for (const transformer of transformers) {
    transformer.transform(trees);
    files = [...files, ...transformer.createFiles(trees, output)];
  }
  return files;
}
