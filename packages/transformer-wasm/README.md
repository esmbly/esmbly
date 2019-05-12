# `@esmbly/transformer-wasm`
<p>
  <a title="MIT License" href="LICENSE">
    <img src="https://img.shields.io/github/license/gridsome/gridsome.svg?style=flat-square&label=License&colorB=6cc24a">
  </a>
  <a title="Build Status" href="https://travis-ci.org/esmbly/esmbly">
    <img src="https://travis-ci.org/esmbly/esmbly.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/esmbly/esmbly?branch=master" href="Coverage Status">
    <img src="https://coveralls.io/repos/github/esmbly/esmbly/badge.svg?branch=master" />
  </a>
</p>

Transform TypeScript programs to WebAssembly, Wat, Asm.js and AssemblyScript. The `@esmbly/transformer-wasm` can be used directly on TypeScript files, or chained together with other transformers that generates TypeScript output.

## Installation
```sh
# Using Yarn:
yarn add @esmbly/transformer-wasm

# Or, using NPM:
npm install @esmbly/transformer-wasm --save
```

## Getting Started
Check out [**Using the WebAssembly transformer**](/docs/using-the-wasm-transformer) for a step-by-step guide on how to get started with `@esmbly/transformer-wasm` and the command-line interface.

## Try
Try it out in the Esmbly version of [WebAssembly Studio](https://esmbly.github.io/WebAssemblyStudio)!

## Usage
The `@esmbly/transformer-wasm` transforms TypeScript programs to WebAssembly, Wat, Asm.js and AssemblyScript. In order to use it, make sure you have [`@esmbly/cli`](/packages/cli) installed.

The following Esmbly configuration will transform the file `add.js` located in the `src` directory, first to TypeScript using [`@esmbly/transformer-jsdoc`](/packages/transformer-jsdoc), and then to WebAssembly and Wat using `@esmbly/transformer-wasm`. Two output formats are specified, which will output `add.wat` and `add.wasm` to the `dist` directory.
```js
// esmbly.config.js

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

## Configuration
The `createTransformer()` method accepts an optional configuration object (see the [WasmTransformerOptions](https://github.com/esmbly/esmbly/blob/documentation/packages/transformer-wasm/src/index.ts) interface). Under the hood, `@esmbly/transformer-wasm` uses the [AssemblyScript compiler](https://github.com/AssemblyScript/assemblyscript/wiki/Using-the-compiler) to output WebAssembly, Wat and Asm.js. The following configuration options correspond to the specified asc flags.  

| Option        |  Description               | Type      | Asc flag              |
|---------------|----------------------------|-----------|-----------------------|
| **optimize** (optional)      |  Optimizes the module.  | `string` | `--optimize` |
| **optimizeLevel** (optional) |  How much to focus on optimizing code. [0-3]. | `number` | `--optimizeLevel`  |  
| **shrinkLevel** (optional)   |  How much to focus on shrinking code size. [0-2, s=1, z=2]. | `number` | `--shrinkLevel` | 
| **validate** (optional)      |  Validates the module using Binaryen. Exits if invalid. | `boolean` | `-validate` |   
| **use** (optional)           |  Aliases a global object under another name, e.g., to switch the default 'Math' implementation used: ['Math=JSMath']. | `string[]` | `--use` | 
| **memory** (optional)        |  See [Memory options below](#memory-options) | `Object` |   |
| **customRules** (optional)     |  An object containing any custom rules which should be applied (existing [rules](https://github.com/esmbly/esmbly/tree/documentation/packages/transformer-wasm/src/rules) can be overridden). Check out the [custom-rule](/custom-rule) example for further details.                            | [`CustomRules`](https://github.com/esmbly/esmbly/blob/master/packages/types/src/Rule.ts) | |

## Memory options
For further details about memory layout and management, have a look at the [AssemblyScript Wiki](https://github.com/AssemblyScript/assemblyscript/wiki/Memory-Layout-&-Management).

```typescript
{ 
  import: boolean;
  export: boolean;
  allocator: string;
}
```  

| Option             |  Description                 | Type          |
|--------------------|------------------------------|---------------|
| **import** (optional)  | Imports the memory instance provided by the embedder. (asc flag: `--importMemory`) | `boolean`  |
| **export** (optional)  | Exports memory by injecting `export { memory };` to the top of the TypeScript files before running asc. | `boolean` |  
| **allocator** (optional) | Imports the specified allocator by injecting an import statement to the top of the TypeScript files before running asc. Ex: `import "allocator/tlsf";` | `string`        |

## Examples
- [**Add (JSDoc)**](/examples/add-jsdoc-to-wasm): Transforming a simple JavaScript program with JSDoc comments to WebAssembly by chaining [`@esmbly/transformer-jsdoc`](/packages/transformer-jsdoc) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Add (Flow)**](/examples/add-jsdoc-to-wasm): Transforming a simple Flow program to WebAssembly by chaining [`@esmbly/transformer-flow`](/packages/transformer-flow) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Add (V8)**](/examples/add-jsdoc-to-wasm): Transforming a simple JavaScript program that is covered by a test suite to WebAssembly by chaining [`@esmbly/transformer-v8`](/packages/transformer-v8) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Conway's Game of Life**](/examples/game-of-life): Transforming Conway's Game of Life (ported from the AssemblyScript project to JSDoc) to WebAssembly by chaining [`@esmbly/transformer-jsdoc`](/packages/transformer-jsdoc) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Insertion Sort**](/examples/insertion-sort): Transforming an insertion sort algorithm to WebAssembly by chaining [`@esmbly/transformer-jsdoc`](/packages/transformer-jsdoc) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Browser Example**](/browser-example): Using esmbly in the browser using Webpack. Uses [`@esmbly/transformer-flow`](/packages/transformer-flow) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Lodash**](/examples/lodash): Transforming one [lodash](https://github.com/lodash/lodash) method to WebAssembly.
- [**Pad**](/examples/pad): Transforming a string pad program to WebAssembly by chaining [`@esmbly/transformer-flow`](/packages/transformer-flow) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Radians**](/examples/pad): Transforming a utility program for transforming between radians and degrees to WebAssembly by chaining [`@esmbly/transformer-v8`](/packages/transformer-v8) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Repeat**](/examples/pad): Transforming a utility program for repeating strings to WebAssembly by chaining [`@esmbly/transformer-v8`](/packages/transformer-v8) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).

## Contributing
All types of contributions are very much welcome. Check out our [**Contributing Guide**](CONTRIBUTING.md) for instructions on how to get started.