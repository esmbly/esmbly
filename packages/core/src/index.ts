import { File, RunConfig } from '@esmbly/types';
import parse from './parse';
import validate from './validate';

async function run(config: RunConfig): Promise<File[]> {
  validate(config);

  let files: File[] = [];
  const trees = parse(config.input, config.transformers[0]);

  for (const transformer of config.transformers) {
    if (transformer.before) {
      await transformer.before();
    }

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

export default {
  run,
};
