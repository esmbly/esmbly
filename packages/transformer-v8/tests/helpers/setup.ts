import fs from 'fs';
import path from 'path';
import { FileType, Format, RunConfig } from '@esmbly/types';
import * as V8Transformer from '../../src';

export function setup(
  fixture: string,
  testCommand: string,
  debug: boolean = false,
): {
  runConfig: RunConfig;
  expected?: string;
} {
  // Input
  const filePath = path.join(fixture, 'index.js');
  const content = fs.readFileSync(filePath, 'utf8');
  const { name, dir } = path.parse(filePath);

  // Expected output
  const expectedPath = path.join(fixture, 'index.ts');
  let expected: string | undefined;

  if (fs.existsSync(expectedPath)) {
    expected = fs.readFileSync(expectedPath, 'utf8');
  }

  const runConfig = {
    input: [
      {
        content,
        dir,
        name,
        type: FileType.JavaScript,
      },
    ],
    output: [{ format: Format.TypeScript }],
    transformers: [V8Transformer.createTransformer({ debug, testCommand })],
  };

  return { expected, runConfig };
}
