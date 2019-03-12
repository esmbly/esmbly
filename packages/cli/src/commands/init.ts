import { Argv, Arguments } from 'yargs';
import { writeConfig } from '../config';

export interface InitOptions {
  js: boolean;
  default: boolean;
}

export const command = 'init';

export const describe = 'Create an esmbly configuration file';

export const builder = (yargs: Argv): Argv => {
  return yargs
    .version(false)
    .option('js', {
      default: false,
      describe: 'Use .js extension for configuration file',
      type: 'boolean',
    })
    .option('default', {
      default: false,
      describe: 'Use default configuration',
      type: 'boolean',
    })
    .help();
};

export const handler = async (argv: Arguments & InitOptions): Promise<void> => {
  try {
    const useJs = argv.js;
    const useDefault = argv.default;
    const { fileName, root } = await writeConfig(useJs, useDefault); // TODO: call this createConfig?
    console.log(`${fileName} created in ${root}`); // TODO: use @esmbly/output
  } catch (err) {
    console.log(err.message || err); // TODO: use @esmbly/output
  }
};
