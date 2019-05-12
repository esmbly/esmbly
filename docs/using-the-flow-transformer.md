# Using the Flow transformer
This is a step-by-step guide on how to use `@esmbly/transformer-flow`.

## Example project setup
### 1. Setup
Start off by creating a new directory for this example, and navigate into it.
```sh
mkdir flow-example
cd flow-example
```

### 2. Create a `package.json`
```sh
# Using Yarn:
yarn init --yes

# Or, using NPM:
npm init --yes
```

### 3. Install `@esmbly/cli` and `@esmbly/transformer-flow`
```sh
# Using Yarn:
yarn add @esmbly/cli @esmbly/transformer-flow

# Or, using NPM:
npm install @esmbly/cli @esmbly/transformer-flow --save
```

### 4. Create example files
Create the following files:
- The configuration file: `esmbly.config.js`
- The example program: `src/greeting.js`
```sh
mkdir src
touch src/greeting.js
touch esmbly.config.js
```

### 5. Add the configuration
Add the following to your newly created `esmbly.config.js`.
```js
const Flow = require('@esmbly/transformer-flow');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    Flow.createTransformer(),
  ],
  output: [
    {
      format: '.ts',
      outDir: 'dist',
      rootDir: 'src',
    },
  ],
};
```

### 6. Add the example program
Add the following to `src/greeting.js`
```js

// @flow

export function greeting(name: ?string): string {
  if (name) {
    return `Hello ${name}!`;
  }
  return 'Hello!';
}
```

## Running Esmbly
Run Esmbly to output TypeScript files to the `dist` directory.
```sh
# Using Yarn:
yarn run esmbly run

# Using NPM:
./node_modules/.bin/esmbly run

# Or, using NPX:
npx esmbly run
```
![](/.github/assets/run-flow.gif)

## Dealing with `// @flow` comments
`// @flow` comments are removed by default. If you which to keep them for some reason, set the `removeFlowFlags` option to false when creating the transformer instance.
```js
transformers: [
  Flow.createTransformer({ removeFlowFlags: false }),
],
```
