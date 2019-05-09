# Using the CLI

## Commands
**`esmbly run`**: Run Esmbly   
**`esmbly init`**: Creates a new Esmbly configuration file and (optionally) installs the specified transformers.

## Running Esmbly
![](/.github/assets/run-wasm.gif)

## Config file
An Esmbly config file is a JavaScript module which exports a configuration. By default, the configuration file will be assumed to be called `esmbly.config.js` located in the root of the project.

## Config file types

### Exporting a single object
For most use cases, simply exporting an object will do.
```js
// esmbly.config.js
// Exporting an object 

const Flow = require('@esmbly/transformer-flow');

module.exports = {
  input: ['./src/**/*.js'],
  transformers: [
    Flow.createTransformer(),
  ],
  output: [
    {
      format: '.ts',
      outDir 'dist',
      rootDir: 'src'
    },
  ],
};
```

### Exporting multiple configuration objects
If you want to transform different files in different ways, you can provide multiple configuration objects by exporting an array.
```js
// esmbly.config.js
// Exporting an array 

const path = require('path');
const JSDoc = require('@esmbly/transformer-jsdoc');
const Wasm = require('@esmbly/transformer-wasm');

module.exports = [
  {
    input: ['./src/**/*.js'],
    transformers: [
      JSDoc.createTransformer(),
    ],
    output: [
      {
        format: '.ts',
        outDir: 'dist',
        rootDir: 'src'
      },
    ],
  },
  {
    input: ['./src/clamp.namedexport.js'],
    transformers: [
      JSDoc.createTransformer({}),
      Wasm.createTransformer({}),
    ],
    output: [
      {
        format: '.wasm',
        outFile: path.join(__dirname, 'dist', 'clamp.wasm'),
      }
    ],
  }
];
```

### Exporting a function
It is also possible to export a function which is useful if you need to perform some async task before returning the configuration.
```js
// esmbly.config.js
// Exporting a function

const Flow = require('@esmbly/transformer-flow');

module.exports = async () => {
  const response = await fetch('http://my-api/files-to-transform');

  return {
    input: response.json(),
    transformers: [
      Flow.createTransformer(),
    ],
    output: [
      {
        format: '.ts',
        outDir 'dist',
        rootDir: 'src'
      },
    ],
  }
};
```

## Input option
The input option in your Esmbly config file accepts an array of glob patterns. To transform all JavaScript files in the `src` directory (excluding test files), try something like:
```js
input: ['./src/**/*.js', '!src/**/*.test.js'],
```
You can also specify single files:
```js
input: ['./src/add.js', './src/square.js'],
```
## Transformers option
The transformers options accepts an array of transformer instances (created using the `createTransformer()` method, or any object/class that implements the Transformer interface). The transformers will run in the order that they are specified.
```js
transformers: [
  Flow.createTransformer(),
  Wasm.createTransformer(),
],
```

## Output option
The output option in your Esmbly config file accepts an array of output configuration objects. Each object contains a set of options telling Esmbly what type of files to output, and where. 
```js
output: [
  {
    // Output .ts files to the dist directory
    format: 'TypeScript',
    outDir: 'dist',
    rootDir: 'src'
  },
  {
    // Output a WebAssembly binary to dist/add.wasm
    format: 'WebAssembly',
    outFile: path.join(__dirname, 'dist', 'add.wasm')
  }
]
```

### `format`
The format you want to output. Esmbly tries to be smart about this so `'TypeScript'`, `'.ts'`, `'ts'` all mean the same thing.

### `outDir` _(optional)_
The directory where you want to output files. By default, the same structure as the input files will be used (e.g. `src/add.js -> dist/src/add.js`). If neither `outDir` or `outFile` is specified, files will be outputted next to the input files.

### `rootDir` _(optional)_
The `rootDir` option can be used in combination with `outDir` to control the structure of the output files. By using `rootDir: 'src'` we can change the output structure in the example above to `src/add.js -> dist/add.js`.

### `outFile` _(optional)_
The `outFile` option allows you to control the name of the output files. When a single file is outputted, this option can be a static file path.

```js
// Single file output
outFile: path.join(__dirname, 'dist', 'add.wasm')

// Multi file output
outFile: '[name].transformed.ts'
```

## Specifying a custom config file path
By default, Esmbly will look for a configuration file called `esmbly.config.js` in the root of your project (e.g. next to your package.json). Pass the config flag to specify a custom path to your `--config` file.
```sh
esmbly run --config ./config/esmbly.config.js
```

## Running Esmbly in silent mode
Pass the `--silent` flag to run Esmbly without outputting anything to the console.
```sh
esmbly run --silent
```

## Running Esmbly without outputting any files
Pass the `--dryRun` flag to run Esmbly without outputting any files. This is useful for debugging.
```sh
esmbly run --dryRun
```

## Running Esmbly without a configuration file
It is possible to run Esmbly without a config file by passing the following CLI flags. These flags will override the config file (if it exists). 
```sh
esmbly run --input ./src/add.js --transformers jsdoc --output .ts
```
