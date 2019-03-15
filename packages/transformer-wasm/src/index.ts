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

  public constructor(options: WasmTransformerOptions) {
    super();
    // Set the config here
    // Use default config as fallback
  }

  public transform(trees: SyntaxTree[]): void {
    // Run AssemblyScript compiler here
    printer.print('..wasm transformer\n');
  }

  public createFiles(trees: SyntaxTree[], output: Output[]): File[] {
    // Override createFiles derived from abstract Transformer class
    return [];
  }
}

export default WasmTransformer;
