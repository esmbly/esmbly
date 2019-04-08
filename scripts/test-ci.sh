#! /bin/bash

node_version=$(node -v);

if  [ ${node_version:1:1} = 8 ];
  then
    exec yarn test:node8
  else
    exec yarn test:ci
fi
