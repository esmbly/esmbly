#! /bin/bash

node_version=$(node -v);

if  [ ${node_version:1:1} = 8 ];
  then
    yarn test-node8
  else
    yarn coverage
    yarn coveralls
    yarn build-e2e
    yarn test-e2e
fi
