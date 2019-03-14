import { promises as fs } from 'fs';
import path from 'path';
import { OutputFormat, Transformer } from '@esmbly/types';

export async function getTransformers(): Promise<string[]> {
  // TODO: Get this from npm instead / search in more places
  const searchPaths = [path.resolve(__dirname, '../../')];
  const searchResults = await Promise.all(
    searchPaths.map((searchPath: string) => fs.readdir(searchPath)),
  );
  const packages = ([] as string[]).concat(...searchResults);
  return packages.filter((pkg: string) => pkg.includes('transformer-'));
}

export async function getOutputFormats(
  transformers: string[],
  requirer: (requirePath: string) => unknown = require,
): Promise<string[]> {
  // TODO: Search in more places?
  let outputFormats: Set<string> = new Set();
  transformers.forEach((transformer: string) => {
    try {
      const transformerPath = path.resolve(__dirname, '../../', transformer);
      const transformerClass = requirer(transformerPath) as any;
      const transformerFormats = transformerClass.default.outputFormats;
      transformerFormats.forEach((format: OutputFormat) =>
        outputFormats.add(format.toString()),
      );
    } catch {
      // Do nothing if some transformer can't be required / doesn't specify any output formats
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
    const TransformerClass = requirer(transformerPath) as any;
    return new TransformerClass.default();
  }
  return transformer;
}
