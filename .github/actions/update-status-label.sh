#!/usr/bin/env bash

# Only for GitHub Actions
# Parameters: <pr_number> <status> <label>
# Example: ./update-status-label.sh 1234 success "ready-for-review"

# Exit on error
set -e

pr_number="$1"
status="$2"
label="$3"

action="add-label" && [ "$status" == "success" ] && action="remove-label"

# Add or remove label
gh pr edit "$pr_number" --${action} "$label"
