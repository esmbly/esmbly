import yargs, { Arguments } from 'yargs';
import * as init from './commands/init';
import * as run from './commands/run';

export function runCLI(): Arguments {
  return yargs
    .scriptName('esmbly')
    .command(init)
    .command(run)
    .help().argv;
}
