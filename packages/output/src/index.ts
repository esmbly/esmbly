type Callback = (error: Error | null | undefined) => void;
type Encoding = string | undefined;
type WriteFn = (
  chunk: string,
  encoding?: Encoding,
  callback?: Callback,
) => boolean;

class Output {
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

  public err(chunk: string, encoding?: Encoding, callback?: Callback): boolean {
    if (this.stderr) {
      return this.stderr.write(chunk, encoding, callback);
    }
    return false;
  }

  public out(chunk: string, encoding?: Encoding, callback?: Callback): boolean {
    if (this.stdout) {
      return this.stdout.write(chunk, encoding, callback);
    }
    return false;
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

export default new Output();
