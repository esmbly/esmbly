import { promises as fs } from 'fs';
import path from 'path';
import { Transformer } from '@esmbly/types';

export async function getTransformers(): Promise<string[]> {
  // TODO: Get this from npm instead / search in more places
  const packagesPath = path.resolve(__dirname, '../../');
  const packages = await fs.readdir(packagesPath);
  return packages.filter((pkg: string) => pkg.includes('transformer'));
}

export async function getOutputForTransformers(
  transformers: string[],
): Promise<string[]> {
  // TODO: Search in more places / handle errors
  let output: Set<string> = new Set();
  transformers.forEach((transformer: string) => {
    const packagePath = path.resolve(__dirname, '../../', transformer);
    const out = require(packagePath).output;
    out.forEach((o: string) => output.add(o));
  });
  return [...output];
}

export type TransformerConfig = string | [string, object];

export function requireTransformer(
  transformer: TransformerConfig,
): Transformer {
  let name;
  let config = {};
  if (Array.isArray(transformer)) {
    name = transformer[0];
    config = transformer[1];
  } else {
    name = transformer;
  }
  if (!name.includes('transformer-')) {
    name = 'transformer-' + name;
  }
  const packagePath = path.resolve(__dirname, '../../', name);
  const mod = require(packagePath); // eslint-disable-line
  return (...args) => mod.default(...args, config);
}
