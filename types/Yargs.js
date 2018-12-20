// @flow
export type Argv = {
  _: Array<string>,
  $0: string,
  [key: string]: mixed,
};

export type Options = $Shape<{
  alias: string | Array<string>,
  array: boolean,
  boolean: boolean,
  choices: Array<mixed>,
  coerce: (arg: mixed) => mixed,
  config: boolean,
  configParser: (configPath: string) => { [key: string]: mixed },
  conflicts: string | { [key: string]: string },
  count: boolean,
  default: mixed,
  defaultDescription: string,
  demandOption: boolean | string,
  desc: string,
  describe: string,
  description: string,
  global: boolean,
  group: string,
  implies: string | { [key: string]: string },
  nargs: number,
  normalize: boolean,
  number: boolean,
  requiresArg: boolean,
  skipValidation: boolean,
  string: boolean,
  type: 'array' | 'boolean' | 'count' | 'number' | 'string',
}>;

export type Option = {
  key: string,
  options: Options,
};

declare export class Yargs {
  (args: Array<string>): Yargs;
  argv: Argv;
  command(
    cmd: string | Array<string>,
    desc: string | false,
    builder?: { [key: string]: Options } | ((yargsInstance: Yargs) => mixed),
    handler?: Function,
  ): this;
  option(key: string, options?: Options): this;
  parse(
    args?: string | Array<string>,
    parseCallback?: (err: Error, argv: Argv, output?: string) => void,
  ): Argv;
  positional(key: string, options?: Options): this;
  version(): this;
  version(version: string): this;
  version(option: string | (() => string), version: string): this;
  version(
    option: string | (() => string),
    description: string | (() => string),
    version: string,
  ): this;
  wrap(columns: number | null): this;
}

export type Command = {
  cmd: string | Array<string>,
  desc: string,
  builder: (yargsInstance: Yargs) => mixed,
};
