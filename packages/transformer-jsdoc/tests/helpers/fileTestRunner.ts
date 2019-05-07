import * as esmbly from '@esmbly/core';
import fs from 'fs';
import path from 'path';
import { File, FileType, Format } from '@esmbly/types';
import * as JSDocTransformer from '../../src';

export async function testRunner(
  root: string,
  options: JSDocTransformer.JSDocTransformerOptions = {},
): Promise<{ expected: string; results: File }> {
  const expectedPath = path.join(root, `output.ts`);
  const expected = fs.readFileSync(expectedPath, 'utf8');
  const filePath = path.join(root, `input.js`);
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
    transformers: [JSDocTransformer.createTransformer(options)],
  });
  return { expected, results };
}
