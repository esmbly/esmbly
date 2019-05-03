export class CompileError extends Error {
  public stdout: string[];
  public stderr: string[];

  public constructor(stdout: string[], stderr: string[]) {
    super(stderr.join('\n'));
    this.stdout = stdout;
    this.stderr = stderr;
  }
}
