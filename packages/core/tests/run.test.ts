import run from '../src/run';
import parser from '@esmbly/parser';
import mockAst from './__fixtures__/ast';
import * as mockConfig from './__fixtures__/config';
import * as config from '../src/config';

jest.mock('../src/config');
jest.mock('@esmbly/parser');

describe('run', () => {
  it('validates the provided config', async () => {
    // @ts-ignore
    parser.parse = jest.fn(() => mockAst);
    // @ts-ignore
    config.validateRunConfig = jest.fn();
    // @ts-ignore
    await run(mockConfig);
    expect(config.validateRunConfig).toHaveBeenCalledTimes(1);
    expect(config.validateRunConfig).toHaveBeenCalledWith(mockConfig);
  });
  it('parses the provided files', async () => {
    // @ts-ignore
    parser.parse = jest.fn(() => mockAst);
    // @ts-ignore
    config.validateRunConfig = jest.fn();
    // @ts-ignore
    await run(mockConfig);
    expect(parser.parse).toHaveBeenCalledTimes(1);
    expect(parser.parse).toHaveBeenCalledWith(mockConfig.input);
  });
  it('passes the ast to each transformer', async () => {
    // @ts-ignore
    parser.parse = jest.fn(() => mockAst);
    // @ts-ignore
    config.validateRunConfig = jest.fn();
    const transformerA = {
      transform: jest.fn(ast => Promise.resolve(ast)),
      createFiles: jest.fn(() => []),
    };
    const transformerB = {
      transform: jest.fn(ast => Promise.resolve(ast)),
      createFiles: jest.fn(() => []),
    };
    const runConfig = {
      ...mockConfig,
      transformers: [transformerA, transformerB],
    };
    // @ts-ignore
    await run(runConfig);
    expect(transformerA.transform).toHaveBeenCalledTimes(1);
    expect(transformerA.transform).toHaveBeenCalledWith(mockAst);
    expect(transformerB.transform).toHaveBeenCalledTimes(1);
    expect(transformerB.transform).toHaveBeenCalledWith(mockAst);
  });
  it('returns an array of files to be outputted', async () => {
    // @ts-ignore
    parser.parse = jest.fn(() => mockAst);
    // @ts-ignore
    config.validateRunConfig = jest.fn();
    const transformer = {
      transform: jest.fn(ast => Promise.resolve(ast)),
      createFiles: jest.fn(() => ['mock-js-file-a', 'mock-js-file-b']),
    };
    const runConfig = {
      files: ['fileA.js'],
      output: ['TypeScript'],
      transformers: [transformer],
    };
    // @ts-ignore
    const output = await run(runConfig);
    expect(output).toEqual(['mock-js-file-a', 'mock-js-file-b']);
  });
});
