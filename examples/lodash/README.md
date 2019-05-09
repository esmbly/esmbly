# Example: Lodash
**Uses**: `@esmbly/transformer-jsdoc`, `@esmbly-transformer-wasm`

## Summary
This example shows how the entire [lodash](https://github.com/lodash/lodash) library can be transformed to TypeScript based on JSDoc comments. It also transforms the clamp method (a customized version using a named export instead of a default) to WebAssembly using `@esmbly-transformer-wasm`.

```sh
# Input (JavaScript with JSDoc comments)
src/*.js
src/internal/*.js

# Output (TypeScript, WebAssembly)
dist/*.ts
dist/internal/*.ts
clamp.wasm
```

## Transforming the example
```sh
yarn run esmbly run
```

## Status
The lodash methods listed below has not yet been transformed correctly.

#### Missing annotation (default parameter)
- take.js
- takeRight.js
- uniqueId.js

#### Missing annotation (class):
- internal/Hash.js
- internal/ListCache.js
- internal/MapCache.js
- internal/SetCache.js
- internal/Stack.js

#### Missing annotation (function expression + arrow function):
- camelCase.js
- isArrayBuffer.js
- isDate.js
- isMap.js
- isRegExp.js
- isSet.js
- isTypedArray.js
- kebabCase.js
- lowerCase.js
- snakeCase.js
- startCase.js
- upperCase.js

### Missing additional information:
- debounce.ts
- throttle.ts
- truncate.ts

### Invalid/incomplete/overloaded JSDoc comments:
- merge.js
- mergeWith.js
- replace.js
- unionWith.js
- xorBy.js
- xorWith.js
- zipWith.js
- internal/baseConformsTo.js
- internal/composeArgs.js
- internal/composeArgsRight.js
- orderBy.js
- internal/compareMultiple.js