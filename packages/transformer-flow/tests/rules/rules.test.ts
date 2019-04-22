import fs from 'fs';
import path from 'path';
import util from 'util';
import esmbly from '@esmbly/core';
import { FileType, Format } from '@esmbly/types';
import FlowTransformer from '../../src';

const readFile = util.promisify(fs.readFile);

const rules = fs
  .readdirSync(__dirname, { withFileTypes: true })
  .filter(dirEnt => dirEnt.isDirectory());

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
  test(rule.name, async () => {
    const input = await readFile(
      path.join(__dirname, rule.name, 'input.txt'),
      'utf8',
    );
    const expected = await readFile(
      path.join(__dirname, rule.name, 'output.txt'),
      'utf8',
    );
    const actual = await run(input);
    expect(actual).toEqual(expected);
  });
}
