import { AST, FileType, Transformer } from '@esmbly/types';

interface TransformerOptions {
  example: number;
}

class Flow implements Transformer {
  public static outputFormats: FileType[] = [FileType.TypeScript];

  public constructor(options: TransformerOptions) {
    console.log(options);
    // Set the config here
    // Use default config as fallback
  }

  public transform(astArray: AST[]): AST[] {
    console.log('..flow transformer');
    return astArray;
  }
}

export default Flow;
