import path from 'path';
import esmbly from '@esmbly/core';
import setup from '../../helpers/setup';

jest.setTimeout(10000);
jest.mock('@esmbly/printer');

const testDir = path.join(__dirname, '__fixtures__');
const nodeModules = path.resolve('packages/transformer-v8/node_modules/.bin');

describe('integration: prototype', () => {
  it('runs with jasmine', async () => {
    const testPath = `${testDir}/jasmine.test.js`;
    const testCommand = `${nodeModules}/jasmine ${testPath}`;
    const { expected, runConfig } = setup(testDir, testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });

  it('runs with jest', async () => {
    const testPath = `${testDir}/jest.test.js`;
    const testCommand = `jest ${testPath} --config ${testDir}/jest.config.js --no-cache`;
    const { expected, runConfig } = setup(testDir, testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });

  it('runs with tape', async () => {
    const testPath = `${testDir}/tape.test.js`;
    const testCommand = `${nodeModules}/tape ${testPath}`;
    const { expected, runConfig } = setup(testDir, testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });

  it.todo(
    'runs with mocha' /* , async () => {
    // TODO: Add support for mocha
    const testPath = `${testDir}/mocha.test.js`;
    const testCommand = `${nodeModules}/mocha ${testPath}`;
    const { expected, runConfig } = setup(testDir, testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  } */,
  );

  it.todo(
    'runs with node asserts' /* , async () => {
    // TODO: Add support for node asserts (require('assert'))
    const testPath = `${testDir}/assert.test.js`;
    const testCommand = `node ${testPath}`;
    const { expected, runConfig } = setup(testDir, testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  } */,
  );

  it.todo(
    'runs with ava' /* , async () => {
    // TODO: Add support for ava
    const testPath = `${testDir}/ava.test.js`;
    const testCommand = `${nodeModules}/ava ${testPath}`;
    const { expected, runConfig } = setup(testDir, testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  } */,
  );

  it.todo(
    'runs with tap' /* , async () => {
    // TODO: Add support for tap
    const testPath = `${testDir}/tap.test.js`;
    const testCommand = `${nodeModules}/tap ${testPath}`;
    const { expected, runConfig } = setup(testDir, testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  } */,
  );
});
