import fs from 'fs';
import util from 'util';
import path from 'path';
import { testRunner } from './helpers/testRunner';

const readDir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const example = path.resolve(path.join('examples', 'lodash'));
const dist = path.join(example, 'dist');
const internals = path.join(dist, 'internal');

async function getFiles(dir: string): Promise<string[]> {
  const dirEntries = await readDir(dir);
  return dirEntries.filter((entry: string) =>
    fs.lstatSync(path.join(dir, entry)).isFile(),
  );
}

describe('E2E: lodash', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    await testRunner(example);
  });

  it('transforms all lodash methods to TypeScript', async () => {
    const files = await getFiles(dist);
    expect(files).toHaveLength(252);

    for (const file of files) {
      const content = await readFile(path.join(dist, file), 'utf8');
      expect(content).toMatchSnapshot(file);
    }
  });

  it('transforms all lodash internals to TypeScript', async () => {
    const files = await getFiles(internals);
    expect(files).toHaveLength(143);

    for (const file of files) {
      const content = await readFile(path.join(internals, file), 'utf8');
      expect(content).toMatchSnapshot(`internal/${file}`);
    }
  });

  it('transforms the clamp method to AssemblyScript', async () => {
    const content = await readFile(path.join(dist, 'clamp.as.ts'));
    expect(content).toMatchSnapshot();
  });

  it('transforms the clamp method to WebAssembly', async () => {
    const content = await readFile(path.join(dist, 'clamp.wasm'));
    // @ts-ignore
    const { instance } = await WebAssembly.instantiate(content, {});
    expect(instance.exports.clamp(-10, -5, 5)).toEqual(-5);
    expect(instance.exports.clamp(10, -5, 5)).toEqual(5);
  });
});
