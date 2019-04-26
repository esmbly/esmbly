#! /bin/bash
yarn run lerna bootstrap
yarn clean-examples
yarn build
yarn test e2e
