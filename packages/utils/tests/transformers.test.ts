import { Transformer } from '@esmbly/types';
import {
  getAvailableOutputFormats,
  getAvailableTransformers,
  transformerFactory,
} from '../src';
import fs from '../src/fs';

jest.mock('../src/fs');

describe('getAvailableTransformers', () => {
  it('resolves to an array of available transformers', async () => {
    (fs.readdir as jest.Mock).mockResolvedValue([
      'package-a',
      'package-b',
      'transformer-c',
    ]);
    const transformers = await getAvailableTransformers();
    expect(transformers).toEqual(['transformer-c']);
  });
});

describe('getAvailableOutputFormats', () => {
  it('resolves to an array of available output formats', async () => {
    const requirer = jest.fn();
    requirer.mockReturnValue(() => ({
      format: { files: ['TypeScript', 'WebAssembly'] },
      transform: jest.fn(),
    }));
    const formats = await getAvailableOutputFormats(
      ['transformer-flow', 'transformer-wasm'],
      requirer,
    );
    expect(requirer).toHaveBeenCalledTimes(2);
    expect(formats).toEqual(['TypeScript', 'WebAssembly']);
  });

  it('silently deals with errors', async () => {
    const requirer = jest.fn();
    const formats = await getAvailableOutputFormats(
      ['transformer-flow', 'transformer-wasm'],
      requirer,
    );
    expect(requirer).toHaveBeenCalledTimes(2);
    expect(formats).toEqual([]);
  });
});

describe('transformerFactory', () => {
  it('returns a transformer instance if called with a string', async () => {
    const mockInstance = {};
    const requirer = jest.fn();
    requirer.mockReturnValue(() => mockInstance);
    const transformer = await transformerFactory('transformer-wasm', requirer);
    expect(transformer).toEqual(mockInstance);
    expect(requirer).toHaveBeenCalledTimes(1);
  });

  it('returns the instance if called with a transformer instance', async () => {
    const mockInstance = {};
    const requirer = jest.fn();
    const transformer = await transformerFactory(
      (mockInstance as unknown) as Transformer,
      requirer,
    );
    expect(transformer).toEqual(mockInstance);
    expect(requirer).not.toHaveBeenCalled();
  });

  it('automatically prepends the transformer- prefix if not present', async () => {
    const mockInstance = {};
    const requirer = jest.fn();
    requirer.mockReturnValue(() => mockInstance);
    await transformerFactory('wasm', requirer);
    expect(requirer).toHaveBeenCalledTimes(1);
    expect(requirer).toHaveBeenCalledWith(
      expect.stringContaining('transformer-wasm'),
    );
  });
});
