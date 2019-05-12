# Example: Conway's Game of Life
**Uses**: `@esmbly/transformer-jsdoc`, `@esmbly-transformer-wasm`, `memory`

## Summary
This example shows how the Conway's Game of Life (ported from the AssemblyScript project to JSDoc) can be transformed to WebAssembly by chaining [`@esmbly/transformer-jsdoc`](/packages/transformer-jsdoc) and [`@esmbly/transformer-wasm`](/packages/transformer-wasm).

```sh
# Input (JavaScript with JSDoc comments)
src/index.js
src/config.js

# Output (TypeScript, AssemblyScript, WebAssembly)
dist/index.ts
dist/index.as.ts
dist/config.ts
dist/config.as.ts
dist/out.wasm
```

## Transforming the example
```sh
yarn run esmbly run
```

