import { File, RunConfig } from '@esmbly/types';
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
  // TODO: Maybe use array iterations instead?
  // eslint-disable-next-line
  for (const transformer of transformers) {
    // eslint-disable-next-line
    await transformer.transform(trees);
    files = [...files, ...transformer.createFiles(trees, output)];
  }
  return files;
}
