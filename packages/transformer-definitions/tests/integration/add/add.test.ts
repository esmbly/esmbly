import { testRunner } from '../../helpers/testRunner';

jest.mock('@esmbly/printer');

const program = `
  export function add(a: number, b: number): number {
    return a + b;
  }
`;

describe('integration: add', () => {
  it('generates a TypeScript definition file', async () => {
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });
});
