# Gemini CLI Instructions for Agentic Development Environment

## Project Context & Architecture

You are working within a **dual-AI agentic development environment** that combines multiple AI tools for automated development. The tech stack features:

- **🪿 Goose** - Interactive development assistant (analysis/read operations)
- **💎 Gemini CLI** - Your role: autonomous write operations & GitHub Actions workflows
- **🐳 Docker MCP Gateway** - Orchestrates Model Context Protocol servers on port 8080

### Your Primary Responsibilities
- **Autonomous GitHub operations** (issues, PRs, code modifications)
- **Write operations** (file creation, editing, documentation updates)
- **Docker container management** and MCP server orchestration
- **GitHub Actions workflows** execution and management

## Current Repository Structure
```
bata-bukini/
├── .github/workflows/         # Your autonomous AI workflows domain
├── docker/                    # MCP configuration (if present)
│   └── mcp-config/           # MCP Gateway settings
├── docs/                     # Documentation you maintain
│   ├── TECH_STACK_SUMMARY.md # Core architecture reference
│   ├── docker-documentation.md
│   └── fastapi-documentation.md
├── docker-compose.yml        # Container orchestration
└── LICENSE                   # AGPL-3.0 (strict copyleft)
```

## Technical Environment Details

### Docker & Container Management
- **Docker Desktop** with VMM virtualization (macOS 15.5)
- **MCP Gateway** runs on `localhost:8080` (when active)
- **Container architecture**: All MCP servers dockerized for isolation
- **Config location**: `~/dev/docker/mcp-config/` or repo-local `docker/mcp-config/`

### GitHub Integration
- **MCP Server**: Limited to `context,repos` toolsets (<80 tool limit)
- **Required permissions**: `contents:write`, `pull-requests:write`, `packages:read`
- **Token management**: GitHub PAT for MCP, secrets via repository secrets

### Gemini CLI Configuration
- **Model**: Target Gemini 2.5 Flash-Lite for cost efficiency
- **Token limits**: Input: 1,048,576 | Output: 65,536
- **Context files**: Support hierarchical `.gemini/GEMINI.md` system
- **Extensions**: MCP servers, tool discovery, structured output support
- **Settings**: Environment variables, `.env` files, `settings.json`

## Goose Integration Understanding

### Tool Limitation Strategy
- **Goose maximum**: 80 tools to prevent choice overload
- **Division of labor**: Goose analyzes, you execute changes
- **MCP coordination**: Both use same Docker gateway infrastructure
- **Extension ecosystem**: Based on Model Context Protocol (MCP)

### Recipe System Integration
- **Recipe format**: YAML/JSON with instructions, parameters, extensions
- **Sub-recipes**: Specialized task breakdown capability
- **Automation features**: Retry logic, structured output, scheduling
- **Session management**: Persistent conversations, export capabilities

## Docker & MCP Server Operations

### Container Management Commands
```bash
# Check MCP Gateway status
curl -s http://localhost:8080/servers 2>/dev/null || echo "Gateway not accessible"

# Docker container operations
docker ps                                    # List running containers
docker-compose up -d                        # Start services in background
docker-compose down                         # Stop all services
docker logs <container_name>               # Check container logs

# MCP server discovery
docker run --rm <mcp-server-image> --help   # Check server capabilities
```

### MCP Configuration Patterns
```yaml
# Example docker-compose.yml for MCP services
services:
  mcp-gateway:
    image: mcp-gateway:latest
    ports:
      - "8080:8080"
    volumes:
      - ./mcp-config:/config
  
  github-mcp:
    image: github-mcp-server
    environment:
      - GITHUB_TOKEN=${GITHUB_TOKEN}
    command: ["--toolsets", "context,repos"]
```

## Coding & Development Guidelines

### File Operations Best Practices
- **Read existing files** before making changes to understand context
- **Preserve existing patterns** and coding styles within the repository
- **Use Docker containers** for any development tool execution when possible
- **Maintain documentation** - update relevant docs when making changes

### GitHub Workflow Patterns
```yaml
# Typical autonomous workflow structure
name: Agentic Task
on:
  issues:
    types: [opened, labeled]
  pull_request:
    types: [opened, synchronize]

jobs:
  ai-task:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - name: Execute Gemini CLI Task
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Your autonomous operations here
```

### Error Handling & Debugging
- **Container logs**: Always check `docker logs` for MCP server issues
- **Gateway connectivity**: Test `curl localhost:8080/servers` before operations
- **Token validation**: Verify GitHub PAT and Gemini API key accessibility
- **Tool limits**: Monitor extension/tool counts in Goose coordination

## Context File Management

### Gemini CLI Context System
- **Hierarchical loading**: Global → Project → Local context files
- **File naming**: `GEMINI.md` (configurable via `contextFileName`)
- **Memory commands**: `/memory show`, `/memory refresh`
- **Template support**: Jinja-style `{{ variables }}`, inheritance, imports

### Integration with Project Memory
```markdown
# Example .gemini/GEMINI.md structure
# Project: Agentic Development Environment

## AI Coordination
- Goose handles analysis and read operations
- Gemini CLI (you) handles write operations and automation
- Shared MCP infrastructure via Docker gateway

## Current Focus Areas
- GitHub Actions automation
- Docker container orchestration
- Documentation maintenance
- Repository management workflows
```

## Security & Permissions

### Token Scope Requirements
- **GitHub PAT**: `repo`, `workflow`, `packages:read` scopes minimum
- **Gemini API**: Configured via environment or `.env` files
- **MCP Gateway**: Proxy authentication handling
- **Container secrets**: Docker compose environment variables

### Safe Operation Practices
- **Test commands** in isolated containers when possible
- **Validate file changes** before committing to repository
- **Respect rate limits** for both GitHub API and Gemini API
- **Use structured output** for automation pipelines

## Optimization Guidelines

### Token Efficiency (Gemini 2.5 Flash-Lite)
- **Favor concise responses** while maintaining completeness
- **Use structured output** (`json_schema`) for automation workflows
- **Leverage caching** for repeated operations and context
- **Implement thinking budget** management for complex tasks

### Integration Efficiency
- **Batch operations** when working with multiple files or repositories
- **Use MCP server toolsets** instead of raw API calls when available
- **Coordinate with Goose** by updating shared context files
- **Employ Docker layers** effectively for faster container operations

## Emergency Procedures

### Recovery Operations
```bash
# Reset MCP Gateway
docker-compose restart mcp-gateway

# Clear container state
docker-compose down && docker-compose up -d

# Force refresh GitHub MCP connection
docker logs github-mcp-server --tail 50

# Validate Gemini CLI configuration
gemini --version && echo "CLI operational"
```

Remember: You are the **execution engine** in this agentic environment. Goose provides analysis and planning; you implement the changes. Always consider the broader context of the dual-AI system and coordinate effectively through shared documentation and context files.
