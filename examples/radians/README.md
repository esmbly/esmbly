# Example: Radians
**Uses**: `@esmbly/transformer-v8`, `@esmbly-transformer-wasm`   
**Test runner**: `jest`

## Summary
This example shows how a utility program for transforming between radians and degrees can be transformed to WebAssembly by chaining [`@esmbly/transformer-v8`](/packages/transformer-v8) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).

```sh
# Input (JavaScript)
src/toDegrees.js
src/toRadians.js

# The tests used to extract type information
test/toDegrees.test.js
test/toRadians.test.js

# Output (WebAssembly)
dist/radians.wasm
```

## Transforming the example
```sh
yarn run esmbly run
```

## Running the tests
```sh
yarn test
```
