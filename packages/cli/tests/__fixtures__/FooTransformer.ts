import { OutputFormat, SyntaxTree } from '@esmbly/types';
import { Transformer } from '@esmbly/core';

class MockTransformer extends Transformer {
  public static outputFormats: OutputFormat[] = [OutputFormat.WebAssembly];

  // @ts-ignore
  // eslint-disable-next-line
  public async transform(trees: SyntaxTree[]): Promise<void> {}
}

export default MockTransformer;
