# `@esmbly/cli`
<p>
  <a title="MIT License" href="LICENSE">
    <img src="https://img.shields.io/github/license/gridsome/gridsome.svg?style=flat-square&label=License&colorB=6cc24a">
  </a>
  <a title="Build Status" href="https://travis-ci.org/esmbly/esmbly">
    <img src="https://travis-ci.org/esmbly/esmbly.svg?branch=master">
  </a>
  <a href="https://coveralls.io/github/esmbly/esmbly?branch=master" href="Coverage Status">
    <img src="https://coveralls.io/repos/github/esmbly/esmbly/badge.svg?branch=master" />
  </a>
</p>

The command-line interface for **Esmbly**.

## Installation
```sh
# Using Yarn:
yarn add @esmbly/cli

# Or, using NPM:
npm install @esmbly/cli --save
```

## Getting Started
Check out ["Using the CLI" ](/docs/using-the-cli) for a step-by-step guide on how to get started with the `@esmbly/cli`.

## Usage

**From a terminal**
```sh
# Using Yarn:
yarn run esmbly run

# Using NPM:
./node_modules/.bin/esmbly run

# Or, using NPX:
npx esmbly run
```

**From `package.json`**
```json
{
  "scripts": {
    "transform": "esmbly run",
  },
}
```

## Commands
### `run`
Runs Esmbly. By default, the configuration file will be assumed to be called `esmbly.config.js` located in the root of the project.
```sh
esmbly run

Run Esmbly

Options:
  --config, -c        Configuration file path                           [string]
  --silent            Silence output to the console   [boolean] [default: false]
  --input, -i         The files you want to transform                    [array]
  --transformers, -t  The transformer you want to use                    [array]
  --output, -o        The output formats you want to use                 [array]
  --dry-run           Run transformations without outputting any files [boolean]
  --print-config      Print configuration and then abort               [boolean]
  --help              Show help                                        [boolean]
```


### `init`
Creates a new Esmbly configuration file and (optionally) installs the specified transformers.
```sh
esmbly init

Create an Esmbly configuration file

Options:
  --default  Use default configuration                [boolean] [default: false]
  --force    Overwrite any existing config file       [boolean] [default: false]
  --help     Show help                                                 [boolean]
```


## Contributing
All types of contributions are very much welcome. Check out our [**Contributing Guide**](CONTRIBUTING.md) for instructions on how to get started.
