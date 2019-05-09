import { testRunner } from '../helpers/stringTestRunner';

describe('rule: Variables', () => {
  describe('@type', () => {
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

    it('transforms a variable declaration to TypeScript (exported const)', async () => {
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

  describe('@constant', () => {
    it('transforms a variable declaration to TypeScript (var)', async () => {
      const program = `
        /**
         * @constant {number}
         */
        var a = 1;
      `;
      const [{ content }] = await testRunner(program);
      expect(content).toMatchSnapshot();
    });

    it('transforms a variable declaration to TypeScript (let)', async () => {
      const program = `
        /**
         * @constant {number}
         */
        let b = 1;
      `;
      const [{ content }] = await testRunner(program);
      expect(content).toMatchSnapshot();
    });

    it('transforms a variable declaration to TypeScript (const)', async () => {
      const program = `
        /**
         * @constant {number}
         */
        const c = 2;
      `;
      const [{ content }] = await testRunner(program);
      expect(content).toMatchSnapshot();
    });
  });

  describe('@const', () => {
    it('is a alias for @constant', async () => {
      const program = `
        /**
         * @const {number}
         */
        var a = 1;
      `;
      const [{ content }] = await testRunner(program);
      expect(content).toMatchSnapshot();
    });
  });

  describe('@declare', () => {
    it('adds the declare keyword (var)', async () => {
      const program = `
        /**
         * @type {number}
         * @declare
         */
        var a;
      `;
      const [{ content }] = await testRunner(program);
      expect(content).toMatchSnapshot();
    });

    it('adds the declare keyword (let)', async () => {
      const program = `
        /**
         * @type {number}
         * @declare
         */
        let a;
      `;
      const [{ content }] = await testRunner(program);
      expect(content).toMatchSnapshot();
    });

    it('adds the declare keyword (const)', async () => {
      const program = `
        /**
         * @type {number}
         * @declare
         */
        const a = 1;
      `;
      const [{ content }] = await testRunner(program);
      expect(content).toMatchSnapshot();
    });
  });
});
