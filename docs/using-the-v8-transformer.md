# Using the V8 transformer
This is a step-by-step guide on how to use `@esmbly/transformer-v8`.

## Example project setup
### 1. Setup
Start off by creating a new directory for this example, and navigate into it.
```sh
mkdir v8-example
cd v8-example
```

### 2. Create a `package.json`
```sh
# Using Yarn:
yarn init --yes

# Or, using NPM:
npm init --yes
```

### 3. Install `@esmbly/cli`, `@esmbly/transformer-v8`
```sh
# Using Yarn:
yarn add @esmbly/cli @esmbly/transformer-v8

# Or, using NPM:
npm install @esmbly/cli @esmbly/transformer-v8 --save
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
const V8 = require('@esmbly/transformer-v8');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    V8.createTransformer(),
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
function add(a, b) {
  return a + b;
}

module.exports.add = add;
```

## Using `jest` as the test runner
### 1. Install jest
```sh
# Using Yarn:
yarn add jest

# Or, using NPM:
npm install jest --save
```

### 2. Add jest as the test command
Open `esmbly.config.js` and set the `testCommand` option to `'jest'` when creating the transformer instance.
```js
transformers: [
  V8.createTransformer({ testCommand: 'jest' }),
],
```

### 3. Add a test case
Create a test file.
```sh
mkdir tests
touch tests/add.test.js
```
Add the following to `tests/add.test.js`.
```js
const { add } = require('../src/add.js');

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toEqual(5);
  });
});
```

## Using `jasmine` as the test runner
### 1. Install jasmine
```sh
# Using Yarn:
yarn add jasmine

# Or, using NPM:
npm install jasmine --save
```

### 2. Add jasmine as the test command
Open `esmbly.config.js` and set the `testCommand` option to `'jasmine'` when creating the transformer instance.
```js
transformers: [
  V8.createTransformer({ testCommand: 'jasmine' }),
],
```

### 3. Add a test case
Create a test file.
```sh
mkdir tests
touch tests/add.test.js
```
Add the following to `tests/add.test.js`.
```js
const { add } = require('../src/add.js');

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toEqual(5);
  });
});
```

## Using `tape` as the test runner
### 1. Install tape
```sh
# Using Yarn:
yarn add tape

# Or, using NPM:
npm install tape --save
```

### 2. Add tape as the test command
Open `esmbly.config.js` and set the `testCommand` option to `'tape'` when creating the transformer instance.
```js
transformers: [
  V8.createTransformer({ testCommand: 'tape' }),
],
```

### 3. Add a test case
Create a test file.
```sh
mkdir tests
touch tests/add.test.js
```
Add the following to `tests/add.test.js`.
```js
const test = require('tape');
const { add } = require('../src/add.js');

test('add', t => {
  t.plan(1);
  t.equal(add(2, 3), 5);
});
```

## Running Esmbly
Run Esmbly to output TypeScript to the `dist` directory.
```sh
# Using Yarn:
yarn run esmbly run

# Using NPM:
./node_modules/.bin/esmbly run

# Or, using NPX:
npx esmbly run
```
![](/.github/assets/run-v8.gif)


## Debugging the test run
Esmbly will run the provided test command in a child process. If the test command fails (non zero exit code), Esmbly will tell you. If you need to debug whats being printed to stdout/stderr during the test run, set the `debug` option to true when creating the transformer instance.
```js
transformers: [
  V8.createTransformer({ testCommand: 'jest', debug: 'true' }),
],
```
