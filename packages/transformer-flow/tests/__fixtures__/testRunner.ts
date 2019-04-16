import fs from 'fs';
import path from 'path';
import esmbly from '@esmbly/core';
import { File, FileType, Format } from '@esmbly/types';
import FlowTransformer, { FlowTransformerOptions } from '../../src';

export default async function run(
  testDir: string,
  options: FlowTransformerOptions = {},
): Promise<{ expected: string; results: File }> {
  const expectedPath = path.join(__dirname, `${testDir}/output.ts`);
  const expected = fs.readFileSync(expectedPath, 'utf8');
  const filePath = path.join(__dirname, `${testDir}/input.js`);
  const content = fs.readFileSync(filePath, 'utf8');
  const { name, dir } = path.parse(filePath);
  const [results] = await esmbly.run({
    input: [
      {
        content,
        dir,
        name,
        type: FileType.JavaScript,
      },
    ],
    output: [{ format: Format.TypeScript }],
    transformers: [FlowTransformer(options)],
  });
  return { expected, results };
}
