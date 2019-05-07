import yargs from 'yargs';
import * as init from '../../src/commands/init';
import * as config from '../../src/config';
import { CommandRunner } from '../__fixtures__/CommandRunner';

jest.mock('@esmbly/printer');

const command = new CommandRunner(init);

function setup(): { createConfigSpy: jest.SpyInstance } {
  const createConfigSpy = jest.spyOn(config, 'createConfig');
  createConfigSpy.mockResolvedValue({
    fileName: 'file',
    root: 'root',
  });
  return { createConfigSpy };
}

describe('Init', () => {
  it('exposes the correct command', () => {
    expect(init.command).toEqual('init');
  });

  it('exposes the correct description', () => {
    expect(init.describe).toEqual('Create an esmbly configuration file');
  });

  it('exposes the correct help information', async () => {
    yargs.scriptName('esmbly');
    const output = await command.run('init --help');
    expect(output).toMatchSnapshot();
  });

  it('calls createConfig to create a config file', async () => {
    const { createConfigSpy } = setup();
    await command.run('init');
    const [options] = createConfigSpy.mock.calls[0];
    expect(options.default).toEqual(false);
    expect(options.force).toEqual(false);
    expect(createConfigSpy).toHaveBeenCalledTimes(1);
    createConfigSpy.mockRestore();
  });

  it('uses default values when passing the --default flag', async () => {
    const { createConfigSpy } = setup();
    await command.run('init --default');
    const [options] = createConfigSpy.mock.calls[0];
    expect(options.default).toEqual(true);
    expect(options.force).toEqual(false);
    expect(createConfigSpy).toHaveBeenCalledTimes(1);
    createConfigSpy.mockRestore();
  });

  it('overwrites any existing config when passing the --force flag', async () => {
    const { createConfigSpy } = setup();
    await command.run('init --force');
    const [options] = createConfigSpy.mock.calls[0];
    expect(options.default).toEqual(false);
    expect(options.force).toEqual(true);
    expect(createConfigSpy).toHaveBeenCalledTimes(1);
    createConfigSpy.mockRestore();
  });

  it.todo('test output by mocking @esmbly/output');

  it.todo('test error output by mocking @esmbly/output');
});
