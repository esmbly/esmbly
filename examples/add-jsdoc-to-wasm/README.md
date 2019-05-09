# Example: Add (JSDoc)
**Uses**: `@esmbly/transformer-jsdoc`, `@esmbly-transformer-wasm`

## Summary
This example shows how a simple JavaScript program with JSDoc comments can be transform to TypeScript, AssemblyScript, Wat and WebAssembly by chaining `@esmbly/transformer-jsdoc` and `@esmbly-transformer-wasm`.

```sh
# Input (JavaScript with JSDoc comments)
src/add.js

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
