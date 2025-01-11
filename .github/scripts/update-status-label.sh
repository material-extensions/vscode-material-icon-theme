#!/usr/bin/env bash

# Only for GitHub Actions
# Parameters: <pr_number> <status> <label>
# Example: ./update-status-label.sh 1234 failure "invalid-colors"

# Exit on error
set -e

pr_number="$1"
status="$2"
label="$3"

action="add-label" && [ "$status" == "success" ] && action="remove-label"

# Add or remove label
export GH_TOKEN="$GITHUB_TOKEN"
gh pr edit "$pr_number" --$action "$label"

[ "$action" == "add-label" ] && echo "✅ Added \"$label\" label to PR #$pr_number"
[ "$action" == "remove-label" ] && echo "✅ Removed \"$label\" label from PR #$pr_number"

# 0 = success
exit 0
