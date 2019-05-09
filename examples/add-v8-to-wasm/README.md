# Example: Add (V8)
**Uses**: `@esmbly/transformer-v8`, `@esmbly-transformer-wasm`   
**Test runner**: `jest`

## Summary
This example shows how a simple JavaScript program that is covered by a test suite can be transformed to TypeScript, AssemblyScript, Wat and WebAssembly by chaining `@esmbly/transformer-v8` and `@esmbly-transformer-wasm`.

```sh
# Input (JavaScript)
src/add.js

# The tests used to extract type information
tests/add.test.js

# Output (TypeScript, AssemblyScript, Wat and WebAssembly)
dist/add.ts
dist/add.as.ts
dist/add.wat
dist/add.wasm
```

## Transforming the example
```sh
yarn run esmbly run
```

## Running the tests
```sh
yarn test
```
