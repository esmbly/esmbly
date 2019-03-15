import { File, Output, OutputFormat, SyntaxTree } from '@esmbly/types';
import { Transformer } from '@esmbly/core';
import printer from '@esmbly/printer';

export interface WasmTransformerOptions {
  example: number;
}

class WasmTransformer extends Transformer {
  public static outputFormats: OutputFormat[] = [
    OutputFormat.WebAssembly,
    OutputFormat.Wat,
    OutputFormat.Asm,
  ];

  // TODO: Remove this once implemented
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public constructor(options: WasmTransformerOptions) {
    super();
    // Set the config here
    // Use default config as fallback
  }

  // TODO: Remove this once implemented
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public transform(trees: SyntaxTree[]): void {
    // Run AssemblyScript compiler here
    printer.print('..wasm transformer\n');
  }

  // TODO: Remove this once implemented
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public createFiles(trees: SyntaxTree[], output: Output[]): File[] {
    // Override createFiles derived from abstract Transformer class
    return [];
  }
}

export default WasmTransformer;
