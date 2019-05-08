import fs from 'fs';
import util from 'util';
import path from 'path';
import { testRunner } from './helpers/testRunner';

const readFile = util.promisify(fs.readFile);
const example = path.resolve(path.join('examples', 'custom-transformer'));
const dist = path.join(example, 'dist');

describe('E2E: custom-transformer', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    await testRunner(example);
  });

  it('outputs a TypeScript file where the foo function has been renamed to bar', async () => {
    const result = await readFile(path.join(dist, 'foo.bar.ts'), 'utf8');
    expect(result).toMatchSnapshot();
  });
});
