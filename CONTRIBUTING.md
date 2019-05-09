# How to Contribute

## Where to start?
- [Issues labeled "good first issue"](https://github.com/esmbly/esmbly/labels/good%20first%20issue)
- [Issues labeled "help wanted"](https://github.com/esmbly/esmbly/labels/help%20wanted)
- Improve the documentation
- Add a new example
- Add a new guide
- Propose a new feature by [opening an issue](https://github.com/esmbly/esmbly/issues/new)

## Commit guidelines
This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/) specification.

Commit messages should be structured as follows:
```
<type>[optional scope]: <description>
docs: add user story
```

## Repo structure 
The Esmbly project uses a [monorepo](https://en.wikipedia.org/wiki/Monorepo) approach. This makes it easier to make (and test) changes across packages. All packages are located in the `packages` directory.
```
|-- packages
    |-- cli .................... Command line interface
    |-- core ................... Core functionality (Generate AST, Run transformers)
    |-- printer ................ Responsible for printing to the console
    |-- transformer-v8 ......... V8 transformer
    |-- transformer-flow ....... Flow transformer
    |-- transformer-jsdoc ...... JSDoc transformer
    |-- transformer-wasm ....... WebAssembly transformer
    |-- types .................. Shared type definitions
    |-- utils .................. Shared utilities
```

## Contribution process

### Overview
1. Fork this project.
1. Installing your local dev environment
1. Create a feature branch.
1. Make your changes.
1. Run the tests.
1. Push your changes to your fork/branch.
1. Open a pull request.

### 1. Fork

1. Click the fork button up top.
1. Clone your fork locally (Notice that git's `origin` reference will point to your forked repository).
1. It is useful to have the upstream repository registered as well using: `git remote add upstream https://github.com/esmbly/esmbly.git` and periodically fetch it using `git fetch upstream`.

### 2. Installing your local dev environment

#### Prerequisites
- Node.js >= v.10
- Yarn

```sh
yarn install
```

### 3. Create a feature branch

Create and switch to a new feature branch: `git checkout -b {branch_name} upstream/master`  
(replace `{branch_name}` with a meaningful name that describes your feature or change).

### 4. Make your changes

Now that you have a new branch you can edit/create/delete files.

### 5. Run the tests

- Run tests: `yarn test`.
- Run lint: `yarn lint`.
- Run e2e tests: `yarn test-e2e`.

### 6. Push your changes to your fork/branch

After lint and all tests pass, push the changes to your fork/branch on GitHub: `git push origin {branch_name}`.

### 7. Create a pull request

Create a pull request on GitHub for your feature branch.
