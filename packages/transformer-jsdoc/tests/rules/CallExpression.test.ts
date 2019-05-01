import testRunner from '../helpers/stringTestRunner';

describe('rule: CallExpression', () => {
  it('adds a type argument to the call expression', async () => {
    const program = `
      /**
       * @type {i32}
       * @typeArgument
       */
      someFn(1)
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });
});
