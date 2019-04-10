import { File, Format, Output, SyntaxTree, Transformer } from '@esmbly/types';

export interface WasmTransformerOptions {
  example: number;
}

// TODO: Remove this once implemented
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: WasmTransformerOptions): Transformer => {
  return {
    // TODO: Remove this once implemented
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createFiles(trees: SyntaxTree[], output: Output[]): File[] {
      // Run AssemblyScript compiler here
      return [];
    },
    inputFormat: Format.TypeScript,
    outputFormats: [Format.WebAssembly, Format.Wat, Format.Asm],
    parserPlugins: ['typescript'],
  };
};
