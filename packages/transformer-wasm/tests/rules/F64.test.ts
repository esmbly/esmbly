import { Format } from '@esmbly/types';
import testRunner from '../helpers/testRunner';

const program = `
  function add(a: number, b: number): number {
    return a + b;
  }
`;

describe('rule: F64', () => {
  it('transforms number -> f64', async () => {
    const output = [{ format: Format.AssemblyScript }];
    const [{ content }] = await testRunner(program, output);
    expect(content).toMatchSnapshot();
  });
});
