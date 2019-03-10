import { validateRunConfig } from '../src/config';
import * as mockConfig from './__fixtures__/config';
import { FileType } from '@esmbly/types';

describe('validateRunConfigRunConfig', () => {
  it('throws an error if config object is missing', () => {
    expect(() => {
      // @ts-ignore
      validateRunConfig();
    }).toThrowErrorMatchingSnapshot();
  });
  it('throws an error if no files are provided', () => {
    expect(() => {
      // @ts-ignore
      validateRunConfig({
        ...mockConfig,
        files: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });
  it('throws an error if no transformers are provided', () => {
    expect(() => {
      // @ts-ignore
      validateRunConfig({
        ...mockConfig,
        transformers: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });
  it('throws an error if no output formats are provided', () => {
    expect(() => {
      // @ts-ignore
      validateRunConfig({
        ...mockConfig,
        output: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });
  it('throws an error if a transformer is not a function', () => {
    expect(() => {
      // @ts-ignore
      validateRunConfig({
        ...mockConfig,
        transformers: [{} as any],
      });
    }).toThrowErrorMatchingSnapshot();
  });
  it('throws an error if a output format is not supported', () => {
    expect(() => {
      // @ts-ignore
      validateRunConfig({
        ...mockConfig,
        output: ['Unknown type' as FileType],
      });
    }).toThrowErrorMatchingSnapshot();
  });
});
