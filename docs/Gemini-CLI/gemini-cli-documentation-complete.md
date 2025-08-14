# Gemini CLI - Complete Documentation

A comprehensive guide to Google's Gemini CLI - an AI-powered command-line interface for code understanding, workflow acceleration, and intelligent automation.

## Table of Contents

1. [Installation & Setup](#installation--setup)
2. [Authentication](#authentication)
3. [Core Usage](#core-usage)
4. [Configuration](#configuration)
5. [Built-in Commands](#built-in-commands)
6. [Tools & Capabilities](#tools--capabilities)
7. [Sandboxing](#sandboxing)
8. [Extensions & Customization](#extensions--customization)
9. [Advanced Features](#advanced-features)
10. [Troubleshooting](#troubleshooting)
11. [Quotas & Pricing](#quotas--pricing)
12. [Terms & Privacy](#terms--privacy)

---

## Installation & Setup

### Installation Methods

#### Global Installation with npm
```bash
npm install -g @google/gemini-cli
gemini
```

#### Using npx (No Installation Required)
```bash
npx @google/gemini-cli
```

#### Homebrew (macOS/Linux)
```bash
brew install gemini-cli
gemini
```

#### Development Version
```bash
# Latest nightly build
npm install -g @google/gemini-cli@nightly

# Latest from GitHub
npx https://github.com/google-gemini/gemini-cli
```

#### Docker Sandbox
```bash
docker run --rm -it us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.1.1
```

### Verification
```bash
gemini --version
```

---

## Authentication

Gemini CLI supports multiple authentication methods depending on your use case and account type.

### Gemini API Key (Google AI Studio)
```bash
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

#### Persistent Setup
```bash
echo 'export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"' >> ~/.bashrc
source ~/.bashrc
```

### Google Cloud / Vertex AI

#### Basic Setup
```bash
export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
export GOOGLE_CLOUD_LOCATION="us-central1"
```

#### Application Default Credentials
```bash
gcloud auth application-default login
```

#### Vertex AI Express Mode
```bash
export GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"
export GOOGLE_GENAI_USE_VERTEXAI=true
```

#### Persistent Configuration
```bash
echo 'export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"' >> ~/.bashrc
echo 'export GOOGLE_CLOUD_LOCATION="us-central1"' >> ~/.bashrc
source ~/.bashrc
```

### Environment Files

#### User-wide Configuration
```bash
mkdir -p ~/.gemini
cat >> ~/.gemini/.env <<'EOF'
GOOGLE_CLOUD_PROJECT="your-project-id"
GEMINI_API_KEY="your-gemini-api-key"
EOF
```

#### Project-specific Configuration
```bash
mkdir -p .gemini
echo 'GOOGLE_CLOUD_PROJECT="your-project-id"' >> .gemini/.env
```

---

## Core Usage

### Interactive Mode
```bash
gemini
> Write me a Discord bot that answers questions using a FAQ.md file
```

### Non-Interactive Mode
```bash
# Direct prompt
gemini -p "What is fine tuning?"

# From pipe
echo "What is fine tuning?" | gemini

# Interactive with initial prompt
gemini -i "explain this code"
```

### File Context Injection
```bash
# Include specific file
gemini -p "@README.md Explain this project"

# Include directory
gemini -p "@src/ Summarize the code in this directory"

# Include all files in current directory
gemini -a -p "Analyze the entire codebase"
```

---

## Configuration

### Settings File Locations

#### User Settings (Global)
- **Path**: `~/.gemini/settings.json`
- **Scope**: Current user, all sessions

#### Project Settings (Local)
- **Path**: `.gemini/settings.json` (in project root)
- **Scope**: Specific project only

#### System Settings
- **Linux**: `/etc/gemini-cli/settings.json`
- **Windows**: `C:\ProgramData\gemini-cli\settings.json`
- **macOS**: `/Library/Application Support/GeminiCli/settings.json`

### Configuration Precedence Order
1. Default values (lowest precedence)
2. User settings file (`~/.gemini/settings.json`)
3. Project settings file (`.gemini/settings.json`)
4. System settings file
5. Environment variables
6. Command-line arguments (highest precedence)

### Example Complete Configuration
```json
{
  "theme": "GitHub",
  "sandbox": "docker",
  "toolDiscoveryCommand": "bin/get_tools",
  "toolCallCommand": "bin/call_tool",
  "mcpServers": {
    "mainServer": {
      "command": "bin/mcp_server.py"
    },
    "anotherServer": {
      "command": "node",
      "args": ["mcp_server.js", "--verbose"]
    }
  },
  "telemetry": {
    "enabled": true,
    "target": "local",
    "otlpEndpoint": "http://localhost:4317",
    "logPrompts": true
  },
  "usageStatisticsEnabled": true,
  "hideTips": false,
  "hideBanner": false,
  "maxSessionTurns": 10,
  "summarizeToolOutput": {
    "run_shell_command": {
      "tokenBudget": 100
    }
  },
  "vimMode": false,
  "autoAccept": false,
  "checkpointing": {
    "enabled": false
  },
  "fileFiltering": {
    "respectGitIgnore": true,
    "enableRecursiveFileSearch": false
  }
}
```

### Environment Variables
```bash
# API Configuration
export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
export GEMINI_MODEL="gemini-1.5-pro-latest"
export GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"
export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
export GOOGLE_CLOUD_LOCATION="us-central1"

# Sandbox Configuration
export GEMINI_SANDBOX=true
export SEATBELT_PROFILE=permissive-open  # macOS only

# Debug and Development
export DEBUG=1
export NO_COLOR=1
export CLI_TITLE="My Custom CLI"
```

---

## Built-in Commands

### Session Management
```bash
# File bug report
/bug <issue headline>

# Clear screen
/clear

# Compress chat context to save tokens
/compress

# Copy last output to clipboard
/copy

# Exit CLI
/quit
/exit
```

### Chat State Management
```bash
# Save current conversation
/chat save <tag>

# Resume saved conversation
/chat resume <tag>

# List saved conversations
/chat list
```

### Information & Configuration
```bash
# Show help
/help
/?

# Show CLI information
/about

# View usage statistics
/stats

# Change theme
/theme

# Change authentication method
/auth

# Toggle vim mode
/vim

# Show privacy notice
/privacy
```

### Memory Management
```bash
# Add information to AI memory
/memory add <text to remember>

# Show current memory content
/memory show

# Refresh memory from files
/memory refresh
```

### File & Directory Operations
```bash
# Include file/directory content in prompt
@<path_to_file_or_directory> [additional_prompt_text]

# Examples:
@README.md Explain this project
@src/ Summarize the code
@path/to/file.txt What does this do?
```

### Shell Integration
```bash
# Execute shell command
!<shell_command>

# Examples:
!ls -la
!git status
!npm install

# Toggle shell mode
!
```

### Tool & Extension Management
```bash
# List available tools
/tools
/tools desc        # Show descriptions
/tools nodesc      # Hide descriptions

# List extensions
/extensions

# MCP server management
/mcp               # Show server status
/mcp desc          # Show tool descriptions
/mcp auth          # List servers requiring auth
/mcp auth <server> # Authenticate with server
```

### Advanced Features
```bash
# Open external editor
/editor

# Checkpointing (requires --checkpointing flag)
/restore [tool_call_id]
```

---

## Tools & Capabilities

### File System Tools

#### List Directory
```python
list_directory(path: string, ignore?: string[], respect_git_ignore?: boolean)
```

#### Read File
```python
read_file(path: string, offset?: number, limit?: number)
# Supports text, images (PNG, JPG, GIF, WEBP, SVG, BMP), and PDF files
```

#### Write File
```python
write_file(file_path: string, content: string)
# Creates file and directories if needed, requires confirmation
```

#### Search File Content
```python
search_file_content(pattern: string, path?: string, include?: string)
# Uses regex patterns, leverages git grep or system grep
```

#### Find Files (Glob)
```python
glob(pattern: string, path?: string, case_sensitive?: boolean, respect_git_ignore?: boolean)
# Examples: "*.py", "src/**/*.js"
```

#### Edit Files
```python
replace(file_path: string, old_string: string, new_string: string, expected_replacements?: number)
# Precise text replacement with context validation
```

#### Multi-File Operations
```python
read_many_files(paths: string[], exclude?: string[], include?: string[], recursive?: boolean)
# Read multiple files, supports glob patterns and exclusions
```

### Shell Tool
```python
run_shell_command(command: string, description?: string, directory?: string)
# Execute shell commands with sandboxing support
```

#### Shell Command Configuration
```json
{
  "coreTools": ["run_shell_command(git)", "run_shell_command(npm)"],
  "excludeTools": ["run_shell_command(rm)", "run_shell_command(sudo)"]
}
```

### Web Tools

#### Web Search
```python
google_web_search(query: string)
# Perform web searches via Gemini API
```

#### Web Fetch
```python
web_fetch(prompt: string)
# Fetch and process content from URLs (up to 20 URLs)
# Example: web_fetch("Summarize https://example.com/article")
```

### Memory Tool
```python
save_memory(fact: string)
# Save information to GEMINI.md for future recall
```

---

## Sandboxing

Sandboxing provides isolated execution environments for tools that modify files or execute commands.

### Enabling Sandboxing

#### Command Line Flag (Highest Precedence)
```bash
gemini --sandbox
gemini -s
```

#### Environment Variable
```bash
export GEMINI_SANDBOX=true
gemini -p "run the test suite"
```

#### Configuration File (Lowest Precedence)
```json
{
  "sandbox": "docker"
}
```

### Sandbox Types

#### Docker (Default)
```bash
gemini --sandbox
# Uses gemini-cli-sandbox Docker image
```

#### Podman
```bash
export GEMINI_SANDBOX=podman
gemini -s
```

#### Custom Command
```bash
export GEMINI_SANDBOX="custom-sandbox-command"
```

### macOS Seatbelt Profiles
```bash
# Available profiles: {permissive,restrictive}-{open,closed,proxied}
export SEATBELT_PROFILE=permissive-closed
```

### Custom Sandbox Configuration

#### Custom Dockerfile
Create `.gemini/sandbox.Dockerfile`:
```dockerfile
FROM gemini-cli-sandbox

# Add custom dependencies
RUN apt-get update && apt-get install -y some-package
COPY ./my-config /app/my-config
```

Build and run:
```bash
BUILD_SANDBOX=1 gemini -s
```

### Advanced Sandbox Options
```bash
# Custom mounts
export SANDBOX_MOUNTS="/host/path:/container/path"

# Custom ports
export SANDBOX_PORTS="8080:8080"

# Environment variables
export SANDBOX_ENV="VAR1=value1,VAR2=value2"

# UID/GID handling (Linux)
export SANDBOX_SET_UID_GID=true
```

### Debugging Sandbox
```bash
# Enable debug mode
DEBUG=1 gemini -s

# Inspect sandbox environment
gemini -s -p "run shell command: env | grep SANDBOX"
gemini -s -p "run shell command: mount | grep workspace"
```

---

## Extensions & Customization

### Custom Commands

Create custom TOML commands in `~/.gemini/commands/` or `.gemini/commands/`:

#### Basic Command
```toml
# ~/.gemini/commands/refactor/pure.toml
# Invoked via: /refactor:pure

description = "Refactor code into a pure function."

prompt = """
Please analyze the code I've provided in the current context.
Refactor it into a pure function.

Your response should include:
1. The refactored, pure function code block.
2. A brief explanation of the key changes.
"""
```

#### Command with Arguments
```toml
# .gemini/commands/git/fix.toml
# Invoked via: /git:fix "Button is misaligned on mobile"

description = "Generates a fix for a GitHub issue."
prompt = "Please analyze the staged git changes and provide a code fix for the issue: {{args}}."
```

#### Command with Shell Injection
```toml
# .gemini/commands/git/commit.toml
# Invoked via: /git:commit

description = "Generates a Git commit message based on staged changes."
prompt = """
Please generate a Conventional Commit message based on the following git diff:

```diff
!{git diff --staged}
```
"""
```

### File Locations & Precedence
- **User Commands**: `~/.gemini/commands/` (global)
- **Project Commands**: `.gemini/commands/` (project-specific, overrides global)

### Command Namespacing
- `~/.gemini/commands/test.toml` → `/test`
- `<project>/.gemini/commands/git/commit.toml` → `/git:commit`

### Extensions

#### Extension Structure
```
.gemini/extensions/gcp/
├── gemini-extension.json
└── commands/
    ├── deploy.toml
    └── gcs/
        └── sync.toml
```

#### Extension Configuration
```json
{
  "name": "my-extension",
  "version": "1.0.0",
  "mcpServers": {
    "my-server": {
      "command": "node my-server.js"
    }
  },
  "contextFileName": "GEMINI.md",
  "excludeTools": ["run_shell_command"]
}
```

---

## Advanced Features

### Model Context Protocol (MCP) Servers

MCP servers provide custom tools and capabilities to extend Gemini CLI functionality.

#### Basic MCP Configuration
```json
{
  "mcpServers": {
    "pythonTools": {
      "command": "python",
      "args": ["-m", "my_mcp_server", "--port", "8080"],
      "cwd": "./mcp-servers/python",
      "env": {
        "DATABASE_URL": "$DB_CONNECTION_STRING",
        "API_KEY": "${EXTERNAL_API_KEY}"
      },
      "timeout": 15000
    },
    "nodeServer": {
      "command": "node",
      "args": ["dist/server.js", "--verbose"],
      "cwd": "./mcp-servers/node",
      "trust": true
    },
    "dockerizedServer": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm", "-e", "API_KEY",
        "-v", "${PWD}:/workspace",
        "my-mcp-server:latest"
      ],
      "env": {
        "API_KEY": "$EXTERNAL_SERVICE_TOKEN"
      }
    }
  }
}
```

#### HTTP-based MCP Servers
```json
{
  "mcpServers": {
    "httpServer": {
      "httpUrl": "http://localhost:3000/mcp",
      "timeout": 5000
    },
    "httpServerWithAuth": {
      "httpUrl": "http://localhost:3000/mcp",
      "headers": {
        "Authorization": "Bearer your-api-token",
        "Content-Type": "application/json"
      }
    }
  }
}
```

#### Tool Filtering
```json
{
  "mcpServers": {
    "filteredServer": {
      "command": "python",
      "args": ["-m", "my_mcp_server"],
      "includeTools": ["safe_tool", "file_reader", "data_processor"],
      "excludeTools": ["dangerous_tool"],
      "timeout": 30000
    }
  }
}
```

#### OAuth Authentication
```json
{
  "mcpServers": {
    "googleCloudServer": {
      "httpUrl": "https://my-gcp-service.run.app/mcp",
      "authProviderType": "google_credentials",
      "oauth": {
        "scopes": ["https://www.googleapis.com/auth/userinfo.email"]
      }
    }
  }
}
```

### MCP Server Commands
```bash
# Show MCP server status
/mcp

# Show tool descriptions
/mcp desc

# Hide tool descriptions
/mcp nodesc

# Show tool schema
/mcp schema

# Authenticate with server
/mcp auth
/mcp auth <serverName>
```

### GitHub Integration Example

#### GitHub MCP Server Setup
```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

#### Environment Setup
```bash
export GITHUB_PERSONAL_ACCESS_TOKEN="pat_YourActualGitHubTokenHere"
```

### Context Files (GEMINI.md)

Create project-specific instructions in `GEMINI.md`:

```markdown
# Project: My Awesome TypeScript Library

## General Instructions:
- When generating new TypeScript code, please follow the existing coding style.
- Ensure all new functions and classes have JSDoc comments.
- Prefer functional programming paradigms where appropriate.
- All code should be compatible with TypeScript 5.0 and Node.js 20+.

## Coding Style:
- Use 2 spaces for indentation.
- Interface names should be prefixed with `I` (e.g., `IUserService`).
- Private class members should be prefixed with an underscore (`_`).
- Always use strict equality (`===` and `!==`).

## Specific Component: `src/api/client.ts`
- This file handles all outbound API requests.
- When adding new API call functions, ensure they include robust error handling and logging.
- Use the existing `fetchWithRetry` utility for all GET requests.
```

#### Memory Import System
```markdown
# My GEMINI.md

Welcome to my project!

@./getting-started.md

## Features

@./features/overview.md
```

Supported paths:
- `@./file.md` - Same directory
- `@../file.md` - Parent directory
- `@./components/file.md` - Subdirectory
- `@/absolute/path/to/file.md` - Absolute path

### Checkpointing

Enable automatic state snapshots before tool execution:

#### Command Line
```bash
gemini --checkpointing
```

#### Configuration
```json
{
  "checkpointing": {
    "enabled": true
  }
}
```

#### Restore Commands
```bash
# List available checkpoints
/restore

# Restore specific checkpoint
/restore 2025-06-22T10-00-00_000Z-my-file.txt-write_file
```

### Telemetry

#### Enable Telemetry
```json
{
  "telemetry": {
    "enabled": true,
    "target": "local",
    "otlpEndpoint": "http://localhost:4317",
    "logPrompts": true
  }
}
```

#### Setup Local Telemetry Pipeline
```bash
npm run telemetry -- --target=local
```

#### Setup GCP Telemetry
```bash
export OTLP_GOOGLE_CLOUD_PROJECT="your-project-id"
npm run telemetry -- --target=gcp
```

#### Export to File
```bash
gemini --telemetry --telemetry-target=local --telemetry-outfile=/path/to/telemetry.log "your prompt"
```

### Token Caching

View token usage optimization:
```bash
/stats
```

Cached tokens help reduce API costs by reusing context across sessions.

---

## Troubleshooting

### Common Issues

#### Module Not Found Errors
```bash
npm install
```

#### Authentication Issues
```bash
export GOOGLE_CLOUD_PROJECT="your-project-id"
```

#### Update CLI
```bash
npm install -g @google/gemini-cli@latest
```

#### Rebuild from Source
```bash
npm run build
```

#### Enable Debug Mode
```bash
export DEBUG=1
gemini --verbose
```

#### Disable CI Mode
```bash
env -u CI_TOKEN gemini
```

#### Shell Command Issues
First verify the command works in your terminal:
```bash
run_shell_command <your_command_here>
```

#### Pre-flight Checks
```bash
npm run preflight
```

### Development

#### Clone and Build
```bash
git clone https://github.com/google-gemini/gemini-cli.git
cd gemini-cli
npm install
npm run build
```

#### Run from Source
```bash
npm start
```

#### Debug Mode
```bash
npm run debug
```

#### Run Tests
```bash
npm run test
npm run test:e2e
npm run test:integration:all
```

#### Link Locally
```bash
npm link packages/cli
```

### File Exclusion (.geminiignore)

Create `.geminiignore` to exclude files from context:

```
# Exclude packages directory
/packages/

# Exclude API keys
apikeys.txt

# Exclude all .md files except README.md
*.md
!README.md

# Wildcard exclusion
*.log
```

---

## Quotas & Pricing

### Gemini API (Free Tier)
- **Model**: Flash model only
- **Rate Limits**: 10 requests/minute, 250 requests/day
- **Cost**: Free

### Gemini API (Paid Tier)
- **Quotas**: Varies by pricing tier
- **Cost**: Varies by pricing tier and model/token usage
- **Details**: See Gemini API Rate Limits and Pricing documentation

### Gemini Code Assist (Individual)
- **Quotas**: 60 requests/minute, 1000 requests/day
- **Cost**: Free
- **Note**: Data may be used for model training

### Gemini Code Assist (Workspace/Licensed)
- **Standard**: 120 requests/minute, 1500 requests/day
- **Enterprise**: 120 requests/minute, 2000 requests/day
- **Cost**: Fixed price with Workspace/Code Assist subscription
- **Note**: Data not used for training

### Vertex AI (Express Mode)
- **Quotas**: Variable, account-specific
- **Cost**: Standard Vertex AI pricing after Express Mode consumption

### Vertex AI (Regular Mode)
- **Quotas**: Dynamic shared quota system or pre-purchased throughput
- **Cost**: Based on model and token usage

### Usage Statistics
Check current usage:
```bash
/stats
```

---

## Terms & Privacy

### Authentication Method Governance

#### Gemini Code Assist via Google (Individual)
- **Terms**: Google Terms of Service
- **Privacy**: Gemini Code Assist Privacy Notice for Individuals
- **Data Usage**: Prompts, answers, and code may be used for model training

#### Gemini Code Assist via Google (Workspace/Enterprise)
- **Terms**: Google Cloud Platform Terms of Service
- **Privacy**: Gemini Code Assist Privacy Notice for Standard and Enterprise
- **Data Usage**: Data not collected or used for training; treated as confidential

#### Gemini Developer API (Unpaid)
- **Terms**: Gemini API Terms of Service - Unpaid Services
- **Privacy**: Google Privacy Policy
- **Data Usage**: Data may be used for model improvement

#### Gemini Developer API (Paid)
- **Terms**: Gemini API Terms of Service - Paid Services
- **Privacy**: Google Privacy Policy
- **Data Usage**: Data not used for training; logs kept for limited periods

#### Vertex AI GenAI API
- **Terms**: Google Cloud Platform Service Terms
- **Privacy**: Google Cloud Privacy Notice
- **Data Usage**: Data not collected or used for training

### Usage Statistics Control

The `usageStatisticsEnabled` setting controls optional data collection:

```json
{
  "usageStatisticsEnabled": false
}
```

When enabled:
- **Individual accounts**: Collects telemetry AND prompts/answers for improvement
- **Workspace accounts**: Only collects anonymous telemetry
- **Paid API services**: Only collects anonymous telemetry

---

## Command Line Arguments Reference

```bash
# Model and Input
--model <model_name> (-m)          # Specify Gemini model
--prompt <prompt> (-p)             # Non-interactive prompt
--prompt-interactive <prompt> (-i) # Interactive with initial prompt

# File Context
--all-files (-a)                   # Include all files recursively
--include-directories <dirs>       # Include additional directories

# Sandbox and Security
--sandbox (-s)                     # Enable sandbox mode
--sandbox-image <image_uri>        # Custom sandbox image
--yolo                            # Auto-approve all tool calls

# Debugging and Information
--debug (-d)                       # Enable debug mode
--verbose                         # Verbose output
--show-memory-usage               # Display memory usage
--version                         # Show version
--help (-h)                       # Show help

# Extensions and Tools
--extensions <names> (-e)          # Specify extensions to use
--list-extensions (-l)             # List available extensions

# Telemetry and Monitoring
--telemetry                       # Enable telemetry
--telemetry-target <target>       # Set telemetry target
--telemetry-otlp-endpoint <url>   # OTLP endpoint
--telemetry-log-prompts          # Log prompts for telemetry

# Advanced Features
--checkpointing                   # Enable checkpointing
--proxy <proxy_url>              # Set proxy URL
```

---

## Example Use Cases

### Code Analysis and Documentation
```bash
gemini -p "Describe the main pieces of this system's architecture"
gemini -p "@src/ What security mechanisms are in place?"
gemini -p "Generate a README section for the auth module"
```

### Development Workflow
```bash
gemini -p "@package.json Help me upgrade to the latest dependencies"
gemini -p "!git diff --staged Generate a conventional commit message"
gemini -p "Implement a first draft for GitHub issue #123"
```

### System Administration
```bash
gemini -s -p "Analyze system logs and identify issues"
gemini -p "Convert all images in this directory to PNG with EXIF dates"
gemini -p "Organize my PDF invoices by month of expenditure"
```

### Data Analysis and Automation
```bash
gemini -p "web_fetch('https://example.com/data') Analyze this data"
gemini -p "Make a slide deck of git history from the last 7 days"
gemini -p "Create a wall display app for GitHub issues"
```

---

## Best Practices

### Security
- Use sandboxing for untrusted operations
- Configure tool restrictions with `coreTools`/`excludeTools`
- Review tool calls before execution
- Use project-specific `.gemini/settings.json` for team configurations

### Performance
- Use token caching to reduce API costs
- Leverage context files for project-specific instructions
- Set appropriate session turn limits
- Use compression for long conversations

### Organization
- Create custom commands for repeated tasks
- Use extensions for team-wide tool distributions
- Implement MCP servers for domain-specific tools
- Maintain `.geminiignore` for clean context

### Development
- Enable checkpointing for reversible changes
- Use debug mode for troubleshooting
- Run preflight checks before commits
- Link CLI locally for development

---

This documentation provides comprehensive coverage of Gemini CLI's capabilities, from basic usage to advanced customization and enterprise deployment. For the latest updates and community contributions, visit the [official GitHub repository](https://github.com/google-gemini/gemini-cli).
