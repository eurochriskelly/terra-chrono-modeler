#!/bin/bash
#
# TODO:
#
# - Install a json reporter and parse all reports in a last step for automated full check
#
# set -e

# Expect option "features" or "collections" to be passed in
if [ $# -eq 0 ]; then
    echo "No arguments provided. Please specify either 'features' or 'collections'"
    exit 1
fi

api=$1
tests=/tmp/api-runner.collections.json


for mode in clear insert modify get; do
    while true; do
        echo "Running tests for mode [$mode] and api [$api]"
        node tests/api/services/${api}/run.js \
            --api="$api" \
            --mode="$mode" >$tests
        if [ "$(cat $tests | wc -l)" -lt 2 ]; then
            echo "No tests found for $mode"
            break  # Exit the inner loop if no tests found
        fi
        newman run $tests

        echo ""
        echo "Test for mode [$mode] complete"
        echo "Press ENTER to read next test or 'r' to repeat: "
        read input

        case $input in
            r)
                continue  # Repeat the inner loop
                ;;
            *)
                break  # Exit the inner loop
                ;;
        esac
    done
done
