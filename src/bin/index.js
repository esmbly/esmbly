// @flow
import type { Yargs, Argv } from 'types/Yargs';

import cli from 'yargs';
import run from '..';

export default function runCLI(rawArgv: Array<string>): Yargs {
  return cli
    .scriptName('flowasm')
    .usage('$0 <input> [args]')
    .strict()
    .command(
      '$0 <input>',
      'Compile flow-typed js -> wasm',
      (yargs: Yargs) => {
        yargs.positional('input', {
          type: 'string',
          describe: 'Input file',
        });
        yargs.option('output', {
          alias: 'o',
          type: 'string',
          describe: 'Output file',
        });
        yargs.option('wast', {
          type: 'boolean',
          default: false,
        });
      },
      (argv: Argv) => run(argv),
    )
    .help()
    .parse(rawArgv.slice(2));
}

if (process.env.NODE_ENV !== 'test') {
  runCLI(process.argv);
}
