import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import createFiles from './createFiles';
import transform from './transform';

export interface WasmTransformerOptions {
  optimize?: string;
  optimizeLevel?: number;
  shrinkLevel?: number;
  validate?: boolean;
  // TODO: ADD more options
}

export default (options: WasmTransformerOptions = {}): Transformer => {
  return {
    createFiles(trees: SyntaxTree[], output: Output[]): Promise<File[]> {
      return createFiles(trees, output, options);
    },
    format: {
      files: [
        Format.WebAssembly,
        Format.Wat,
        Format.Asm,
        Format.AssemblyScript,
      ],
      input: Format.TypeScript,
      output: Format.AssemblyScript,
    },
    name: 'WebAssembly',
    parserPlugins: ['typescript'],
    transform,
  };
};
