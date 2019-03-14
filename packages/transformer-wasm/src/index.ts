import { SyntaxTree, OutputFormat, Output, File } from '@esmbly/types';
import { Transformer } from '@esmbly/core';

interface TransformerOptions {
  example: number;
}

class WasmTransformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.WebAssembly];

  public constructor(options: TransformerOptions) {
    super();
    console.log(options);
    // Set the config here
    // Use default config as fallback
  }

  public transform(trees: SyntaxTree[]): void {
    // Run AssemblyScript compiler here
    console.log(trees.length);
    console.log('..wasm transformer');
  }

  public createFiles(trees: SyntaxTree[], output: Output[]): File[] {
    // Override createFiles derived from abstract Transformer class
    console.log(trees.length);
    console.log(output.length);
    return [];
  }
}

export default WasmTransformer;
