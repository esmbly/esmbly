# Example: Insertion Sort
**Uses**: `@esmbly/transformer-jsdoc`, `@esmbly-transformer-wasm`, `memory`

## Summary
This example shows how an insertion sort algorithm can be transformed to WebAssembly by chaining [`@esmbly/transformer-jsdoc`](/packages/transformer-jsdoc) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).

```sh
# Input (JavaScript with JSDoc comments)
src/sort.js

# Output (WebAssembly)
dist/sort.wasm
```

## Transforming the example
```sh
yarn run esmbly run
```

## Running the tests
```sh
yarn test
```
