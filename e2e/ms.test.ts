import fs from 'fs';
import util from 'util';
import path from 'path';
import { testRunner } from './helpers/testRunner';

const readFile = util.promisify(fs.readFile);
const example = path.resolve(path.join('examples', 'ms'));
const dist = path.join(example, 'dist');

describe('E2E: ms', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    await testRunner(example);
  });

  it('transforms ms package to TypeScript', async () => {
    const content = await readFile(path.join(dist, 'index.ts'), 'utf8');
    expect(content).toMatchSnapshot();
  });
});
