import { Format, SyntaxTree, Transformer } from '@esmbly/types';
import printer from '@esmbly/printer';
import traverse from './traverse';

export interface FlowTransformerOptions {
  example: number;
}

// TODO: Remove this once implemented
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options: FlowTransformerOptions): Transformer => {
  return {
    inputFormat: Format.Flow,
    outputFormats: [Format.TypeScript],
    parserPlugins: ['flow', 'flowComments'],
    transform(trees: SyntaxTree[]): void {
      printer.print('..flow transformer\n');
      trees.forEach(traverse);
    },
  };
};
