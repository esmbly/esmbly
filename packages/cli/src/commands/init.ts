import { Argv, Arguments } from 'yargs';
import { createConfig } from '../config';

export interface InitOptions {
  default: boolean;
}

export const command = 'init';

export const describe = 'Create an esmbly configuration file';

export const builder = (yargs: Argv): Argv<any> => {
  return yargs
    .version(false)
    .option('default', {
      default: false,
      describe: 'Use default configuration',
      type: 'boolean',
    })
    .help() as Argv;
};

export const handler = async (argv: Arguments & InitOptions): Promise<void> => {
  try {
    const useDefault = argv.default;
    const { fileName, root } = await createConfig(useDefault);
    console.log(`${fileName} created in ${root}`); // TODO: use @esmbly/output
  } catch (err) {
    console.log(err.message || err); // TODO: use @esmbly/output
  }
};
