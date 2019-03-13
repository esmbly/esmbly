import { validateRunConfig } from './config';
import parser from '@esmbly/parser';
import { RunConfig, File } from '@esmbly/types';

export default async function run({
  input,
  transformers,
  output,
}: RunConfig): Promise<File[]> {
  validateRunConfig({ input, transformers, output });
  const outputFiles = [];
  let astArray = parser.parse(input);
  for (const transformer of transformers) {
    astArray = await transformer.transform(astArray);
    for (const ast of astArray) {
      if (output.includes(ast.type)) {
        outputFiles.push(ast.toFile());
      }
    }
  }
  return outputFiles;
}
