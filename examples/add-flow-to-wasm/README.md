# Example: Add (Flow)
**Uses**: `@esmbly/transformer-flow`, `@esmbly-transformer-wasm`

## Summary
This example shows how a simple Flow program can be transform to TypeScript, AssemblyScript, Wat and WebAssembly by chaining `@esmbly/transformer-flow` and `@esmbly-transformer-wasm`.

```sh
# Input (Flow)
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
