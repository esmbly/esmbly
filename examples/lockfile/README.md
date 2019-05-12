# Example: Yarn/lockfile
**Uses**: `@esmbly/transformer-flow`, `@esmbly-transformer-wasm`

## Summary
This example shows how a [a subset of yarn](https://github.com/yarnpkg/yarn/tree/master/src/lockfile) can be transformed from Flow to TypeScript.

```sh
# Input (Flow)
src/index.js
src/parse.js
src/stringify.js

# Output (TypeScript)
src/index.ts
src/parse.ts
src/stringify.ts
```

## Transforming the example
```sh
yarn run esmbly run
```
