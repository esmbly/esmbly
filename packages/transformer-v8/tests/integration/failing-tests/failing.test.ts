import path from 'path';
import * as esmbly from '@esmbly/core';
import { setup } from '../../helpers/setup';

jest.setTimeout(10000);
jest.mock('@esmbly/printer');

const testDir = path.join(__dirname, '__fixtures__');

describe('integration: failing-tests', () => {
  it('handles failing tests', async () => {
    const testCommand = `jest ${testDir} --config ${testDir}/jest.config.js`;
    const { runConfig } = setup(testDir, testCommand);
    await expect(esmbly.run(runConfig)).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining(
          `Test command: ${testCommand} failed with error code 1`,
        ),
      }),
    );
  });
});
