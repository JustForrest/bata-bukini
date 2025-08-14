#!/bin/bash
# Shebang: tells the system to execute this script with bash

# Change to the project root directory (two levels up from this script)
# $(dirname "$0") gets the directory where this script is located
# /../.. goes up two directory levels (scripts -> docker -> project root)
cd "$(dirname "$0")/../.."

# Run Docker with the following options:
docker run \
  -it \                                    # Interactive + TTY (allows you to type commands)
  --rm \                                   # Remove container when it exits (cleanup)
  -v "$(pwd):/workspace" \                 # Mount current dir to /workspace in container
  -w /workspace \                          # Set working directory inside container
  --name gemini-sandbox \                  # Give the container a name (easier to manage)
  bata-bukini/gemini-sandbox \            # The image we built
  "$@"                                     # Pass all script arguments to gemini command