import path from 'path';
import * as esmbly from '@esmbly/core';
import { setup } from '../../helpers/setup';

jest.setTimeout(10000);
jest.mock('@esmbly/printer');

const testDir = path.join(__dirname, '__fixtures__');

describe('integration: custom-class', () => {
  it('handles custom classes', async () => {
    const testCommand = `jest ${testDir} --config ${testDir}/jest.config.js --runInBand`;
    const { expected, runConfig } = setup(testDir, testCommand);
    const [results] = await esmbly.run(runConfig);
    expect(results.content).toEqual(expected);
  });
});
