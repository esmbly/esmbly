import { validateRunConfig } from './config';
import parser from '@esmbly/parser';
import { RunConfig, File } from '@esmbly/types';

export default async function run({
  files,
  transformers,
  output,
}: RunConfig): Promise<File[]> {
  validateRunConfig({ files, transformers, output });
  const outputFiles = [];
  let astArray = parser.parse(files);
  for (const transformer of transformers) {
    astArray = await transformer(astArray);
    for (const ast of astArray) {
      if (output.includes(ast.type)) {
        outputFiles.push(ast.toFile());
      }
    }
  }
  return outputFiles;
}
