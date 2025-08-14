#!/bin/bash
# Shebang: tells the system to execute this script with bash

# Change to the project root directory (two levels up from this script)
# $(dirname "$0") gets the directory where this script is located
# /../.. goes up two directory levels (scripts -> docker -> project root)
cd "$(dirname "$0")/../.."

# If no arguments provided, start interactive shell
if [ $# -eq 0 ]; then
    docker run -it --rm \
      -v "$(pwd):/workspace" \
      -w /workspace \
      --name gemini-sandbox \
      --entrypoint /bin/bash \
      bata-bukini/gemini-sandbox
else
    # Run gemini with provided arguments
    docker run -it --rm \
      -v "$(pwd):/workspace" \
      -w /workspace \
      --name gemini-sandbox \
      bata-bukini/gemini-sandbox \
      "$@"
fi