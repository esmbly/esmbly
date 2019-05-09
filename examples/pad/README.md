# Example: Pad
**Uses**: `@esmbly/transformer-flow`, `@esmbly-transformer-wasm`

## Summary
This example shows how a string pad program can be transformed to TypeScript, AssemblyScript and WebAssembly by chaining [`@esmbly/transformer-flow`](/packages/transformer-flow) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).

```sh
# Input (Flow)
src/pad.js

# Output (TypeScript, AssemblyScript, and WebAssembly)
dist/add.ts
dist/add.as.ts
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
