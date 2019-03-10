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
    expect(parser.parse).toHaveBeenCalledWith(mockConfig.files);
  });
  it('passes the ast to each transformer', async () => {
    // @ts-ignore
    parser.parse = jest.fn(() => mockAst);
    // @ts-ignore
    config.validateRunConfig = jest.fn();
    const transformerA = jest.fn(ast => Promise.resolve(ast));
    const transformerB = jest.fn(ast => Promise.resolve(ast));
    const runConfig = {
      ...mockConfig,
      transformers: [transformerA, transformerB],
    };
    // @ts-ignore
    await run(runConfig);
    expect(transformerA).toHaveBeenCalledTimes(1);
    expect(transformerA).toHaveBeenCalledWith(mockAst);
    expect(transformerB).toHaveBeenCalledTimes(1);
    expect(transformerB).toHaveBeenCalledWith(mockAst);
  });
  it('returns an array of files to be outputted', async () => {
    // @ts-ignore
    parser.parse = jest.fn(() => mockAst);
    // @ts-ignore
    config.validateRunConfig = jest.fn();
    const transformer = jest.fn(ast => Promise.resolve(ast));
    const runConfig = {
      files: ['fileA.js'],
      output: ['TypeScript'],
      transformers: [transformer],
    };
    // @ts-ignore
    const output = await run(runConfig);
    expect(output).toEqual(['mock-ts-file']);
  });
});
