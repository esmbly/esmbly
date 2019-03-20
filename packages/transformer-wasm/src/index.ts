import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import { WasmTransformerOptions } from './types';
import compile from './compile';

export default (options: WasmTransformerOptions = {}): Transformer => {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): Promise<File[]> {
      return compile(trees, output, options);
    },
    inputFormat: Format.TypeScript,
    outputFormats: [Format.WebAssembly, Format.Wat, Format.Asm],
    parserPlugins: ['typescript'],
  };
};
