import * as esmbly from '@esmbly/core';
import path from 'path';
import { printer } from '@esmbly/printer';
import { setup } from '../../helpers/setup';

jest.setTimeout(10000);
jest.mock('@esmbly/printer');

const testDir = path.join(__dirname, '__fixtures__');

describe('integration: debug', () => {
  it('logs output when in debug mode', async () => {
    printer.print = jest.fn();
    const testCommand = `jest ${testDir} --config ${testDir}/jest.config.js --runInBand`;
    const { runConfig } = setup(testDir, testCommand, true);
    await esmbly.run(runConfig);
    const [callA, callB, callC] = (printer.print as jest.Mock).mock.calls;
    expect(callA[0]).toEqual(
      expect.stringContaining(`command: ${testCommand}`),
    );
    expect(callB[0]).toEqual(expect.stringContaining('stdout: '));
    expect(callC[0]).toEqual(expect.stringContaining('stderr: '));
  });
});
