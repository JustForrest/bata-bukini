# 🤖 Agentic AI Development Environment Summary

## 🎯 Project Overview
Building an **agentic workflow environment** that combines multiple AI tools and technologies for automated development and repository management. The tech stack creates both interactive and autonomous AI agents for different aspects of software development.

## 🏗️ Core Technology Stack

### **Primary AI Agents**
- **🪿 Goose** - Interactive development assistant with <80 tool limit preference
- **💎 Gemini CLI** - For write operations and autonomous GitHub Actions workflows
- **🐳 Docker MCP Gateway** - Orchestrates Model Context Protocol (MCP) servers

### **Infrastructure Components**
- **Docker Desktop** with VMM virtualization on macOS 15.5
- **MCP Servers** - Containerized using Docker's official MCP catalog
- **GitHub Actions** - For autonomous agentic workflows
- **GitHub MCP Server** - Limited to `context,repos` toolsets to stay under tool limits

## ⚙️ Key Configuration Decisions

### **Goose Configuration**
- Maximum 80 tools to prevent tool choice overload
- Uses Docker MCP Gateway for GitHub repository access
- Focused on **read/analysis operations** rather than write operations
- Integrated with local development environment

### **GitHub MCP Server Setup**
- **Limited toolsets**: `context,repos` (and optionally `issues`)
- Avoids bloated tool collections (GitHub's full MCP server has 120+ tools)
- Running via Docker containers for better reliability
- Accessible through MCP Gateway proxy

### **Docker Infrastructure**
- Uses Docker VMM for better performance on macOS
- MCP Gateway runs on port 8080
- All MCP servers containerized for isolation and management
- Configuration stored in `~/dev/docker/mcp-config/`

## 🔄 Workflow Architecture

### **Interactive Development** (Goose + MCP)
```
Developer ↔️ Goose ↔️ MCP Gateway ↔️ GitHub MCP Server
```
- Real-time code analysis and repository exploration
- Local development assistance
- File system and repository context awareness

### **Autonomous Operations** (GitHub Actions + Gemini CLI)
```
GitHub Events → Actions Workflows → Gemini CLI → Repository Changes
```
- Issue triage and labeling
- Pull request reviews and suggestions
- Automated code improvements and documentation

## 🛡️ Security & Permissions

### **GitHub Actions Requirements**
- `contents: write` - For file modifications
- `pull-requests: write` - For automated PRs
- `packages: read` - For Docker image access
- `actions: read` - For workflow access

### **Token Management**
- GitHub Personal Access Token for MCP server
- Gemini API key for CLI operations
- All secrets managed through GitHub repository secrets
- No sensitive data in version control

## 📁 Repository Structure
```
repo/
├── .github/workflows/          # Autonomous AI workflows
├── docker/mcp-config/         # MCP Gateway configuration
├── docs/                      # Documentation
└── scripts/                   # Setup and integration scripts
```

## 🔧 Development Environment Features

- **Tool Limitation Strategy**: Carefully managed tool counts to prevent AI confusion
- **Separation of Concerns**: Goose for analysis, Gemini for modifications
- **Container Orchestration**: All MCP servers run in Docker for reliability
- **Automated Workflows**: Self-managing repository through GitHub Actions
- **License**: AGPL-3.0 (most restrictive open source license) for maximum copyleft protection

## 💡 Integration Benefits

This setup provides:
- **Dual AI Approach**: Interactive assistant + autonomous workers
- **Scalable MCP Architecture**: Easy to add/remove MCP servers via Docker
- **Repository Intelligence**: AI agents understand project context and history
- **Automated Maintenance**: Self-updating documentation, issue triage, code reviews

The environment is designed to be a **boilerplate for agentic workflows** that other developers can fork and customize for their own AI-powered development needs.
