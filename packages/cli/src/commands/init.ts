import { Arguments, Argv } from 'yargs';
import { InitOptions } from '@esmbly/types';
import ora from 'ora';
import { createConfig } from '../utils/config';

export const command = 'init';

export const describe = 'Create an esmbly configuration file';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function builder(yargs: Argv): Argv<any> {
  return yargs
    .version(false)
    .option('default', {
      default: false,
      describe: 'Use default configuration',
      type: 'boolean',
    })
    .option('force', {
      default: false,
      describe: 'Overwrite any existing config file',
      type: 'boolean',
    })
    .help() as Argv;
}

export async function handler(argv: Arguments & InitOptions): Promise<void> {
  try {
    const { fileName, root } = await createConfig(argv);
    ora(`${fileName} created in ${root}\n`).succeed();
  } catch (err) {
    ora(`${err.message}` || err).fail();
  }
}
