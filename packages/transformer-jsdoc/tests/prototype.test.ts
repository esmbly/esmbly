import esmbly from '@esmbly/core';
import fs from 'fs';
import path from 'path';
import { FileType, OutputFormat } from '@esmbly/types';
import JSDocTransformer from '../dist';

describe('transformer-jsdoc: prototype', () => {
  it('runs', async () => {
    const expectedPath = path.join(
      __dirname,
      '__fixtures__/prototype/index.ts',
    );
    const expected = fs.readFileSync(expectedPath, 'utf8');
    const file = path.join(__dirname, '__fixtures__/prototype/index.js');
    const content = fs.readFileSync(file, 'utf8');
    const { name, dir } = path.parse(file);
    const [results] = await esmbly.run({
      input: [
        {
          content,
          dir,
          name,
          type: FileType.JavaScript,
        },
      ],
      output: [{ format: OutputFormat.TypeScript }],
      transformers: [new JSDocTransformer()],
    });
    expect(results.content).toEqual(expected);
  });

  it('strips the comments if specified', async () => {
    const expectedPath = path.join(
      __dirname,
      '__fixtures__/prototype/index.stripped.ts',
    );
    const expected = fs.readFileSync(expectedPath, 'utf8');
    const file = path.join(__dirname, '__fixtures__/prototype/index.js');
    const content = fs.readFileSync(file, 'utf8');
    const { name, dir } = path.parse(file);
    const [results] = await esmbly.run({
      input: [
        {
          content,
          dir,
          name,
          type: FileType.JavaScript,
        },
      ],
      output: [{ format: OutputFormat.TypeScript }],
      transformers: [new JSDocTransformer({ stripComments: true })],
    });
    expect(results.content).toEqual(expected);
  });
});
