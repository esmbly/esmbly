import {
  File,
  Format,
  Output,
  SyntaxTree,
  Transformer,
  TransformerOptions,
} from '@esmbly/types';
import assemblyscriptLoader from 'assemblyscript/lib/loader';
import { createFiles } from './createFiles';
import { transform } from './transform';

export const loader = assemblyscriptLoader;

export interface WasmTransformerOptions extends TransformerOptions {
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

export function createTransformer(
  options: WasmTransformerOptions = {},
): Transformer {
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
}
