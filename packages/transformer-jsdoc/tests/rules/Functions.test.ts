import { testRunner } from '../helpers/stringTestRunner';

describe('rule: Functions', () => {
  it('transforms an arrow function to TypeScript', async () => {
    const program = `
      /**
       * @param {number} n
       * @returns {number}
       */
      const square = (n) => n * n; 
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });

  it('transforms a function declaration to TypeScript', async () => {
    const program = `
      /**
       * @param {number} n
       * @returns {number}
       */
      function square(n) {
        return n * n; 
      }
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });

  it('transforms a function expression to TypeScript', async () => {
    const program = `
      /**
       * @param {number} n
       * @returns {number}
       */
      var square = function(n) {
        return n * n; 
      }
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });

  it('transforms an exported function to TypeScript', async () => {
    const program = `
      /**
       * @param {number} n
       * @returns {number}
       */
      export function square(n) {
        return n * n; 
      }
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });

  it('transforms a default exported function to TypeScript', async () => {
    const program = `
      /**
       * @param {number} n
       * @returns {number}
       */
      export default function square(n) {
        return n * n; 
      }
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });

  it('adds the declare keyword and removes the implementation from functions tagged with @declare', async () => {
    const program = `
      /**
       * @param {number} n
       * @returns {number}
       * @declare
       */
      function square(n) {
        return n * n; 
      }
    `;
    const [{ content }] = await testRunner(program);
    expect(content).toMatchSnapshot();
  });
});
