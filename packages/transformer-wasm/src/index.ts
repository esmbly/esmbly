import { AST, FileType, Transformer } from '@esmbly/types';

interface TransformerOptions {
  example: number;
}

class Wasm implements Transformer {
  public static outputFormats: FileType[] = [FileType.WebAssembly];

  public constructor(options: TransformerOptions) {
    console.log(options);
    // Set the config here
    // Use default config as fallback
  }

  public transform(astArray: AST[]): AST[] {
    console.log('..wasm transformer');
    return astArray;
  }
}

export default Wasm;
