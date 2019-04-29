#! /bin/bash

node_version=$(node -v);

if  [ ${node_version:1:1} = 8 ];
  then
    yarn test:node8
  else
    yarn coverage
    yarn coveralls
    scripts/test-e2e.sh
fi
