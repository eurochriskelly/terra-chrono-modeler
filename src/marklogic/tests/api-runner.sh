#!/bin/bash

#set -e

echo "Running clearData tests"
tests=/tmp/api-runner.collections.json
#node tests/api-runner.js --mode="clearData" >$tests
#newman run $tests

echo "Running insertData tests"
#node tests/api-runner.js --mode="insertData" >$tests
#newman run $tests

echo "Running modifyData tests"
#node tests/api-runner.js --mode="modifyData" >$tests
#newman run $tests

node tests/api-runner.js --mode="getters" >$tests
newman run $tests
