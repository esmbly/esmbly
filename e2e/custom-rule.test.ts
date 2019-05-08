import fs from 'fs';
import util from 'util';
import path from 'path';
import { testRunner } from './helpers/testRunner';

const readFile = util.promisify(fs.readFile);
const example = path.resolve(path.join('examples', 'custom-rule'));
const dist = path.join(example, 'dist');

describe('E2E: custom-rule', () => {
  let stdout: string;

  beforeAll(async () => {
    jest.setTimeout(10000);
    stdout = await testRunner(example);
  });

  it('adds two numbers', () => {
    // @ts-ignore
    // eslint-disable-next-line
    const add = require('../examples/custom-rule');
    expect(add(1, 2)).toEqual(3);
    expect(add(2, 3)).toEqual(5);
  });

  it('uses the custom rule to produce a WebAssembly binary', async () => {
    const result = await readFile(path.join(dist, 'add.wasm'));
    // @ts-ignore
    const { instance } = await WebAssembly.instantiate(result, {});
    expect(instance.exports.add(3, 4)).toEqual(7);
  });

  it('uses the custom rule to produce a TypeScript file', async () => {
    const result = await readFile(path.join(dist, 'add.ts'), 'utf8');
    expect(result).toMatchSnapshot();
  });

  it('produces a warning from the custom rule', () => {
    // @ts-ignore
    // eslint-disable-next-line
    const [_, ...warning] = stdout.split('\n');
    expect(warning.join('\n')).toMatchSnapshot();
  });
});
