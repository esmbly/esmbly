import yargs from 'yargs';
import { runCLI } from '..';

describe('CLI', () => {
  const setup = (): {
    scriptNameSpy: jest.SpyInstance;
    commandSpy: jest.SpyInstance;
    helpSpy: jest.SpyInstance;
    tearDown: () => void;
  } => {
    const scriptNameSpy = jest.spyOn(yargs, 'scriptName');
    const commandSpy = jest.spyOn(yargs, 'command');
    const helpSpy = jest.spyOn(yargs, 'help');
    scriptNameSpy.mockReturnThis();
    commandSpy.mockReturnThis();
    helpSpy.mockReturnThis();
    return {
      commandSpy,
      helpSpy,
      scriptNameSpy,
      tearDown: (): void => {
        scriptNameSpy.mockRestore();
        commandSpy.mockRestore();
        helpSpy.mockRestore();
      },
    };
  };

  it('sets the script name', () => {
    const { scriptNameSpy, tearDown } = setup();
    runCLI();
    expect(scriptNameSpy).toHaveBeenCalledTimes(1);
    expect(scriptNameSpy).toHaveBeenCalledWith('esmbly');
    tearDown();
  });

  it('adds the correct commands', () => {
    const { commandSpy, tearDown } = setup();
    runCLI();
    const commandA = commandSpy.mock.calls[0][0];
    const commandB = commandSpy.mock.calls[1][0];
    expect(commandSpy).toHaveBeenCalledTimes(2);
    expect(commandA.command).toEqual('init');
    expect(commandB.command).toEqual('run');
    tearDown();
  });

  it('adds help', () => {
    const { helpSpy, tearDown } = setup();
    runCLI();
    expect(helpSpy).toHaveBeenCalledTimes(1);
    tearDown();
  });
});
