#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

rm -rf node_modules

# Use find to locate and remove specific files and directories
find . -type d -name 'node_modules' -exec rm -rf {} +
find . -type f \( -name 'bun.lock' -o -name 'bun.lockb' -o -name 'pnpm-lock.yaml' -o -name 'package-lock.json' -o -name 'yarn.lock' \) -exec rm -f {} +
