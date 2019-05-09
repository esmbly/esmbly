# End to End Tests

### Running the tests
```sh
yarn clean-examples
yarn build
yarn test:e2e
```

### Adding a new test
1. Create a new example in `/examples`. Look at an existing example for guidance.
1. Run the command `yarn run lerna bootstrap`
1. Add a new test file in `/e2e`. Look at existing tests for guidance.
