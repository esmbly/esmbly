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
    astArray = await transformer.run(astArray);
    for (const ast of astArray) {
      if (transformer.hasOutputFormat(output)) {
        outputFiles.push(ast.toFile());
      }
    }
  }
  return outputFiles;
}
