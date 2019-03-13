import {
  AST,
  OutputFormat,
  Output,
  Transformer as TransformerInterface,
} from '@esmbly/types';

export abstract class Transformer implements TransformerInterface {
  public abstract readonly outputFormats: OutputFormat[];
  public abstract run(astArray: AST[]): AST[];
  public hasOutputFormat(output: Output[]): boolean {
    return output.some(
      (out: Output): boolean => {
        const format = typeof out === 'string' ? out : out.format;
        return this.outputFormats.includes(format as OutputFormat);
      },
    );
  }
}
