import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';
import createFiles from './createFiles';
import transform from './transform';

// eslint-disable-next-line
export const loader = require('assemblyscript/lib/loader');

export interface WasmTransformerOptions {
  optimize?: string;
  optimizeLevel?: number;
  shrinkLevel?: number;
  validate?: boolean;
  use?: string[];
  memory?: {
    import: boolean;
    export: boolean;
    allocator: string;
  };
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
    transform(trees: SyntaxTree[]): void {
      return transform(trees, options);
    },
  };
};
