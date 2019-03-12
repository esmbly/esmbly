import esmbly from '@esmbly/core';
import { FileType } from '@esmbly/types';
import { requireTransformer, readFiles } from '@esmbly/utils';
import { readConfig } from '../config';
import { Argv } from 'yargs';

export const command = 'run';

export const describe = 'Run esmbly';

export const builder = (yargs: Argv): Argv => {
  return yargs.version(false).help();
};

export const handler = async (): Promise<void> => {
  try {
    const config = await readConfig();
    const files = await readFiles(config.files);
    const transformers = config.transformers.map(t => requireTransformer(t));
    await esmbly.run({
      files,
      transformers,
      output: config.output as FileType[],
    });
  } catch (err) {
    console.log(err);
  }
};
