import * as init from '../../src/commands/init';
import * as config from '../../src/config';
import CommandRunner from '../__fixtures__/CommandRunner';

jest.mock('../../src/config');

const command = new CommandRunner(init);

const mockWriteConfig = (): void => {
  (config as any).writeConfig = jest.fn();
  (config as any).writeConfig.mockResolvedValue({
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
  it('calls writeConfig to create a config file', async () => {
    mockWriteConfig();
    await command.run('init');
    const [useJs, useDefault] = (config.writeConfig as any).mock.calls[0];
    expect(useJs).toEqual(false);
    expect(useDefault).toEqual(false);
    expect(config.writeConfig).toHaveBeenCalledTimes(1);
  });
  it('uses .js extension when passing the --js flag', async () => {
    mockWriteConfig();
    await command.run('init --js');
    const [useJs, useDefault] = (config.writeConfig as any).mock.calls[0];
    expect(useJs).toEqual(true);
    expect(useDefault).toEqual(false);
    expect(config.writeConfig).toHaveBeenCalledTimes(1);
  });
  it('uses default values when passing the --default flag', async () => {
    mockWriteConfig();
    await command.run('init --default');
    const [useJs, useDefault] = (config.writeConfig as any).mock.calls[0];
    expect(useJs).toEqual(false);
    expect(useDefault).toEqual(true);
    expect(config.writeConfig).toHaveBeenCalledTimes(1);
  });
  it.todo('test output by mocking @esmbly/output');
  it.todo('test error output by mocking @esmbly/output');
});
