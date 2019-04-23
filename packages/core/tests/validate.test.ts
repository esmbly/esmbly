import { Format, SyntaxTree, Transformer } from '@esmbly/types';
import { validateConfig, validateInputFormat } from '../src/validate';
import mockConfig from './__fixtures__/config';

describe('validateConfig', () => {
  it('throws an error if config object is missing', () => {
    expect(() => {
      validateConfig();
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no files are provided', () => {
    expect(() => {
      validateConfig({
        ...mockConfig,
        input: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no transformers are provided', () => {
    expect(() => {
      validateConfig({
        ...mockConfig,
        transformers: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no output formats are provided', () => {
    expect(() => {
      validateConfig({
        ...mockConfig,
        output: [],
      });
    }).toThrowErrorMatchingSnapshot();
  });

  it('does not throw an error when passed a correct config object', () => {
    expect(() => {
      validateConfig(mockConfig);
    }).not.toThrow();
  });
});

describe('validateInputFormat', () => {
  it('throws an error if any tree is in the wrong format', () => {
    const transformer: Transformer = {
      format: {
        files: [Format.WebAssembly],
        input: Format.TypeScript,
        output: Format.WebAssembly,
      },
    };
    const trees = [
      { format: Format.TypeScript },
      { format: Format.Flow },
    ] as SyntaxTree[];
    expect(() =>
      validateInputFormat(trees, transformer),
    ).toThrowErrorMatchingSnapshot();
  });

  it('does not throw an error if each tree is in the correct format', () => {
    const transformer: Transformer = {
      format: {
        files: [Format.WebAssembly],
        input: Format.TypeScript,
        output: Format.WebAssembly,
      },
    };
    const trees = [
      { format: Format.TypeScript },
      { format: Format.TypeScript },
    ] as SyntaxTree[];
    expect(() => validateInputFormat(trees, transformer)).not.toThrow();
  });

  it('does not throw an error if the transformer accepts any input format', () => {
    const transformer: Transformer = {
      format: {
        files: [Format.WebAssembly],
        input: Format.Any,
        output: Format.WebAssembly,
      },
    };
    const trees = [
      { format: Format.Flow },
      { format: Format.TypeScript },
    ] as SyntaxTree[];
    expect(() => validateInputFormat(trees, transformer)).not.toThrow();
  });
});
