# `@esmbly/printer`
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

Shared printing utilities for **Esmbly**.

Used by `@esmbly/core`, `@esmbly/cli` and the transformers. 

## Usage
```js
import { printer } from '@esmbly/printer';

// Print some info
printer.print('some info..');

// Print an error
printer.error('an error..');

// Print warnings
printer.printWarnings([Warning]);

// Silence the printer
printer.setErrorStream(null);
printer.setOutStream(null);
```

## Contributing
All types of contributions are very much welcome. Check out our [**Contributing Guide**](CONTRIBUTING.md) for instructions on how to get started.
