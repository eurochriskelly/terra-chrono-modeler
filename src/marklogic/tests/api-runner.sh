#!/bin/bash

set -e

# Expect option "features" or "collections" to be passed in
if [ $# -eq 0 ]; then
    echo "No arguments provided. Please specify either 'features' or 'collections'"
    exit 1
fi

api=$1
tests=/tmp/api-runner.collections.json

for mode in clear insert get; do
#for mode in clear insert modify get; do
    echo "Running tests for mode [$mode] and api [$api]"
    node tests/api/services/${api}/run.js \
        --api="$api" \
        --mode="$mode" >$tests
    if [ "$(cat $tests|wc -l)" -lt 2 ]; then
        echo "No tests found for $mode"
        continue
    fi
    newman run $tests
done
