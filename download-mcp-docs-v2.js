#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');

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
  
  console.log('Sending:', method, JSON.stringify(params, null, 2));
  mcpServer.stdin.write(JSON.stringify(message) + '\n');
}

let initDone = false;

mcpServer.stdout.on('data', (data) => {
  const output = data.toString();
  try {
    const messages = output.split('\n').filter(line => line.trim());
    for (const message of messages) {
      const parsed = JSON.parse(message);
      
      if (parsed.id === 1 && !initDone) {
        // Initialize response received, now get ModelContextProtocol docs
        console.log('Getting ModelContextProtocol documentation...');
        sendMCPMessage('tools/call', {
          name: 'get_docs_full',
          arguments: { docName: 'ModelContextProtocol' }
        });
        initDone = true;
      } else if (parsed.id === 2) {
        // Got the docs, save them
        if (parsed.result && parsed.result.content && parsed.result.content[0]) {
          const content = parsed.result.content[0].text;
          const docsPath = '/Users/user/dev/bata-bukini/docs/ModelContextProtocol.md';
          
          console.log('Saving documentation to:', docsPath);
          fs.writeFileSync(docsPath, content);
          console.log('✅ ModelContextProtocol documentation saved successfully!');
          console.log('File size:', content.length, 'characters');
        } else {
          console.log('Error response:', JSON.stringify(parsed, null, 2));
        }
        
        mcpServer.kill();
        process.exit(0);
      }
    }
  } catch (e) {
    // Ignore parsing errors for non-JSON output
    console.log('Non-JSON output:', output);
  }
});

mcpServer.stderr.on('data', (data) => {
  console.log('Server ready');
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
      name: "mcp-docs-downloader",
      version: "1.0.0"
    }
  });
}, 1000);

// Cleanup
process.on('SIGINT', () => {
  mcpServer.kill();
  process.exit();
});
