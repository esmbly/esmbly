import fs from 'fs';
import util from 'util';
import path from 'path';
import { testRunner } from './helpers/testRunner';

const readFile = util.promisify(fs.readFile);
const example = path.resolve(path.join('examples', 'add-flow-to-wasm'));
const dist = path.join(example, 'dist');

describe('E2E: add-flow-to-wasm', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    await testRunner(example);
  });

  it('outputs a WebAssembly binary', async () => {
    const result = await readFile(path.join(dist, 'add.wasm'));
    // @ts-ignore
    const { instance } = await WebAssembly.instantiate(result, {});
    expect(instance.exports.add(2, 3)).toEqual(5);
  });

  it('outputs a TypeScript file', async () => {
    const result = await readFile(path.join(dist, 'add.ts'), 'utf8');
    expect(result).toMatchSnapshot();
  });

  it('outputs a AssemblyScript file', async () => {
    const result = await readFile(path.join(dist, 'add.as.ts'), 'utf8');
    expect(result).toMatchSnapshot();
  });
});
