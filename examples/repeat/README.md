# Example: Repeat
**Uses**: `@esmbly/transformer-v8`, `@esmbly-transformer-wasm` , `memory`  
**Test runner**: `jest`

## Summary
This example shows how a utility program for repeating strings can be transformed to WebAssembly by chaining [`@esmbly/transformer-v8`](/packages/transformer-v8) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).

```sh
# Input (JavaScript)
src/repeat.js

# The tests used to extract type information
tests/repeat.test.js

# Output (WebAssembly)
dist/repeat.wasm
```

## Transforming the example
```sh
yarn run esmbly run
```

## Running the tests
```sh
yarn test
```
