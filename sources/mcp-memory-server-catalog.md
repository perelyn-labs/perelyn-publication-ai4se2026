# Comprehensive Catalog of MCP Memory-Related Servers

**Compiled: 2026-05-21** | 40+ unique servers across 7 memory types

## Temporal Mechanism Sophistication

| Level | Description | Servers |
|-------|-------------|---------|
| None | No temporal awareness | Official MCP Memory, Chroma MCP, most basic servers |
| Timestamps only | Created/updated timestamps | Most servers |
| Recency weighting | Temporal decay in retrieval | Engram-MCP |
| Confidence decay | Facts lose reliability over time | Memento MCP |
| Validity windows | valid_from/valid_to, invalidation not deletion | **Graphiti/Zep (unique)** |
| Multi-sector temporal | Time as first-class across memory types | CaviraOSS/OpenMemory (HMD) |

## SE-Specific Notable Tools

- **Engram-MCP** (edg-l): Git branch-aware session handoffs, `continues_from` chain
- **Hindsight** (Shazil10): Attempt memory / failure replay, JetBrains plugin
- **Cognee codify**: Code repo → knowledge graph
- **Codebase-Memory-MCP**: Tree-Sitter KG, 155 languages
- **Memory-Graph**: Auto-storage on git commits, bug fixes, releases
- **Letta Code**: Memory-first coding agent

## Collaborative Memory

- **Ourmem** (ourmem/omem): Three-tier Space (personal/team/public), quality-gated sharing
- **Beever Atlas**: Team chat corpus (Slack/Discord/Teams) → knowledge graph
- **OpenMemory (Mem0)**: Cross-tool sharing (Claude ↔ Cursor)
- **mcp-memory-service** (doobidoo): Optional Cloudflare cloud sync for teams

## Key Gaps

1. No server implements all memory types (CaviraOSS closest with 5 sectors)
2. Temporal versioning dominated by single player (Graphiti/Zep)
3. Procedural memory nearly absent (~4 servers)
4. SE-specific temporal memory does not exist
5. Security/governance mostly absent (only Novyx, AgentMemory)
