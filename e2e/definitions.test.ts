import fs from 'fs';
import util from 'util';
import path from 'path';
import { testRunner } from './helpers/testRunner';

const readFile = util.promisify(fs.readFile);
const example = path.resolve(path.join('examples', 'definitions'));
const types = path.join(example, 'types');

describe('E2E: definitions', () => {
  beforeAll(async () => {
    jest.setTimeout(10000);
    await testRunner(example);
  });

  it('outputs TypeScript definition files', async () => {
    const index = await readFile(path.join(types, 'index.d.ts'), 'utf8');
    const add = await readFile(path.join(types, 'utils', 'add.d.ts'), 'utf8');
    const multiply = await readFile(
      path.join(types, 'utils', 'multiply.d.ts'),
      'utf8',
    );
    expect(index).toMatchSnapshot();
    expect(add).toMatchSnapshot();
    expect(multiply).toMatchSnapshot();
  });
});
