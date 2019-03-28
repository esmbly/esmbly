import esmbly from '@esmbly/core';
import fs from 'fs';
import path from 'path';
import { FileType, OutputFormat, RunConfig } from '@esmbly/types';
import printer from '@esmbly/printer';
import V8Transformer from '../dist';

jest.setTimeout(10000);
jest.mock('@esmbly/printer');

const expectedPath = path.join(__dirname, '__fixtures__/prototype/index.ts');
const expected = fs.readFileSync(expectedPath, 'utf8');
const testDir = path.resolve(
  'packages/transformer-v8/tests/__fixtures__/prototype',
);
const nodeModules = path.resolve('packages/transformer-v8/node_modules/.bin');

const setup = (testCommand: string, debug: boolean = false): RunConfig => {
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
    transformers: [new V8Transformer({ debug, testCommand })],
  };
};

describe('transformer-v8: prototype', () => {
  it('runs with jasmine', async () => {
    const testPath = `${testDir}/jasmine.test.js`;
    const testCommand = `${nodeModules}/jasmine ${testPath}`;
    const runConfig = setup(testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
  it('runs with jest', async () => {
    const testPath = `${testDir}/jest.test.js`;
    const testCommand = `jest ${testPath} --config ${testDir}/jest.config.js --no-cache`;
    const runConfig = setup(testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
  it('runs with mocha', async () => {
    const testPath = `${testDir}/mocha.test.js`;
    const testCommand = `${nodeModules}/mocha ${testPath}`;
    const runConfig = setup(testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
  it('runs with tape', async () => {
    const testPath = `${testDir}/tape.test.js`;
    const testCommand = `${nodeModules}/tape ${testPath}`;
    const runConfig = setup(testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
  it('runs with node asserts', async () => {
    const testPath = `${testDir}/assert.test.js`;
    const testCommand = `node ${testPath}`;
    const runConfig = setup(testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
  it('logs output when in debug mode', async () => {
    printer.print = jest.fn();
    const testPath = `${testDir}/jest.test.js`;
    const testCommand = `jest ${testPath} --config ${testDir}/jest.config.js --no-cache`;
    const runConfig = setup(testCommand, true);
    await esmbly.run(runConfig);
    const [callA, callB, callC] = (printer.print as jest.Mock).mock.calls;
    expect(callA[0]).toEqual(
      expect.stringContaining(`command: ${testCommand}`),
    );
    expect(callB[0]).toEqual(expect.stringContaining('stdout: '));
    expect(callC[0]).toEqual(expect.stringContaining('stderr: PASS'));
  });
  it('handles failing tests', async () => {
    const testPath = `${testDir}/failing.test.js`;
    const testCommand = `jest ${testPath} --config ${testDir}/jest.config.js --no-cache`;
    const runConfig = setup(testCommand);
    await expect(esmbly.run(runConfig)).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(
          `Test command: ${testCommand} failed with error code 1`,
        ),
      }),
    );
  });
});
