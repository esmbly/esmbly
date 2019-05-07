import { Warning } from '@esmbly/types';
import chalk from 'chalk';
import { Callback, Encoding, WriteFn } from './types';
import * as templates from './templates';

class Printer {
  private stdout: NodeJS.WriteStream | null;
  private stderr: NodeJS.WriteStream | null;

  public constructor() {
    this.stdout = process ? process.stdout : null;
    this.stderr = process ? process.stderr : null;
  }

  public get isTTY(): boolean {
    if (this.stdout) {
      return this.stdout.isTTY === true;
    }

    return false;
  }

  public error(
    chunk: string,
    encoding?: Encoding,
    callback?: Callback,
  ): boolean {
    if (this.stderr) {
      return this.stderr.write(chunk, encoding, callback);
    }

    return false;
  }

  public print(
    chunk: string,
    encoding?: Encoding,
    callback?: Callback,
  ): boolean {
    if (this.stdout) {
      return this.stdout.write(chunk, encoding, callback);
    }

    return false;
  }

  public printWarnings(warnings: Warning[]): void {
    if (this.stdout) {
      warnings.forEach((warning: Warning) => {
        this.print(templates.warning(warning));
      });
    }
  }

  public forceEnableColors(): void {
    chalk.enabled = true;
  }

  public forceDisableColors(): void {
    chalk.enabled = false;
  }

  public clearLine(...args: WriteFn[]): void {
    if (this.isTTY) {
      args.forEach(fn => fn.call(this, '\x1b[999D\x1b[K'));
    }
  }

  public setErrorStream(
    stream: NodeJS.WriteStream | NodeJS.WritableStream | null,
  ): void {
    this.stderr = stream as NodeJS.WriteStream;
  }

  public setOutStream(
    stream: NodeJS.WriteStream | NodeJS.WritableStream | null,
  ): void {
    this.stdout = stream as NodeJS.WriteStream;
  }
}

export const printer = new Printer();
export { templates };
