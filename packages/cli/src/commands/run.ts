import { Arguments, Argv } from 'yargs';
import esmbly from '@esmbly/core';
import { Config, Transformer } from '@esmbly/types';
import { outputFactory, readFiles, transformerFactory } from '@esmbly/utils';
import { readConfig } from '../config';

export interface RunOptions {
  config: string;
  silent: boolean;
  input: string[];
  transformers: string[];
  output: string[];
}

export const command = 'run';

export const describe = 'Run esmbly';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const builder = (yargs: Argv): Argv<any> => {
  return yargs
    .version(false)
    .option('config', {
      alias: 'c',
      describe: 'Configuration file path',
      type: 'string',
    })
    .option('silent', {
      default: false,
      describe: 'Silence output to the console',
      type: 'boolean',
    })
    .option('input', {
      alias: 'i',
      describe: 'The files you want to transform',
      type: 'array',
    })
    .option('transformers', {
      alias: 't',
      describe: 'The transformer you want to use',
      type: 'array',
    })
    .option('output', {
      alias: 'o',
      describe: 'The output formats you want to use',
      type: 'array',
    })
    .help();
};

export const handler = async (argv: Arguments & RunOptions): Promise<void> => {
  try {
    if (argv.silent) {
      // TODO: silence @esmbly/output
    }
    const config = await readConfig(argv.config);
    const results = await Promise.all(
      config.map(async (c: Config) => {
        const input = await readFiles(argv.input || c.input);
        const transformers = (argv.transformers || c.transformers).map(
          (transformer: string | Transformer) =>
            transformerFactory(transformer),
        );
        if (input.length < 1) {
          throw new Error(`Found 0 files matching pattern: ${c.input}`);
        }
        const output = (argv.output || c.output).map(outputFactory);
        return esmbly.run({ input, output, transformers });
      }),
    );
    console.log(results); // TODO: use @esmbly/output
  } catch (err) {
    console.log(err); // TODO: use @esmbly/output
  }
};
