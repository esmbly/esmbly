import { Format } from '@esmbly/types';
import { testRunner } from '../../helpers/testRunner';

jest.mock('@esmbly/printer');

const program = `
  export function add(a: number, b: number): number {
    return a + b;
  }
`;

describe('integration: multi-output', () => {
  it('handles multiple output formats', async () => {
    const output = [{ format: Format.Wat }, { format: Format.AssemblyScript }];
    const results = await testRunner(program, output);
    const [{ content: wat }, { content: as }] = results;
    expect(results).toHaveLength(2);
    expect(wat).toMatchSnapshot();
    expect(as).toMatchSnapshot();
  });
});
