import { Arguments, Argv } from 'yargs';
import { InitOptions } from '@esmbly/types';
import printer from '@esmbly/printer';
import { createConfig } from '../config';

export const command = 'init';

export const describe = 'Create an esmbly configuration file';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const builder = (yargs: Argv): Argv<any> => {
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
};

export const handler = async (argv: Arguments & InitOptions): Promise<void> => {
  try {
    const { fileName, root } = await createConfig(argv);
    printer.print(`${fileName} created in ${root}\n`);
  } catch (err) {
    printer.error(`${err.message}\n` || err);
  }
};
