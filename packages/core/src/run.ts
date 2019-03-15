import { File, RunConfig, Transformer } from '@esmbly/types';
import parse from '@esmbly/parser';
import { validateRunConfig } from './config';

export default async function run({
  input,
  transformers,
  output,
}: RunConfig): Promise<File[]> {
  validateRunConfig({ input, output, transformers });
  let files: File[] = [];
  const trees = parse(input);
  transformers.forEach((transformer: Transformer) => {
    transformer.transform(trees);
    files = [...files, ...transformer.createFiles(trees, output)];
  });
  return files;
}
