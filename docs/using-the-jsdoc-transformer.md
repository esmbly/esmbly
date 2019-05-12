# Using the JSDoc transformer
This is a step-by-step guide on how to use `@esmbly/transformer-jsdoc`.

## Example project setup
### 1. Setup
Start off by creating a new directory for this example, and navigate into it.
```sh
mkdir jsdoc-example
cd jsdoc-example
```

### 2. Create a `package.json`
```sh
# Using Yarn:
yarn init --yes

# Or, using NPM:
npm init --yes
```

### 3. Install `@esmbly/cli` and `@esmbly/transformer-jsdoc`
```sh
# Using Yarn:
yarn add @esmbly/cli @esmbly/transformer-jsdoc

# Or, using NPM:
npm install @esmbly/cli @esmbly/transformer-jsdoc --save
```

### 4. Create example files
Create the following files:
- The configuration file: `esmbly.config.js`
- The example program: `src/add.js`
```sh
mkdir src
touch src/add.js
touch esmbly.config.js
```

### 5. Add the configuration
Add the following to your newly created `esmbly.config.js`.
```js
const JSDoc = require('@esmbly/transformer-jsdoc');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    JSDoc.createTransformer(),
  ],
  output: [
    {
      format: '.ts',
      outDir: 'dist',
      rootDir: 'src',
    },
  ],
};
```

### 6. Add the example program
Add the following to `src/add.js`
```js
/**
 * Add two numbers
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function add(a, b) {
  return a + b;
}

```

## Running Esmbly
Run Esmbly to output TypeScript files to the `dist` directory.
```sh
# Using Yarn:
yarn run esmbly run

# Using NPM:
./node_modules/.bin/esmbly run

# Or, using NPX:
npx esmbly run
```
![](/.github/assets/run-jsdoc.gif)

## Remove JSDoc comments after transformation
If you wish to remove your JSDoc comments after transforming to TypeScript, set the `stripComments` option to true when creating the transformer instance.
```js
transformers: [
  JSDoc.createTransformer({ stripComments: true }),
],
```
