import { FileType } from '@esmbly/types';
import { getPluginsForFileType } from '../src/plugins';

describe('getPluginsForFileType', () => {
  it('returns the correct plugins for JavaScript files', () => {
    const plugins = getPluginsForFileType(FileType.JavaScript);
    expect(plugins).toEqual(['flow', 'flowComments']);
  });

  it('returns the correct plugins for TypeScript files', () => {
    const plugins = getPluginsForFileType(FileType.TypeScript);
    expect(plugins).toEqual(['typescript']);
  });

  it('throws an error for file types that are not yet supported', () => {
    expect(() => {
      getPluginsForFileType(FileType.WebAssembly);
    }).toThrowErrorMatchingSnapshot();
  });
});
