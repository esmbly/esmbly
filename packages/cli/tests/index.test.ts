import yargs from 'yargs';
import { runCLI } from '../';

jest.mock('yargs');
jest.mock('../src/commands/init');
jest.mock('../src/commands/run');

const setup = (): void => {
  yargs.scriptName = jest.fn();
  yargs.command = jest.fn();
  yargs.help = jest.fn();
  (yargs.scriptName as any).mockReturnThis(yargs);
  (yargs.command as any).mockReturnThis(yargs);
  (yargs.help as any).mockReturnThis(yargs);
};

describe('CLI', () => {
  beforeEach(() => {
    setup();
  });
  it('sets the script name', () => {
    runCLI();
    expect(yargs.scriptName).toHaveBeenCalledTimes(1);
    expect(yargs.scriptName).toHaveBeenCalledWith('esmbly');
  });
  it.todo('adds the correct commands');
  it('adds help', () => {
    runCLI();
    expect(yargs.help).toHaveBeenCalledTimes(1);
  });
});
