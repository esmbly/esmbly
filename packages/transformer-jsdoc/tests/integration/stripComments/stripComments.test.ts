import path from 'path';
import testRunner from '../../helpers/fileTestRunner';

describe('integration: stripComments', () => {
  it('transforms the stripComments example to TypeScript', async () => {
    const testDir = path.join(__dirname, '__fixtures__');
    const { expected, results } = await testRunner(testDir, {
      stripComments: true,
    });
    expect(results.content).toEqual(expected);
  });
});
