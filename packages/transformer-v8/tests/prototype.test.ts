import esmbly from '@esmbly/core';
import fs from 'fs';
import path from 'path';
import { FileType, OutputFormat, RunConfig } from '@esmbly/types';
import V8Transformer from '../dist';

jest.setTimeout(30000);

const expectedPath = path.join(__dirname, '__fixtures__/prototype/index.ts');
const expected = fs.readFileSync(expectedPath, 'utf8');
const testDir = 'packages/transformer-v8/tests/__fixtures__/prototype';
const nodeModules = 'packages/transformer-v8/node_modules/.bin';

const setup = (testCommand: string): RunConfig => {
  const file = path.join(__dirname, '__fixtures__/prototype/index.js');
  const content = fs.readFileSync(file, 'utf8');
  const { name, dir } = path.parse(file);
  return {
    input: [
      {
        content,
        dir,
        name,
        type: FileType.JavaScript,
      },
    ],
    output: [{ format: OutputFormat.TypeScript }],
    transformers: [new V8Transformer({ testCommand })],
  };
};

describe('transformer-v8: prototype', () => {
  it('runs with jasmine', async () => {
    const testPath = `${testDir}/jasmine.test.js`;
    const testCommand = `./${nodeModules}/jasmine ${testPath}`;
    const runConfig = setup(testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
  // eslint-disable-next-line
  it.only('runs with jest', async () => {
    const testPath = `${testDir}/jest.test.js`;
    const testCommand = `jest ${testPath} --config ${testDir}/jest.config.js --no-cache`;
    const runConfig = setup(testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
  it('runs with mocha', async () => {
    const testPath = `${testDir}/mocha.test.js`;
    const testCommand = `./${nodeModules}/mocha ${testPath}`;
    const runConfig = setup(testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
  it('runs with tape', async () => {
    const testPath = `${testDir}/tape.test.js`;
    const testCommand = `./${nodeModules}/tape ${testPath}`;
    const runConfig = setup(testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
});
