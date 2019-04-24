import path from 'path';
import esmbly from '@esmbly/core';
import setup from '../helpers/setup';

jest.setTimeout(10000);
jest.mock('@esmbly/printer');

const testDir = path.join(__dirname, '__fixtures__/FunctionDeclaration');

describe('rule: FunctionDeclaration', () => {
  it('correctly transforms a function declaration to TypeScript', async () => {
    const testCommand = `jest ${testDir} --config ${testDir}/jest.config.js`;
    const { runConfig, expected } = setup(testDir, testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
});
