# Example: Custom Transformer

## Summary
This example shows how to create a custom transformer.

The custom transformer renames all functions called `foo` to `bar`.

```sh
# Input
example/foo.ts

# The custom transformer
src/FooTransformer.js

# Output
dist/foo.bar.ts
```

## Transforming the example
```sh
yarn run esmbly run
```
