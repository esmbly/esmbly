import yargs from 'yargs';
import * as init from './commands/init';
import * as run from './commands/run';

export function runCLI(): yargs.Arguments {
  return yargs
    .scriptName('esmbly')
    .command(init)
    .command(run)
    .help().argv;
}
