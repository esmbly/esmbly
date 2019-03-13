import fs from 'fs';
import {
  getTransformers,
  getOutputFormats,
  transformerFactory,
} from '../src/transformers';

jest.mock('fs');

describe('getTransformers', () => {
  it('resolves to an array of transformer names', async () => {
    (fs as any).promises = { readdir: jest.fn() };
    (fs.promises.readdir as any).mockReturnValue([
      'package-a',
      'package-b',
      'transformer-c',
    ]);
    const transformers = await getTransformers();
    expect(transformers).toEqual(['transformer-c']);
  });
});

describe('getOutputFormats', () => {
  it('resolves to an array of supported output formats', async () => {
    const requirer = jest.fn();
    requirer.mockReturnValue({
      default: {
        outputFormats: ['TypeScript', 'WebAssembly'],
      },
    });
    const formats = await getOutputFormats(
      ['transformer-flow', 'transformer-wasm'],
      requirer,
    );
    expect(formats).toEqual(['TypeScript', 'WebAssembly']);
  });
});

describe('transformerFactory', () => {
  it('returns a transformer instance if called with a string', async () => {
    const requirer = jest.fn();
    const mockInstance = {
      outputFormats: ['WebAssembly'],
      transform: jest.fn(),
    };
    requirer.mockReturnValue({
      default: jest.fn(() => mockInstance),
    });
    const transformer = await transformerFactory('transformer-wasm', requirer);
    expect(transformer).toEqual(mockInstance);
  });
  it('returns the instance if called with a transformer instance', async () => {
    const requirer = jest.fn();
    const mockInstance = {
      outputFormats: ['WebAssembly'],
      transform: jest.fn(),
    };
    const transformer = await transformerFactory(mockInstance, requirer);
    expect(transformer).toEqual(mockInstance);
    expect(requirer).not.toHaveBeenCalled();
  });
});
