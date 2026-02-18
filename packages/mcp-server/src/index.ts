#!/usr/bin/env node

/**
 * Baby Design UI -- MCP Server
 *
 * Exposes component metadata, code generation, theme tokens, and preview
 * tools over the Model Context Protocol using stdio transport.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { toolDefinitions, handleTool } from "./tools.js";

const server = new Server(
  { name: "baby-design-ui", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: toolDefinitions,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  return handleTool(name, (args ?? {}) as Record<string, unknown>);
});

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Baby Design UI MCP server running on stdio");
}

main().catch(console.error);
