import fs from 'fs';
import util from 'util';
import path from 'path';
import { testRunner } from './helpers/testRunner';

const readFile = util.promisify(fs.readFile);
const example = path.resolve(path.join('examples', 'lockfile'));
const dist = path.join(example, 'dist');

describe('E2E: lockfile', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    await testRunner(example);
  });

  it('transforms the lockfile (yarn) package to TypeScript', async () => {
    const index = await readFile(path.join(dist, 'index.ts'), 'utf8');
    const parse = await readFile(path.join(dist, 'parse.ts'), 'utf8');
    const stringify = await readFile(path.join(dist, 'stringify.ts'), 'utf8');
    expect(index).toMatchSnapshot();
    expect(parse).toMatchSnapshot();
    expect(stringify).toMatchSnapshot();
  });
});
