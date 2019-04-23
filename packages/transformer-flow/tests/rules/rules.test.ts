import fs from 'fs';
import path from 'path';
import util from 'util';
import esmbly from '@esmbly/core';
import { FileType, Format } from '@esmbly/types';
import FlowTransformer from '../../src';

const readFile = util.promisify(fs.readFile);

const rules = fs
  .readdirSync(__dirname)
  .filter(p => fs.statSync(path.join(__dirname, p)).isDirectory());

const run = async (content: string): Promise<string> => {
  const [results] = await esmbly.run({
    input: [
      {
        content,
        dir: '',
        name: 'input',
        type: FileType.JavaScript,
      },
    ],
    output: [{ format: Format.TypeScript }],
    transformers: [FlowTransformer({})],
  });
  return results.content.toString();
};

for (const rule of rules) {
  test(rule, async () => {
    const input = await readFile(
      path.join(__dirname, rule, 'input.txt'),
      'utf8',
    );
    const expected = await readFile(
      path.join(__dirname, rule, 'output.txt'),
      'utf8',
    );
    const actual = await run(input);
    expect(actual).toEqual(expected);
  });
}
