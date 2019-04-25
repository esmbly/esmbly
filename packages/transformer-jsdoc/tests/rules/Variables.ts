import testRunner from '../helpers/stringTestRunner';

describe('rule: Variables', () => {
  it('transforms a variable declaration to TypeScript (var)', async () => {
    const program = `
      /**
       * @type {number}
       */
      var a = 1;
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });

  it('transforms a variable declaration to TypeScript (let)', async () => {
    const program = `
      /**
       * @type {number}
       */
      let b = 1;
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });

  it('transforms a variable declaration to TypeScript (const)', async () => {
    const program = `
      /**
       * @type {number}
       * @const
       */
      const c = 2;
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });

  it('transforms a variable declaration to TypeScript (exported)', async () => {
    const program = `
      /**
       * @type {number}
       * @const
       */
      export const c = 2;
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });
});
