import fs from 'fs';
import util from 'util';
import path from 'path';
import cp from 'child_process';

jest.setTimeout(10000);

const exec = util.promisify(cp.exec);
const readFile = util.promisify(fs.readFile);
const example = path.resolve(path.join('examples', 'add-jsdoc-to-wasm'));
const dist = path.join(example, 'dist');

describe('E2E: add-jsdoc-to-wasm', () => {
  beforeAll(async () => {
    const { stderr } = await exec(`yarn run esmbly run`, {
      cwd: example,
    });
    if (stderr) {
      // eslint-disable-next-line no-console
      console.log(stderr);
    }
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
