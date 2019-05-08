import { Transformer } from '@esmbly/types';
import {
  getAvailableOutputFormats,
  getAvailableTransformers,
  transformerFactory,
} from '../src';

jest.mock('../src/fs');

describe('getAvailableTransformers', () => {
  it('resolves to an array of available transformers', async () => {
    expect(getAvailableTransformers()).toMatchSnapshot();
  });
});

describe('getAvailableOutputFormats', () => {
  it('resolves to an array of available output formats', async () => {
    const transformers = getAvailableTransformers();
    expect(getAvailableOutputFormats(transformers)).toMatchSnapshot();
  });
});

describe('transformerFactory', () => {
  it('returns a transformer instance if called with a string', async () => {
    const mockInstance = {};
    const requirer = jest.fn();
    requirer.mockReturnValue({ createTransformer: () => mockInstance });
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
    requirer.mockReturnValue({ createTransformer: () => mockInstance });
    await transformerFactory('wasm', requirer);
    expect(requirer).toHaveBeenCalledTimes(1);
    expect(requirer).toHaveBeenCalledWith(
      expect.stringContaining('transformer-wasm'),
    );
  });
});
