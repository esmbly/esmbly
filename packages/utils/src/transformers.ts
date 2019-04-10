import { Format, Transformer, TransformerFactory } from '@esmbly/types';
import path from 'path';
import fs from './fs';

export async function getAvailableTransformers(): Promise<string[]> {
  // TODO: Search in more places or fetch from npm
  const searchPaths = [path.resolve(__dirname, '../../')];
  const searchResults = await Promise.all(
    searchPaths.map((searchPath: string) => fs.readdir(searchPath)),
  );
  const packages = ([] as string[]).concat(...searchResults);
  return packages.filter((pkg: string) => pkg.includes('transformer-'));
}

export async function getAvailableOutputFormats(
  transformers: string[],
  requirer: (requirePath: string) => unknown = require,
): Promise<string[]> {
  // TODO: Search in more places
  const outputFormats: Set<string> = new Set();
  transformers.forEach((transformer: string) => {
    try {
      const transformerPath = path.resolve(__dirname, '../../', transformer);
      const transformerModule = requirer(transformerPath) as TransformerFactory;
      const transformerFormats = transformerModule().outputFormats;
      transformerFormats.forEach((format: Format) => outputFormats.add(format));
    } catch {
      // Do nothing if a transformer can't be required or doesn't specify any output formats
    }
  });
  return [...outputFormats];
}

export function transformerFactory(
  transformer: string | Transformer,
  requirer: (requirePath: string) => unknown = require,
): Transformer {
  if (typeof transformer === 'string') {
    let name = transformer;
    if (!name.includes('transformer-')) {
      name = `transformer-${name}`;
    }
    const transformerPath = path.resolve(__dirname, '../../', name);
    const transformerModule = requirer(transformerPath) as TransformerFactory;
    return transformerModule();
  }
  return transformer;
}
