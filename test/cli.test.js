import runCLI from '../src/bin';
import run from '../src';

jest.mock('../src/index.js');

describe('Tests for CLI', () => {
  beforeAll(() => {
    run.mockImplementation(() => {});
  });
  it('parses the input argument', async () => {
    const argv = runCLI(['', '', 'file.js']);
    expect(argv.input).toEqual('file.js');
    expect(argv.wast).toEqual(false);
  });
  it('handles the --output flag', async () => {
    const argvA = runCLI(['', '', 'file.js', '--output', 'file.wasm']);
    const argvB = runCLI(['', '', 'file.js', '-o', 'file.wasm']);
    expect(argvA.output).toEqual('file.wasm');
    expect(argvB.output).toEqual('file.wasm');
  });
  it('handles the --wast flag', async () => {
    const argv = runCLI(['', '', 'file.js', '--wast']);
    expect(argv.wast).toEqual(true);
  });
});
