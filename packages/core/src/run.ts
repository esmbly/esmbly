import { File, RunConfig } from '@esmbly/types';
import parse from '@esmbly/parser';
import { validateRunConfig } from './config';

export default async function run(config: RunConfig): Promise<File[]> {
  validateRunConfig(config);

  let files: File[] = [];
  const trees = parse(config.input);

  for (const transformer of config.transformers) {
    await transformer.transform(trees);
    files = [...files, ...transformer.createFiles(trees, config.output)];
  }

  return files;
}
