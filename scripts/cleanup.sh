#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Use find to locate and remove specific files and directories
find . -type d \( -name '.turbo' -o -name '.next' -o -name 'stylelintcache' \) -exec rm -rf {} +
find . -type f -name '.env.bak' -exec rm -f {} +
