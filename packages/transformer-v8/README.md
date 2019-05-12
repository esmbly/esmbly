# `@esmbly/transformer-v8`

**Turn your tests into types** 

Transform JavaScript files to TypeScript by collecting V8 runtime type information during test runs.

## Installation
```sh
# Using Yarn:
yarn add @esmbly/transformer-v8

# Or, using NPM:
npm install @esmbly/transformer-v8 --save
```

## Getting Started
Check out [**Using the V8 transformer**](/docs/using-the-v8-transformer) for a step-by-step guide on how to get started with `@esmbly/transformer-v8` and the command-line interface.

## Usage
The `@esmbly/transformer-v8` transforms JavaScript files to TypeScript based on type information collected from V8. In order to use it, make sure you have [`@esmbly/cli`](/packages/cli) installed. Under the hood, `@esmbly/transformer-v8` uses the experimental Inspector API and the V8 inspector protocol which requires you to have at least Node.js version 10 installed.

In order to collect a V8 type profile about a JavaScript program - the program needs to be executed. When the program is executed, type information can be collected from V8 via the V8 inspector protocol. If a program is covered by a test suite, the test suite can be executed in order to run the program and retrieve a type profile from V8.

The following Esmbly configuration will run `jest` in order to extract a type profile, and then transform all JavaScript files located in the `src` directory to TypeScript. Files are outputted to the `dist` directory.
```js
// esmbly.config.js

const V8 = require('@esmbly/transformer-v8');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    V8.createTransformer({
      testCommand: `jest`,
    }),
  ],
  output: [
    {
      format: '.ts',
      outDir: 'dist',
      rootDir: 'src'
    },
  ],
};
```

## Configuration
The `createTransformer()` method accepts an optional configuration object (see the [V8TransformerOptions](https://github.com/esmbly/esmbly/blob/master/packages/transformer-v8/src/index.ts) interface). The following options are possible.

| Option                     |  Description                 | Type          |  Default |
|----------------------------|------------------------------|---------------|----------|
| **testCommand**   |  The test command to run in order to extract a type profile, e.g. `jest --runInBand`  | `string`        |    |    
| **debug**   |  Debug whats being printed to stdout/stderr during the test run.  | boolean        |  `false`  |        
| **customRules** (optional)     |  An object containing any custom rules which should be applied (existing [rules](https://github.com/esmbly/esmbly/tree/master/packages/transformer-v8/src/rules) can be overridden). Check out the [custom-rule](/custom-rule) example for further details.                            | [`CustomRules`](https://github.com/esmbly/esmbly/blob/master/packages/types/src/Rule.ts) |      |

## Supported test runners
The long term goal is to support any test runner, including simply running `node` to invoke a program that executes the specified input files. Currently, the following test runners are supported:
- jest
- jasmine
- tape

## Limitations
The type information that can be retrieved from V8 is somewhat experimental. All primitive types are supported, as well as custom classes. However, V8 does provide any detailed information about arrays or objects literals which will be interpreted as `any[]` and `Object`.

## Examples
- [**Add**](/examples/add-v8-to-wasm): Transforming a simple JavaScript program that is covered by a test suite to WebAssembly by chaining [`@esmbly/transformer-v8`](/packages/transformer-v8) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Radians**](/examples/pad): Transforming a utility program for transforming between radians and degrees to WebAssembly by chaining [`@esmbly/transformer-v8`](/packages/transformer-v8) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Repeat**](/examples/pad): Transforming a utility program for repeating strings to WebAssembly by chaining [`@esmbly/transformer-v8`](/packages/transformer-v8) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).

## Further reading
- [Runtime type information for JavaScript](https://medium.com/fhinkel/runtime-type-information-for-javascript-b134faac3c0a)
- [Google: Type Profile Design Doc](https://docs.google.com/document/d/1JY7pUCAk8gegyi6UkIdln6j_AeJqQucZg92advaMJY4/edit#heading=h.xgjl2srtytjt)

## Contributing
All types of contributions are very much welcome. Check out our [**Contributing Guide**](CONTRIBUTING.md) for instructions on how to get started.