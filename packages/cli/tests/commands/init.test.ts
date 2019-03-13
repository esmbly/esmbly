import * as init from '../../src/commands/init';
import * as config from '../../src/config';
import CommandRunner from '../__fixtures__/CommandRunner';

jest.mock('../../src/config');

const command = new CommandRunner(init);

const mockCreateConfig = (): void => {
  (config as any).createConfig = jest.fn();
  (config as any).createConfig.mockResolvedValue({
    fileName: 'file',
    root: 'root',
  });
};

describe('Init', () => {
  it('exposes the correct command', () => {
    expect(init.command).toEqual('init');
  });
  it('exposes the correct description', () => {
    expect(init.describe).toEqual('Create an esmbly configuration file');
  });
  it('exposes the correct help information', async () => {
    const output = await command.run('init --help');
    expect(output).toMatchSnapshot();
  });
  it('calls createConfig to create a config file', async () => {
    mockCreateConfig();
    await command.run('init');
    const [options] = (config.createConfig as any).mock.calls[0];
    expect(options.default).toEqual(false);
    expect(options.force).toEqual(false);
    expect(config.createConfig).toHaveBeenCalledTimes(1);
  });
  it('uses default values when passing the --default flag', async () => {
    mockCreateConfig();
    await command.run('init --default');
    const [options] = (config.createConfig as any).mock.calls[0];
    expect(options.default).toEqual(true);
    expect(config.createConfig).toHaveBeenCalledTimes(1);
  });
  it('overwrites any existing config when passing the --force flag', async () => {
    mockCreateConfig();
    await command.run('init --force');
    const [options] = (config.createConfig as any).mock.calls[0];
    expect(options.force).toEqual(true);
    expect(config.createConfig).toHaveBeenCalledTimes(1);
  });
  it.todo('test output by mocking @esmbly/output');
  it.todo('test error output by mocking @esmbly/output');
});
