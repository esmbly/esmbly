import esmbly from '@esmbly/core';
import fs from 'fs';
import path from 'path';
import { FileType, OutputFormat } from '@esmbly/types';
import V8Transformer from '../dist';

jest.setTimeout(30000);

describe('v8 transformer', () => {
  it('runs the prototype example', async () => {
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
      transformers: [
        new V8Transformer({
          testCommand:
            'jest packages/transformer-v8/tests/__fixtures__/prototype --config packages/transformer-v8/tests/jest.config.js --no-cache --silent',
        }),
      ],
    });
    expect(results.content).toEqual(expected);
  });
});
