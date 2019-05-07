import { File, RunConfig } from '@esmbly/types';
import { parse } from './parse';
import { validateConfig, validateInputFormat } from './validate';

export async function run(config: RunConfig): Promise<File[]> {
  validateConfig(config);

  let files: File[] = [];
  const trees = parse(config.input, config.transformers[0]);

  for (const transformer of config.transformers) {
    if (transformer.before) {
      await transformer.before();
    }

    validateInputFormat(trees, transformer);

    if (transformer.transform) {
      await transformer.transform(trees);
    }

    if (transformer.createFiles) {
      files = [
        ...files,
        ...(await transformer.createFiles(trees, config.output)),
      ];
    }

    if (transformer.after) {
      await transformer.after();
    }
  }

  return files;
}
