import { testRunner } from '../helpers/stringTestRunner';

describe('rule: CallExpression', () => {
  it('adds a type argument to the call expression', async () => {
    const program = `
      /**
       * @type {number[]}
       * @typeArgument {number}
       */
      const arr = toArray(1, 2, 3);
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });
});
