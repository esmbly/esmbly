import esmbly from '@esmbly/core';
import fs from 'fs';
import path from 'path';
import { FileType, Format } from '@esmbly/types';
import WasmTransformer from '../src';

describe('transformer-wasm: prototype', () => {
  it('runs', async () => {
    const file = path.join(__dirname, '__fixtures__/prototype/index.ts');
    const content = fs.readFileSync(file, 'utf8');
    const { name, dir } = path.parse(file);
    const [results] = await esmbly.run({
      input: [
        {
          content,
          dir,
          name,
          type: FileType.TypeScript,
        },
      ],
      output: [
        { format: Format.WebAssembly },
        { format: Format.Wat },
        { format: Format.Asm },
      ],
      transformers: [WasmTransformer()],
    });
    // @ts-ignore
    const { instance } = await WebAssembly.instantiate(results.content, {});
    expect(instance.exports.add(2, 3)).toEqual(5);
  });
});
