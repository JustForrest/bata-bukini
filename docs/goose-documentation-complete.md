# Goose by Block - Complete Documentation

*Generated from Context7 on August 14, 2025*

## Overview

Goose is an open-source AI agent that automates complex engineering tasks, from building projects to debugging and orchestrating workflows, autonomously. It provides both a Command Line Interface (CLI) and a Desktop application for interacting with AI agents to accomplish various development and automation tasks.

## Table of Contents

1. [Installation](#installation)
2. [Getting Started](#getting-started)
3. [Configuration](#configuration)
4. [Core Commands](#core-commands)
5. [Extensions and MCP Servers](#extensions-and-mcp-servers)
6. [Recipes and Workflows](#recipes-and-workflows)
7. [Advanced Features](#advanced-features)
8. [Developer Resources](#developer-resources)
9. [Troubleshooting](#troubleshooting)
10. [Code Examples](#code-examples)

## Installation

### Quick Install (All Platforms)
```bash
curl -fsSL https://github.com/block/goose/releases/download/stable/download_cli.sh | bash
```

### Without Interactive Configuration
```bash
curl -fsSL https://github.com/block/goose/releases/download/stable/download_cli.sh | CONFIGURE=false bash
```

### macOS/Linux/Windows Alternative
```bash
brew install pipx
pipx ensurepath
pipx install goose-ai
```

### Building from Source
```bash
git clone git@github.com:block/goose.git
cd goose
source ./bin/activate-hermit
cd ui/desktop
npm install
npm run start
```

## Getting Started

### Initial Configuration

After installation, configure Goose with your preferred LLM provider:

```bash
goose configure
```

This will start an interactive configuration process:

```
┌   goose-configure
│
◇ What would you like to configure?
│ Configure Providers
│
◇ Which model provider should we use?
│ OpenAI / Google Gemini / Anthropic / etc.
│
◇ Provider requires API_KEY, please enter a value
│ [Your API Key]
│
◇ Enter a model from that provider:
│ gpt-4o / claude-3.5-sonnet / gemini-2.0-flash-exp
│
└ Configuration saved successfully
```

### First Session

Start your first Goose session:

```bash
goose session start
```

Or launch the web interface:

```bash
goose web --open
```

## Configuration

### Environment Variables

#### Core Configuration
```bash
# Model Configuration
export GOOSE_PROVIDER="anthropic"
export GOOSE_MODEL="claude-3.5-sonnet"
export GOOSE_TEMPERATURE=0.7

# Planning Configuration
export GOOSE_PLANNER_PROVIDER="openai"
export GOOSE_PLANNER_MODEL="gpt-4"

# Tool Configuration
export GOOSE_MODE="smart_approve"
export GOOSE_TOOLSHIM=true
export GOOSE_CLI_MIN_PRIORITY=0.2

# Session Management
export GOOSE_MAX_TURNS=100
export GOOSE_CLI_THEME="dark"
```

#### Provider-Specific Variables

**OpenAI:**
```bash
export OPENAI_API_KEY="your-api-key"
export OPENAI_HOST="https://api.openai.com/v1"  # Optional for custom endpoints
export OPENAI_ORGANIZATION="org-id"  # Optional
export OPENAI_PROJECT="project-id"  # Optional
```

**Anthropic:**
```bash
export ANTHROPIC_API_KEY="your-api-key"
```

**Google Gemini:**
```bash
export GOOGLE_API_KEY="your-api-key"
```

**Azure OpenAI:**
```bash
export AZURE_OPENAI_API_KEY="your-api-key"
export AZURE_OPENAI_ENDPOINT="https://your-resource.openai.azure.com/"
```

**Databricks:**
```bash
export DATABRICKS_API_KEY="dapi-..."
export DATABRICKS_HOST="https://your-workspace.cloud.databricks.com"
```

### Configuration File

Create `~/.config/goose/config.yaml`:

```yaml
# Model Configuration
GOOSE_PROVIDER: "anthropic"
GOOSE_MODEL: "claude-3.5-sonnet"
GOOSE_TEMPERATURE: 0.7

# Planning Configuration
GOOSE_PLANNER_PROVIDER: "openai"
GOOSE_PLANNER_MODEL: "gpt-4"

# Tool Configuration
GOOSE_MODE: "smart_approve"
GOOSE_TOOLSHIM: true
GOOSE_CLI_MIN_PRIORITY: 0.2

# Extensions Configuration
extensions:
  developer:
    bundled: true
    enabled: true
    name: developer
    timeout: 300
    type: builtin
  
  memory:
    bundled: true
    enabled: true
    name: memory
    timeout: 300
    type: builtin
```

## Core Commands

### Session Management

```bash
# Start new session
goose session

# Resume previous session
goose session -r

# List all sessions
goose session list

# Export session to markdown
goose session export --name my-session --output session.md
```

### Running Tasks

```bash
# Execute from instruction file
goose run -i instructions.md

# Execute inline command
goose run -t "Create a README for this project"

# Interactive mode after processing
goose run -i instructions.md --interactive

# With specific extensions
goose run -t "task" --with-builtin developer --with-extension "python server.py"
```

### Configuration and Information

```bash
# Configure Goose
goose configure

# View current configuration
goose info -v

# Validate recipe
goose recipe validate recipe.yaml

# Generate recipe deeplink
goose recipe deeplink recipe.yaml
```

### Web Interface

```bash
# Start web server
goose web

# Start on specific port and open browser
goose web --port 8080 --open

# Bind to specific host
goose web --host 0.0.0.0 --port 8080
```

## Extensions and MCP Servers

### Built-in Extensions

Enable built-in extensions through configuration:

```bash
goose configure
# Select "Add Extension" -> "Built-in Extension"
```

Available built-in extensions:
- **Developer Tools**: Code editing, file management, terminal access
- **Computer Controller**: Web scraping, file caching, automations
- **Memory**: Persistent knowledge storage
- **JetBrains**: IDE integration
- **Google Drive**: Drive file access

### Installing MCP Servers

#### GitHub Integration
```bash
npx -y @modelcontextprotocol/server-github
```

#### Web Search (Brave)
```bash
npx -y @modelcontextprotocol/server-brave-search
```

#### Filesystem Access
```bash
npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/directory
```

#### Database Integration
```bash
npx -y @modelcontextprotocol/server-postgres "postgresql://username:password@hostname:5432/database"
```

#### Browser Automation
```bash
npx -y @playwright/mcp@latest
```

### Goose Desktop Extension Installation

Use custom URL schemes for one-click installation:

```
goose://extension?cmd=npx&arg=-y&arg=@modelcontextprotocol/server-github&id=github&name=GitHub&description=GitHub%20integration&env=GITHUB_PERSONAL_ACCESS_TOKEN=Your%20Token
```

### Command-Line Extension Configuration

```bash
goose configure
# Select "Add Extension" -> "Command-line Extension"
# Name: github
# Command: npx -y @modelcontextprotocol/server-github
# Timeout: 300
# Environment Variables: GITHUB_PERSONAL_ACCESS_TOKEN=your-token
```

## Recipes and Workflows

### Creating Recipes

Generate a recipe from current session:
```bash
/recipe my-custom-recipe.yaml
```

### Recipe Structure

```yaml
version: "1.0.0"
title: "Example Recipe"
description: "A sample recipe demonstrating the format"
instructions: "Follow these steps with {{ required_param }} and {{ optional_param }}"
prompt: "Your task is to use {{ required_param }}"

parameters:
  - key: required_param
    input_type: string
    requirement: required
    description: "A required parameter example"
  
  - key: optional_param
    input_type: string
    requirement: optional
    default: "default value"
    description: "An optional parameter example"

extensions:
  - type: stdio
    name: codesearch
    cmd: uvx
    args:
      - mcp_codesearch@latest
    timeout: 300
    bundled: true
    description: "Query codesearch directly from goose"

response:
  json_schema:
    type: object
    properties:
      result:
        type: string
        description: "The main result of the task"
      details:
        type: array
        items:
          type: string
        description: "Additional details of steps taken"
    required:
      - result
```

### Using Recipes

```bash
# Load recipe in session
goose run --recipe recipe.yaml

# Validate recipe syntax
goose recipe validate recipe.yaml

# Generate shareable link
goose recipe deeplink recipe.yaml
```

## Advanced Features

### Memory and Knowledge Management

#### Using Memory Extension

```bash
# Remember information
"Remember that when I ask about Python, I want to conform to the following standards..."

# Search memory
"Search for Python development standards"
```

#### Cognee Knowledge Graph

```bash
# Store structured knowledge
"Goose, learn these security vulnerability patterns and their relationships..."

# Query knowledge graph
"Goose, what's the relationship between SQL injection and parameterized queries?"
```

### Planning Mode

Configure separate models for planning:

```bash
export GOOSE_PLANNER_PROVIDER="openai"
export GOOSE_PLANNER_MODEL="gpt-4"
```

Example planning prompt:
```
"Hey Goose, can you create a plan to convert my CLI project into a locally hosted web page? Please don't start the actual work"
```

### Context Management

```bash
# Set context limits
export GOOSE_CONTEXT_LIMIT=200000
export GOOSE_LEAD_CONTEXT_LIMIT=500000
export GOOSE_WORKER_CONTEXT_LIMIT=128000

# Context handling strategy
export GOOSE_CONTEXT_STRATEGY=summarize  # or 'prompt'
```

### Tool Execution Modes

```bash
# Automatic execution
export GOOSE_MODE="auto"

# Require approval for each tool
export GOOSE_MODE="approve"

# Smart approval (safer operations auto-approved)
export GOOSE_MODE="smart_approve"

# Chat only (no tool execution)
export GOOSE_MODE="chat"
```

## Developer Resources

### Building MCP Extensions

#### Python MCP Server Example

```python
import requests
from bs4 import BeautifulSoup
from html2text import html2text
from mcp.server.fastmcp import FastMCP
from mcp.shared.exceptions import McpError
from mcp.types import ErrorData, INTERNAL_ERROR, INVALID_PARAMS

mcp = FastMCP("wiki")

@mcp.tool()
def read_wikipedia_article(url: str) -> str:
    """
    Fetch a Wikipedia article at the provided URL, parse its main content,
    convert it to Markdown, and return the resulting text.
    """
    try:
        if not url.startswith("http"):
            raise ValueError("URL must start with http or https.")

        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            raise McpError(
                ErrorData(
                    INTERNAL_ERROR,
                    f"Failed to retrieve the article. HTTP status code: {response.status_code}"
                )
            )

        soup = BeautifulSoup(response.text, "html.parser")
        content_div = soup.find("div", {"id": "mw-content-text"})
        if not content_div:
            raise McpError(
                ErrorData(
                    INVALID_PARAMS,
                    "Could not find the main content on the provided Wikipedia URL."
                )
            )

        markdown_text = html2text(str(content_div))
        return markdown_text

    except Exception as e:
        raise McpError(ErrorData(INTERNAL_ERROR, f"Unexpected error: {str(e)}")) from e

if __name__ == "__main__":
    mcp.run()
```

#### TypeScript MCP Server Example

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "Extension Name",
  version: "1.0.0",
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

#### Testing Extensions

```bash
# Python example
goose session --with-extension "python server.py"

# TypeScript example
goose session --with-extension "node server.js"
```

### Project Setup

```bash
# Initialize MCP project
uv init mcp-wiki
cd mcp-wiki
mkdir -p src/mcp_wiki
touch src/mcp_wiki/server.py
touch src/mcp_wiki/__init__.py
touch src/mcp_wiki/__main__.py

# Install dependencies
uv sync
source .venv/bin/activate

# Test the server
mcp dev src/mcp_wiki/server.py
```

### Rust FFI

```bash
# Build FFI library
cargo build --release --package goose-ffi

# Run Python example
DATABRICKS_HOST=... DATABRICKS_API_KEY=... python crates/goose-ffi/examples/goose_agent.py
```

## Troubleshooting

### Common Issues

#### API Key/Credit Errors
```bash
# Reconfigure provider
goose configure
```

#### Permission Issues (macOS)
```bash
# Check directory permissions
ls -ld ~/.config

# Fix permissions
chmod u+rw ~/.config
mkdir -p ~/.config
```

#### Binary Quarantine (macOS)
```bash
# Remove quarantine attribute
xattr -d com.apple.quarantine goose
```

### Debug Mode

```bash
# Enable detailed logging
goose run --debug

# Enable Rust logging
RUST_LOG=debug goose bench bench-config.json
```

### Configuration Verification

```bash
# View current configuration
goose info -v
```

## Code Examples

### Basic Prompts

```
# Simple tasks
"create an interactive browser-based tic-tac-toe game in javascript"
"open index.html in a browser"

# Project setup
"set up a new JavaScript project with Express, Mongoose, Nodemon, and Dotenv"

# Code analysis
"Review this pull request and check it against my coding preferences"
```

### Advanced Workflows

```
# Multi-step automation
"Goose, pull all uncompleted tasks assigned to me in Asana. Group them by type of work to reduce context switching. Estimate how long each task will take. Then, schedule each task accordingly in my Google Calendar."

# Data analysis
"Extract for developer conferences (attendance > 500) occurring between 2022-2024: conference name, dates, CFP timeline. Structure results as JSON."
```

### CI/CD Integration

```yaml
# GitHub Actions workflow
name: Goose

on:
  pull_request:
    types: [opened, synchronize, reopened, labeled]

permissions:
  contents: write
  pull-requests: write
  issues: write

env:
  PROVIDER_API_KEY: ${{ secrets.OPENAI_API_KEY }}
  PR_NUMBER: ${{ github.event.pull_request.number }}

jobs:
  goose-review:
    runs-on: ubuntu-latest
    steps:
      - name: Install Goose CLI
        run: |
          mkdir -p /home/runner/.local/bin
          curl -fsSL https://github.com/block/goose/releases/download/stable/download_cli.sh \
            | CONFIGURE=false INSTALL_PATH=/home/runner/.local/bin bash
          echo "/home/runner/.local/bin" >> $GITHUB_PATH

      - name: Configure Goose
        run: |
          mkdir -p ~/.config/goose
          cat <<EOF > ~/.config/goose/config.yaml
          GOOSE_PROVIDER: openai
          GOOSE_MODEL: gpt-4o
          keyring: false
          EOF

      - name: Run Goose Review
        run: |
          goose run -t "Review this pull request and provide feedback"
```

### Container Usage

```bash
# Run in Docker
docker-compose -f documentation/docs/docker/docker-compose.yml run --rm goose-cli

# With Container Use extension
export GOOSE_TOOLSHIM=1
goose session --with-builtin container-use
```

### Keyboard Shortcuts (CLI)

```
Ctrl+C: Interrupt current request
Ctrl+J: Add newline
Cmd+Up/Down: Navigate command history

/exit or /quit: Exit session
/t: Toggle theme (light/dark/ansi)
/? or /help: Display help menu
```

---

## Links and Resources

- **GitHub Repository**: https://github.com/block/goose
- **Documentation Site**: https://block.github.io/goose/
- **Model Context Protocol**: https://modelcontextprotocol.io/
- **Community Discord**: [Join the community](https://discord.gg/goose-community)

---

*This documentation was generated from Context7 and represents the comprehensive capabilities of Goose by Block as of August 2025. For the most up-to-date information, please refer to the official documentation.*
