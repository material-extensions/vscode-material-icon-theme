#!/usr/bin/env bash

# Only for GitHub Actions

set -e

pr_number="$1"
status="$2"
label="$3"

if [ "$status" == "failure" ]; then
    gh pr edit "$pr_number" --add-label "$label"
else
    gh pr edit "$pr_number" --remove-label "$label"
fi
