# MCP Memory Ecosystem for Claude Code: Comprehensive Inventory

**Compiled:** 2026-05-21 | **Purpose:** Academic survey for AI4SE @ KI 2026 paper

24 distinct tools identified (plus Claude Code's native memory).

---

## Tools with Deep Bitemporal Versioning (2/24 = 8%)

### Graphiti / Zep
- **GitHub:** github.com/getzep/graphiti | **Stars:** ~24k
- **Memory types:** Semantic, Episodic, **Temporal**
- **Approach:** Temporal context graph; Neo4j/FalkorDB; edges carry valid_at/invalid_at
- **Temporal:** YES — deep bitemporal. Point-in-time queries, retroactive corrections, fact supersession
- **Local models:** Multiple LLM providers; self-hostable
- **Paper:** arXiv:2501.13956

### Codebase-Graph (Bitemporal)
- **GitHub:** github.com/Phoenixrr2113/codebase-graph | **Stars:** TBD
- **Memory types:** Code-structural, Semantic, **Temporal**
- **Approach:** Tree-sitter (5 languages); FalkorDB; HNSW vectors; bitemporal KG
- **Temporal:** YES — bitemporal. valid_at/invalid_at timestamps, point-in-time queries
- **Local models:** Local embeddings via @huggingface/transformers

---

## Tools with Partial Temporal Support (5/24 = 20%)

### Phloem
- **GitHub:** github.com/CanopyHQ/phloem
- **Memory types:** Episodic, Semantic
- **Approach:** Causal DAG linking memories by cause-and-effect; SQLite + sqlite-vec; Go binary
- **Temporal:** Partial — causal chains encode temporal ordering

### Memorix
- **GitHub:** github.com/AVIDS2/memorix
- **Memory types:** Episodic, Semantic, Procedural
- **Approach:** Git Memory (commits → searchable memory); Reasoning Memory; 3-layer progressive disclosure
- **Temporal:** Partial — timeline layer + git-derived temporal provenance

### AIngram
- **GitHub:** github.com/bozbuilds/AIngram
- **Memory types:** Semantic, Episodic
- **Approach:** SQLite + sqlite-vec/QJL + FTS5 + knowledge graph; Ed25519-signed hash chain
- **Temporal:** Partial — tamper-evident hash chain = immutable chronological ordering

### MCP-Memory-Keeper
- **GitHub:** github.com/mkreyman/mcp-memory-keeper
- **Memory types:** Semantic, Episodic, Working
- **Approach:** SQLite + WAL; tool profiles (8/22/full); checkpoints with restore
- **Temporal:** Partial — checkpoints allow point-in-time restore

### doobidoo/mcp-memory-service
- **GitHub:** github.com/doobidoo/mcp-memory-service | **Stars:** ~1.8k
- **Memory types:** Semantic, Episodic
- **Approach:** Sentence transformers + vector similarity; SQLite-vec; dream-inspired consolidation
- **Temporal:** Partial — decay scoring simulates temporal relevance

---

## Major Ecosystem Tools (timestamps only)

### claude-mem
- **GitHub:** github.com/thedotmack/claude-mem | **Stars:** ~70.9k | **Contributors:** 109
- **Memory types:** Episodic, Semantic, Procedural
- **Approach:** SQLite + Chroma; hooks into 5 Claude Code lifecycle events; compress via agent-sdk
- **Notable:** 1,840 commits, 259 releases; "Endless Mode" biomimetic; most-starred plugin

### MemPalace
- **GitHub:** github.com/milla-jovovich/mempalace | **Stars:** ~52.5k
- **Memory types:** Episodic, Semantic
- **Approach:** Spatial "memory palace" metaphor (wings/rooms/drawers); AAAK 30x compression; 29 MCP tools
- **Notable:** 96.6% LongMemEval claimed (community disputes methodology)

### Mem0 / OpenMemory MCP
- **GitHub:** github.com/mem0ai/mem0 | **Stars:** ~56k
- **Memory types:** Semantic, Episodic
- **Approach:** Single-pass extraction; hybrid retrieval (semantic+BM25+entity-graph); Qdrant+Neo4j
- **Local models:** OpenMemory runs fully local with Ollama
- **Notable:** YC-backed; multiple community MCP wrappers

### Cognee
- **GitHub:** github.com/topoteretes/cognee | **Stars:** ~17k
- **Memory types:** Semantic, Code-structural, Procedural
- **Approach:** GraphRAG; graph + vector stores; 30+ data source ingestion; codify (code graph)

### AgentMemory
- **GitHub:** github.com/rohitg00/agentmemory | **Stars:** ~14.5k
- **Memory types:** Episodic, Semantic, Procedural
- **Approach:** 53 MCP tools; BM25 + vector hybrid search; auto-capture + auto-surface; local SQLite
- **Notable:** Claims 95.2% R@5 on LongMemEval-S; most comprehensive tool count (53)

### Anthropic Official Memory Server
- **GitHub:** github.com/modelcontextprotocol/servers (memory) | **Stars:** 85.8k (parent)
- **Memory types:** Semantic
- **Approach:** Local knowledge graph as JSON; entities/relations/observations; file-based
- **Notable:** Reference implementation; intentionally minimal

### obra/episodic-memory
- **GitHub:** github.com/obra/episodic-memory | **Stars:** ~376
- **Memory types:** Episodic, Semantic
- **Approach:** Auto-indexes sessions at session-end via hooks; Transformers.js; SQLite+sqlite-vec
- **Notable:** By Jesse Vincent (creator of RT); fully local/offline

---

## SE-Specific Tools

### Codebase-Memory-MCP
- **GitHub:** github.com/DeusData/codebase-memory-mcp | **Stars:** ~2.4k
- **Memory types:** Code-structural, Semantic
- **Approach:** Tree-Sitter KG; 155 languages; call-graph traversal; impact analysis; 14 MCP tools
- **Paper:** arXiv:2603.27277

### CodePrysm
- **GitHub:** github.com/codeprysm/codeprysm
- **Memory types:** Code-structural, Semantic
- **Approach:** Rust; Tree-sitter + SCM tags; dependency graphs; GPU acceleration; scales to 100K+ files

### Memory-Graph
- **GitHub:** github.com/memory-graph/memory-graph
- **Memory types:** Semantic, Procedural
- **Approach:** Graph DB; auto-storage on git commits, bug fixes, releases, architecture decisions
- **Notable:** SE-specific triggers (git commit, version release, architecture decision)

---

## Other Notable Tools

### Basic Memory
- **GitHub:** github.com/basicmachines-co/basic-memory | **Stars:** ~2.8k
- **Memory types:** Semantic, Episodic
- **Approach:** Structured Markdown files (human + LLM readable); knowledge graph over markdown

### OMEGA Memory
- **GitHub:** github.com/omega-memory/omega-memory | **Stars:** ~105
- **Memory types:** Episodic, Semantic, Procedural
- **Approach:** 25 MCP tools; auto-capture on decisions/debug; provides MemoryStress benchmark

### Engram
- **GitHub:** github.com/Gentleman-Programming/engram
- **Memory types:** Episodic, Procedural
- **Approach:** Go binary + SQLite; FTS5; structured What/Why/Where/Learned entries

### Ogham MCP
- **GitHub:** github.com/ogham-mcp/ogham-mcp
- **Memory types:** Semantic, Episodic
- **Approach:** PostgreSQL + pgvector; RRF; cross-client shared memory

### Local-Memory-MCP
- **GitHub:** github.com/studiomeyer-io/local-memory-mcp
- **Memory types:** Semantic, Episodic
- **Approach:** 13 MCP tools; SQLite + FTS5 + knowledge graph; session context loading

### Memory-Bank-MCP (Cline-inspired)
- **GitHub:** github.com/alioshr/memory-bank-mcp
- **Memory types:** Procedural, Working
- **Approach:** Structured Markdown files (product-context.md, active-context.md, progress.md, etc.)

### Puliczek/mcp-memory
- **GitHub:** github.com/Puliczek/mcp-memory | **Stars:** ~63
- **Memory types:** Semantic
- **Approach:** Cloudflare Workers + D1 + Vectorize; cloud-hosted

---

## Native: Claude Code Built-in Memory

- Auto Memory introduced v2.1.59, Feb 26, 2026
- CLAUDE.md files: scoped per project/git repo
- Stores build commands, debugging insights, architecture notes
- 5 lifecycle hooks: SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd
- No temporal versioning. File-based, overwritten in place.

---

## Key Statistics

| Metric | Value |
|---|---|
| Total tools | 24 + native |
| Deep bitemporal | 2 (8%) |
| Partial temporal | 5 (20%) |
| Timestamps only | 17 (72%) |
| Semantic memory | 88% |
| Episodic memory | 64% |
| Procedural memory | 32% |
| Code-structural | 16% |
| Working memory | 12% |
| Temporal versioning | 8% |
| SQLite-based | 52% |
| Knowledge graphs | 44% |
| Vector DBs | 36% |
| Fully local capable | 68% |
