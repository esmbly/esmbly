import esmbly from '@esmbly/core';
import * as utils from '@esmbly/utils';
import * as run from '../../src/commands/run';
import * as config from '../../src/config';
import CommandRunner from '../__fixtures__/CommandRunner';

jest.mock('@esmbly/core');
jest.mock('@esmbly/utils');
jest.mock('../../src/config');

const command = new CommandRunner(run);

const setup = (): void => {
  (esmbly as any).run = jest.fn();
  (esmbly as any).run.mockResolvedValue(true);
  (config as any).readConfig = jest.fn();
  (config as any).readConfig.mockResolvedValue([
    {
      input: ['**/*.ts'],
      transformers: ['flow', 'wasm'],
      output: ['WebAssembly'],
    },
  ]);
  (utils as any).readFiles = jest.fn();
  (utils as any).readFiles.mockResolvedValue(['fileA.ts', 'fileB.ts']);
  (utils as any).transformerFactory = jest.fn();
  (utils as any).transformerFactory.mockReturnValue('transformer');
};

describe('Run', () => {
  it('exposes the correct command', () => {
    expect(run.command).toEqual('run');
  });
  it('exposes the correct description', () => {
    expect(run.describe).toEqual('Run esmbly');
  });
  it('exposes the correct help information', async () => {
    const output = await command.run('run --help');
    expect(output).toMatchSnapshot();
  });
  it('reads the config', async () => {
    setup();
    await command.run('run');
    expect(config.readConfig).toHaveBeenCalledTimes(1);
  });
  it('reads all files', async () => {
    setup();
    await command.run('run');
    expect(utils.readFiles).toHaveBeenCalledTimes(1);
    expect(utils.readFiles).toHaveBeenCalledWith(['**/*.ts']);
  });
  it.skip('requires all transformers', async () => {
    setup();
    await command.run('run');
    expect(utils.transformerFactory).toHaveBeenCalledTimes(2);
    expect(utils.transformerFactory).toHaveBeenCalledWith('flow');
    expect(utils.transformerFactory).toHaveBeenCalledWith('wasm');
  });
  it.skip('runs esmbly', async () => {
    setup();
    await command.run('run');
    expect(esmbly.run).toHaveBeenCalledTimes(1);
    expect(esmbly.run).toHaveBeenCalledWith({
      files: ['fileA.ts', 'fileB.ts'],
      transformers: ['flow', 'wasm'],
      output: ['WebAssembly'],
    });
  });
  it.todo('test output by mocking @esmbly/output');
  it.todo('test error output by mocking @esmbly/output');
});
