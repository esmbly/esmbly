# `@esmbly/transformer-flow`
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

Transform Flow files to TypeScript.

## Installation
```sh
# Using Yarn:
yarn add @esmbly/transformer-flow

# Or, using NPM:
npm install @esmbly/transformer-flow --save
```

## Getting Started
Check out [**Using the Flow transformer guide**](/docs/using-the-flow-transformer) for a step-by-step guide on how to get started with `@esmbly/transformer-flow` and the command-line interface.

## Try
Try it out in the Esmbly version of [WebAssembly Studio](https://esmbly.github.io/WebAssemblyStudio)!

## Usage
The `@esmbly/transformer-flow` transforms Flow files to TypeScript. In order to use it, make sure you have [`@esmbly/cli`](/packages/cli) installed .

The following Esmbly configuration will transform all JavaScript files located in the `src` directory and output TypeScript files to the `dist` directory.
```js
// esmbly.config.js

const Flow = require('@esmbly/transformer-flow');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    Flow.createTransformer(),
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

## Configuration
The `createTransformer()` method accepts an optional configuration object (see the [FlowTransformerOptions](https://github.com/esmbly/esmbly/blob/6cb0bb6777814ecb03f3cd1ad7b65bcfb438b1c2/packages/transformer-flow/src/index.ts#L12) interface). The following options are possible.

| Option                     |  Description                 | Type          |  Default |
|----------------------------|------------------------------|---------------|----------|
| **removeFlowFlags** (optional) |  Whether or not to remove any `// @flow` comments  | `boolean`        |  `true`    |         
| **customRules** (optional)     |  An object containing any custom rules which should be applied (existing [rules](https://github.com/esmbly/esmbly/tree/master/packages/transformer-flow/src/rules) can be overridden). Check out the [custom-rule](/custom-rule) example for further details.                            | [`CustomRules`](https://github.com/esmbly/esmbly/blob/6cb0bb6777814ecb03f3cd1ad7b65bcfb438b1c2/packages/types/src/Rule.ts#L12) |     |

## Examples
- [**Yarn/lockfile**](/examples/lockfile): Transforming [a subset of yarn](https://github.com/yarnpkg/yarn/tree/master/src/lockfile) from Flow to TypeScript.
- [**Add**](/examples/add-flow-to-wasm): Transforming a simple Flow program to WebAssembly by chaining [`@esmbly/transformer-flow`](/packages/transformer-flow) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Pad**](/examples/pad): Transforming a string pad program to WebAssembly by chaining [`@esmbly/transformer-flow`](/packages/transformer-flow) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Custom Rule**](/examples/custom-rule): Extending [`@esmbly/transformer-flow`](/packages/transformer-flow) with a custom rule.
- [**Browser Example**](/examples/browser-example): Using esmbly and [`@esmbly/transformer-flow`](/packages/transformer-flow) in the browser using Webpack.

## Status
| Supported? |                     | Flow                                    | TypeScript |
|------------|---------------------|-----------------------------------------|------------|
|   ✅       | Primitive Types     | `boolean \| number \| string \| null \| undefined` | `boolean \| number \| string \| null \| undefined` |
|   ✅       | Void                | `void`                                  | `undefined` |
|   ✅       | Literal Types       | `type Two = 2;`                         | `type Two = 2;` |
|   ✅       | Mixed Types         | `mixed`                                 | `unknown` |
|   ✅       | Any Types           | `any`                                   | `any` |
|   ✅       | Maybe Types         | `?type`                                 | `type \| null \| undefined` |
|   ✅       | Function Types      | `(str: string) => boolean`              | `(str: string) => boolean`  |
|   ❌       | Function Shorthand  | `(A, B) => C`                           | `(a: A, b: B) => C` |
|   ❌       | Predicate Functions | `(a: A, b: B) => C %checks`             | `(a: A, b: B) => C` |
|   ✅       | Object Types        | `{ foo: boolean }`                      | `{ foo: boolean }`  |
|   ✅       | Exact object types  | `{\| a: A \|}`                          | `{ a: A }` |
|   ✅       | Indexers            | `{ [A]: B }`                            | `{ [a: A]: B }` |
|   ✅       | Array Types         | `Array<string>`, `string[]`             | `Array<string>`, `string[]` |
|   ✅       | Tuple Types         | `type A = [number, boolean]`            | `type A = [number, boolean]` |
|   ✅       | Class Types         |                                         |  |
|   ✅       | Opaque types        | `opaque type A = B`                     | `type A = B` (not expressible) |
|   ✅       | Interface Types     |                                         |                 |
|   ✅       | Variance            | `interface A { +b: B, -c: C }`          | `interface A { readonly b: B, c: C }` |
|   ✅       | Generic Types       |                                         |                 |
|   ❌       | Bounds              | `<A: string>`                           | `<A extends string>` |
|   ✅       | Union Types         | `number \| boolean`                     |  `number \| boolean`  |
|   ❓       | Disjoint unions     |                                         |                 |
|   ✅       | Intersection Types  | `A & B`                                 |  `A & B`        |
|   ❓       | Typeof types        |                                         |  |
|   ✅       | Typeof undefined    | `typeof undefined`                      | `undefined` |
|   ✅       | Type Casting        | `(a: A)`                                | `(a as A)` |
|   ✅       | Import default type | `import type A from './b'`              | `import A from './b'` |
|   ✅       | Import named type   | `import type { A } from './b'`          | `import { A } from './b'` |

### Utilities

| Done? |                | Flow                                  | TypeScript |
|-------|----------------|---------------------------------------|------------|
|   ✅  | Keys           | `$Keys<A>`                            | `keyof A`  |
|   ❌  | Values         | `$Values<A>`                          | `A[keyof A]` |
|   ✅  | ReadOnly       | `$ReadOnly<A>`                        | `Readonly<A>` |
|   ✅  | ReadOnlyArray  | `$ReadOnlyArray<A>`                   | `ReadonlyArray<A>` |
|   ✅  | Exact          | `$Exact<A>`                           | `A` |
|   ❌  | Difference     | `$Diff<A, B>`                         | ?  |
|   ❌  | Rest           | `$Rest<A, B>`                         | ?  |
|   ❌  | Property type  | `$PropertyType<T, k>`                 | `T[k]` |
|   ❌  | Element type   | `$ElementType<T, K>`                  | `T[k]` |
|   ❌  | Element type   | `$NonMaybeType<T>`                    | `NonNullable<T>` (strictNullChecks) |
|   ❌  | ObjMap         | `$ObjMap<T, F>`                       | ? |
|   ❌  | ObjMapi        | `$ObjMapi<T, F>`                      | ? |
|   ❌  | TupleMap       | `$TupleMap<T, F>`                     | ? |
|   ❌  | Call           | `$Call<F>`                            | `ReturnType` |
|   ❌  | Class          | `Class<A>`                            | `typeof A`   |
|   ❌  | Shape          | `Shape<T>`                            | `Partial<T>`   |
|   ❌  | Supertype      | `$Supertype<A>`                       | `any` (deprecated) |
|   ❌  | Subtype        | `$Subtype<A>`                         | `B extends A` (deprecated) |
|   ❌  | Existential type | `*`                                 | `any` (deprecated)|

✅ Done   
❌ Not implemented yet   
❓ Status not known   

## Contributing
All types of contributions are very much welcome. Check out our [**Contributing Guide**](CONTRIBUTING.md) for instructions on how to get started.

## Credits
`@esmbly/transformer-flow` is a customization/extension of the [flow-to-typescript](https://github.com/bcherny/flow-to-typescript) project ( ❤️) which is released under the following MIT license.

```
Copyright 2017 Boris Cherny <boris@performancejs.com> 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
