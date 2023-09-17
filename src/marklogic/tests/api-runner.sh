#!/bin/bash

set -e

# Expect option "features" or "collections" to be passed in
if [ $# -eq 0 ]; then
    echo "No arguments provided. Please specify either 'features' or 'collections'"
    exit 1
fi

api=$1
tests=/tmp/api-runner.collections.json

for mode in clear insert modify get; do
    echo "Running $mode tests"
    node tests/api/services/${api}/run.js --mode="$mode" >$tests
    newman run $tests
done
