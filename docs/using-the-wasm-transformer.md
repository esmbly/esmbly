# Using the WebAssembly Transformer
This is a step-by-step guide on how to use `@esmbly/transformer-wasm`.

## Example project setup
### 1. Setup
Start off by creating a new directory for this example, and navigate into it.
```sh
mkdir wasm-example
cd wasm-example
```

### 2. Create a `package.json`
```sh
# Using Yarn:
yarn init --yes

# Or, using NPM:
npm init --yes
```

### 3. Install `@esmbly/cli`, `@esmbly/transformer-wasm`
```sh
# Using Yarn:
yarn add @esmbly/cli @esmbly/transformer-wasm

# Or, using NPM:
npm install @esmbly/cli @esmbly/transformer-wasm --save
```

### 4. Install `@esmbly/transformer-jsdoc`
`@esmbly/transformer-wasm` accepts TypeScript input. We could provide TypeScript files as the input, but for this example we are going to chain `@esmbly/transformer-jsdoc` and `@esmbly/transformer-wasm` together. We will first transform the JSDoc comments to TypeScript, and then use the generated TypeScript to output Wat and WebAssembly.

```sh
# Using Yarn:
yarn add @esmbly/transformer-jsdoc

# Or, using NPM:
npm install @esmbly/transformer-jsdoc --save
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
const path = require('path');
const JSDoc = require('@esmbly/transformer-jsdoc');
const Wasm = require('@esmbly/transformer-wasm');

module.exports = {
  input: ['./src/add.js'],
  transformers: [
    JSDoc.createTransformer(),
    Wasm.createTransformer(),
  ],
  output: [
    {
      format: '.ts',
      outFile: path.join(__dirname, 'dist', 'add.ts'),
    },
    {
      format: '.wat',
      outFile: path.join(__dirname, 'dist', 'add.wat'),
    },
    {
      format: '.wasm',
      outFile: path.join(__dirname, 'dist', 'add.wasm'),
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
Run Esmbly to output TypeScript, Wat and WebAssembly files to the `dist` directory.
```sh
# Using Yarn:
yarn run esmbly run

# Using NPM:
./node_modules/.bin/esmbly run

# Or, using NPX:
npx esmbly run
```
![](/.github/assets/run-wasm.gif)

## Using the WebAssembly binary
![](/.github/assets/use-wasm.gif)

## Working with strings
- See the [Pad](/examples/pad) example. 
- See the [Repeat](/examples/repeat) example. 

## Working with arrays
- See the [Insertion sort](/examples/insertion-sort) example.
