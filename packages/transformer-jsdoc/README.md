# `@esmbly/transformer-jsdoc`
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

Transform JavaScript files with JSDoc comments to TypeScript.

## Installation
```sh
# Using Yarn:
yarn add @esmbly/transformer-jsdoc

# Or, using NPM:
npm install @esmbly/transformer-jsdoc --save
```

## Getting Started
Check out [**Using the JSDoc transformer**](/docs/using-the-jsdoc-transformer) for a step-by-step guide on how to get started with `@esmbly/transformer-jsdoc` and the command-line interface.

## Try
Try it out in the Esmbly version of [WebAssembly Studio](https://esmbly.github.io/WebAssemblyStudio)!

## Usage
The `@esmbly/transformer-jsdoc` transforms JavaScript files with JSDoc comments to TypeScript. In order to use it, make sure you have [`@esmbly/cli`](/packages/cli) installed .

The following Esmbly configuration will transform all JavaScript files located in the `src` directory and output TypeScript files to the `dist` directory.
```js
// esmbly.config.js

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

## Configuration
The `createTransformer()` method accepts an optional configuration object (see the [JSDocTransformerOptions](https://github.com/esmbly/esmbly/blob/6cb0bb6777814ecb03f3cd1ad7b65bcfb438b1c2/packages/transformer-jsdoc/src/index.ts#L12) interface). The following options are possible.

| Option                     |  Description                 | Type          |  Default |
|----------------------------|------------------------------|---------------|----------|
| **stripComments** (optional)   |  Whether to remove remove the JSDoc comments after the transformation  | `boolean`        |  `false`   |         
| **customRules** (optional)     |  An object containing any custom rules which should be applied (existing [rules](https://github.com/esmbly/esmbly/tree/master/packages/transformer-jsdoc/src/rules) can be overridden). Check out the [custom-rule](/custom-rule) example for further details.                            | [`CustomRules`](https://github.com/esmbly/esmbly/blob/master/packages/types/src/Rule.ts) |      |

## Examples
- [**Lodash**](/examples/lodash): Transforming the entire [lodash](https://github.com/lodash/lodash) library to TypeScript based on JSDoc comments.
- [**ms**](/examples/ms): Transforming the entire [ms](https://github.com/zeit/ms) package to TypeScript based on JSDoc comments.
- [**Add**](/examples/add-jsdoc-to-wasm): Transforming a simple JavaScript program with JSDoc comments to WebAssembly by chaining [`@esmbly/transformer-jsdoc`](/packages/transformer-jsdoc) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Conway's Game of Life**](/examples/game-of-life): Transforming Conway's Game of Life (ported from the AssemblyScript project to JSDoc) to WebAssembly by chaining [`@esmbly/transformer-jsdoc`](/packages/transformer-flow) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).
- [**Insertion Sort**](/examples/insertion-sort): Transforming an insertion sort algorithm to WebAssembly by chaining [`@esmbly/transformer-jsdoc`](/packages/transformer-jsdoc) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).

## Supported tags

### `@param` 
Synonyms: `@arg`, `@argument`

The param tag provides the name, type and an optional description about a function parameter. To correctly be able to transform a documented function to TypeScript you are required to specify the name and type of the parameter you are documenting. The param tags also needs to be in the same order as the function parameters. Any parameter that is missing a name or type will be assumed to be `any`. 


```js
// input.js

/**
 * Add two numbers
 * @param {number} a
 * @param {number} b
 */
export function add(a, b) {
  return a + b;
}

```

```ts
// output.ts

export function add(a: number, b: number) {
  return a + b;
}

```

There is also support for union and rest parameters
```js
// input.js

/**
 * @param {...number} numbers
 */
export function add(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

/**
 * @param {(number | string)} id
 */
export function toStringId(id) {
  return `ID${id}`;
}
```

```ts
// output.ts

export function add(...numbers: number[]) {
  return numbers.reduce((total, n) => total + n, 0);
}

export function toStringId(id: number | string) {
  return `ID${id}`;
}
```

### `@returns`
Synonyms: `@return`

The returns tag specifies the return type of a function. 

```js
// input.js

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

```ts
// output.ts

export function add(a: number, b: number): number {
  return a + b;
}

```

### `@type`

The type tag is used to document the type of a variable.

```js
// input.js

/**
 * @type {number}
 */
const a = add(2, 3);
```

```ts
// output.ts

const a: number = add(2, 3);
```

### `@constant`
Synonyms: `@const`

The constant tag is used to document the type of a constant variable. Any documented variable that is declared using the `var` or `let` keyword will automatically be transform to a `const` when transforming to TypeScript.

```js
// input.js

/**
 * @constant {string}
 */
var RED = 'FF0000';
```

```ts
// output.ts

const RED: string = 'FF0000';
```

### `@typeArgument`

The typeArgument tag is a custom tag (not included in the JSDoc specification) that can be used to specify the the type arguments of a function call.

```js
// input.js

/**
 * @type {number[]}
 * @typeArgument {number}
 */
const arr = toArray(1, 2, 3);
```

```ts
// output.ts

const arr: number[] = toArray<number>(1, 2, 3);
```

### `@declare`

The declare tag is a custom tag (not included in the JSDoc specification) that can be used to specify that a variable or a function should be declared. Initializers are only allowed for constant values and can only be a string or numeric literal. If a function is tagged with `@declare`, the function implementation (the function body) will be removed.

```js
// input.js

/**
 * @type {string}
 * @declare
 */
const color = 'red';

/**
 * @type {string}
 * @declare
 */
var someValue;

/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @declare
 */
function add(a, b) {}
```

```ts
// output.ts

declare const color = 'red';

declare someValue: string;

declare function add(a: number, b: number): number;
```

## Roadmap
|                     | JSDoc                                   | TypeScript      |
|---------------------|-----------------------------------------|-----------------|
| Abstract            | `@abstract`                             | `abstract class A { } ` |
| Access              | `@access private`                       | `private someMethod() { }` |
| Callback            | `@callback`                             |  |
| Class methods       |                                         |  |
| Enum                | `@enum`                                 |  |
| Interface           | `@interface`                            |  |
| Implements          | `@implements`                           | `class A implements B { }`  |
| Namespace           | `@namespace MyNamespace`                | `namespace MyNamespace { }` |
| Nullable type       | `{?number}`                             | `number \| null` |
| Non-nullable type   | `{!number}`                             | `NonNullable<number>` (strictNullChecks) |
| Optional parameters | `@param {number} [foo]`                 | `foo?: number` |
| Private             | `@private`                              | `private someProperty` |
| Protected           | `@protected`                            | `protected someProperty` |
| Public              | `@public`                               | `public someProperty` |
| Read only           | `@readonly`                             | `readonly someProperty` |
| Static              | `@static`                               | `static someMethod() { }` |
| Typedef             | `@typedef`                              |  |
| Decorator           | `@decorator {inline}`                   | `@inline` |

## Contributing
All types of contributions are very much welcome. Check out our [**Contributing Guide**](CONTRIBUTING.md) for instructions on how to get started.
