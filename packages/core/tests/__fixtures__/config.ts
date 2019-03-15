import { OutputFormat, RunConfig, SyntaxTree } from '@esmbly/types';
import { Transformer } from '../../src';
import files from './files';

export class MockTransformer extends Transformer {
  public outputFormats: OutputFormat[] = [OutputFormat.WebAssembly];

  public static outputFormats: OutputFormat[] = [OutputFormat.WebAssembly];

  // @ts-ignore
  // eslint-disable-next-line
  public transform(trees: SyntaxTree[]): void {}
}

const config: RunConfig = {
  input: [...files],
  output: [{ format: OutputFormat.WebAssembly }],
  transformers: [new MockTransformer()],
};

export default config;
