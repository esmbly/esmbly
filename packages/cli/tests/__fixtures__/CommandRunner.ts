import yargs from 'yargs';

export default class CommandRunner {
  private parser: yargs.Argv;

  public constructor(commandModule: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.parser = yargs.command(commandModule as any);
  }

  public run(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.parser.parse(
        command,
        (err: Error, _: yargs.Argv, output: string) => {
          if (err) {
            return reject(err);
          }
          return resolve(output);
        },
      );
    });
  }
}
