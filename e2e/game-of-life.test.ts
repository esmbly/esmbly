import fs from 'fs';
import util from 'util';
import path from 'path';
import { testRunner } from './helpers/testRunner';

const readFile = util.promisify(fs.readFile);
const example = path.resolve(path.join('examples', 'game-of-life'));
const dist = path.join(example, 'dist');

describe('E2E: game-of-life', () => {
  beforeAll(async () => {
    await testRunner(example);
  });

  it('outputs a WebAssembly binary', async () => {
    const result = await readFile(path.join(dist, 'out.wasm'));
    expect(result).toBeTruthy();
    // Smoke test
  });

  it('outputs TypeScript files', async () => {
    const index = await readFile(path.join(dist, 'index.ts'), 'utf8');
    const config = await readFile(path.join(dist, 'config.ts'), 'utf8');
    expect(index).toMatchSnapshot();
    expect(config).toMatchSnapshot();
  });

  it('outputs AssemblyScript files', async () => {
    const index = await readFile(path.join(dist, 'index.as.ts'), 'utf8');
    const config = await readFile(path.join(dist, 'config.as.ts'), 'utf8');
    expect(index).toMatchSnapshot();
    expect(config).toMatchSnapshot();
  });
});
