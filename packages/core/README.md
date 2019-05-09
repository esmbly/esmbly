# `@esmbly/core`
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

The core of **Esmbly**. 

This package is used by `@esmbly/cli` to parse the input files into AST representations and to run each provided transformer. It can also be used to run Esmbly programmatically.

## Installation
> Note: If you want to run the CLI you should install [`@esmbly/cli`](/packages/cli) instead.

```sh
# Using Yarn:
yarn add @esmbly/core

# Or, using NPM:
npm install @esmbly/core --save
```

## Usage

```js
const esmbly = require('@esmbly/core');
const Flow = require('@esmbly/transformer-flow');
const Wasm = require('@esmbly/transformer-wasm');

const compile = content => {
  return esmbly.run({
    input: [
      {
        content,
        dir: '/',
        name: 'input',
        type: '.js',
      },
    ],
    output: [{ format: 'WebAssembly' }],
    transformers: [
      Flow.createTransformer(),
      Wasm.createTransformer()
    ],
  });
};

const program = `
  // @flow

  export function add(a: number, b: number): number {
    return a + b;
  }
`;

compile(program)
  .then(([{ content }]) => WebAssembly.instantiate(content, {}))
  .then(({ instance }) => console.log('2 + 3 = ' + instance.exports.add(2, 3))) // => 2 + 3 = 5
  .catch(err => console.log(err));
```

## Configuration
The `@esmbly/core` API is very minimal. It exposes a single function called `run` which accepts a config object (see the [RunConfig](https://github.com/esmbly/esmbly/blob/6cb0bb6777814ecb03f3cd1ad7b65bcfb438b1c2/packages/types/src/RunConfig.ts#L3) interface) where the following properties must be provided.

| Option     |  Description                           | Type          |
|------------|----------------------------------------|---------------|
| **input**  |  An array of files that should be transformed  | [`File[]`](https://github.com/esmbly/esmbly/blob/master/packages/types/src/File.ts)      |       
| **transformers**  |  An array of transformer instances (created using the `createTransformer()` method, or any object/class that implements the Transformer interface). The transformers will run in the order that they are specified. | [`Transformer[]`](https://github.com/esmbly/esmbly/blob/master/packages/types/src/Transformer.ts#L6)      |   
| **output** |  An array of output objects. In other words - what kind of files do you want to output?   | [`Output[]`](https://github.com/esmbly/esmbly/blob/master/packages/types/src/Output.ts)      |   

```ts
interface File {
  name: string;
  content: string | Buffer;
  dir: string;
  type: FileType;
}

interface Output {
  format: Format;
  outDir?: string;
  outFile?: string;
  rootDir?: string;
}
```

## Contributing
All types of contributions are very much welcome. Check out our [**Contributing Guide**](CONTRIBUTING.md) for instructions on how to get started.
