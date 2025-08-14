#!/usr/bin/env node

const { spawn } = require('child_process');

// Start the Atlas Docs MCP server
const mcpServer = spawn('npx', ['-y', '@cartographai/atlas-docs-mcp'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let messageId = 1;

function sendMCPMessage(method, params = {}) {
  const message = {
    jsonrpc: "2.0",
    id: messageId++,
    method: method,
    params: params
  };
  
  console.log('Sending:', JSON.stringify(message));
  mcpServer.stdin.write(JSON.stringify(message) + '\n');
}

mcpServer.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('Received:', output);
});

mcpServer.stderr.on('data', (data) => {
  console.log('Error:', data.toString());
});

// Wait a bit for the server to start, then initialize
setTimeout(() => {
  console.log('Initializing MCP connection...');
  
  // Initialize the MCP session
  sendMCPMessage('initialize', {
    protocolVersion: "2024-11-05",
    capabilities: {
      tools: {}
    },
    clientInfo: {
      name: "atlas-docs-test-client",
      version: "1.0.0"
    }
  });
  
  // Wait a bit, then call list_docs
  setTimeout(() => {
    console.log('Calling list_docs...');
    sendMCPMessage('tools/call', {
      name: 'list_docs',
      arguments: {}
    });
  }, 1000);
  
}, 1000);

// Cleanup
process.on('SIGINT', () => {
  mcpServer.kill();
  process.exit();
});
