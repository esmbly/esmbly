import { AST, FileType, Transformer } from '@esmbly/types';

interface TransformerOptions {
  example: number;
}

class V8 implements Transformer {
  public static outputFormats: FileType[] = [FileType.TypeScript];

  public constructor(options: TransformerOptions) {
    console.log(options);
    // Set the config here
    // Use default config as fallback
  }

  public transform(astArray: AST[]): AST[] {
    console.log('..v8 transformer');
    return astArray;
  }
}

export default V8;
