# Example: Custom Rule
**Uses**: `@esmbly/transformer-flow`, `@esmbly-transformer-wasm`   

## Summary
This example shows how to add a custom rule to a transformer. 

The custom rule is defined in `esmbly.config.js`. It adds a default return type (and a warning) for functions that does not specify one. If you remove the custom rule and run the transformation again, you will get an error because the `@esmbly-transformer-wasm` requires all function to have return annotations.

```sh
# Input (Flow)
src/add.js

# Output (TypeScript, WebAssembly)
dist/add.ts
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
