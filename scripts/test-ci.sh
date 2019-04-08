#! /bin/bash

node_version=$(node -v);

if  [ ${node_version:1:1} -gt 10 ];
  then
    $(yarn test:ci)
  else
    $(yarn test:node8)
fi
