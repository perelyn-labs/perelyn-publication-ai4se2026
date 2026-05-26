# Ecosystem Synthesis: Memory for SE Coding Agents (May 2026)

## The Big Picture

We surveyed **8 production coding agents**, **40+ MCP memory servers**, **4 production memory frameworks**, and the **local model integration landscape**. This is the most comprehensive mapping of the SE agent memory ecosystem to date.

---

## 1. Built-in Memory Sophistication Ranking (8 Agents)

| Rank | Agent | Auto-Capture | MCP | Temporal | Key Innovation |
|------|-------|-------------|-----|----------|----------------|
| 1 | **Gemini CLI** | Yes (skills extraction) | Yes | Diff patches | 4-tier hierarchy; episodic→procedural conversion |
| 2 | **Codex CLI** | Yes (2-phase pipeline) | Yes | 30-day aging | Dual-model consolidation; secret redaction |
| 3 | **Copilot** | Yes (agentic) | Yes | JIT validation + 28d decay | Real-time codebase verification of stored facts |
| 4 | **Claude Code** | Yes (auto-memory) | Yes | None | 5 lifecycle hooks; richest MCP ecosystem |
| 5 | **Windsurf** | Yes (Cascade) | Yes | None | Zero-effort auto-capture |
| 6 | **OpenCode** | No | Yes | None | Model-agnostic (75+ providers) |
| 7 | **Cursor** | No (removed!) | Yes | None | Only tool to regress on memory |
| 8 | **Aider** | No | No (bridge) | None | Git-native ("thinks in git") |

**Key finding:** No agent implements episodic memory or true temporal versioning natively. Copilot's JIT validation is the closest to temporal awareness — it verifies stored facts against current codebase state before use.

---

## 2. MCP Memory Ecosystem: 40+ Servers Mapped to CoALA Taxonomy

### Distribution by Memory Type

| Memory Type | # Servers | % | Top 3 by Stars |
|-------------|----------|---|-----------------|
| **Semantic** | ~22 | 55% | Mem0 (56K), Official MCP (74K parent), Cognee (17K) |
| **Graph-based** | ~15 | 38% | Graphiti (24K), Neo4j Agent Memory, Basic Memory (2.8K) |
| **Episodic** | ~12 | 30% | AgentMemory (14.5K), claude-mem (70.9K), MemPalace (52.5K) |
| **Working** | ~8 | 20% | MCP-Memory-Keeper, HPKV, mind-mem |
| **Collaborative** | ~5 | 13% | Ourmem, Beever Atlas, OpenMemory |
| **Temporal** | ~5 | 13% | Graphiti/Zep (24K), Codebase-Graph, Memento MCP |
| **Procedural** | ~4 | 10% | Letta (13K), AgentMemory (skills), Novyx |

### The Episodic-Temporal Paradox (Extended)

Paper already notes: 59% of research papers address episodic memory, but only 11% implement temporal mechanisms.

**The ecosystem mirrors this exactly:**
- 30% of MCP servers implement episodic memory
- Only 13% implement any temporal mechanism
- Only **2 of 40+ servers** (5%) implement true bitemporal versioning: **Graphiti/Zep** and **Codebase-Graph**
- Procedural memory is the rarest at 10%

### SE-Specific vs General Purpose

| Category | Count | Notable Examples |
|----------|-------|-----------------|
| **SE-specific** | ~12 (30%) | Engram-MCP (git branch-aware), Hindsight (failure replay), Codebase-Memory, Memory-Graph, Cognee codify |
| **SE-usable** | ~10 (25%) | Mem0, mcp-memory-service, Beever Atlas |
| **General** | ~20 (50%) | Official MCP Memory, Basic Memory, Graphiti, Chroma |

---

## 3. How Pieces Complement Each Other: A Composable Stack

The MCP protocol enables a **composable memory architecture** where each layer addresses a different memory need:

```
┌─────────────────────────────────────────────────┐
│              SE CODING AGENT                     │
│  (Claude Code / OpenCode / Gemini CLI / ...)     │
│                                                   │
│  Built-in: CLAUDE.md, auto-memory, hooks         │
│  ↕ MCP Protocol                                   │
├─────────────────────────────────────────────────┤
│  LAYER 1: Semantic Memory                         │
│  Mem0/OpenMemory — facts, preferences, conventions│
│  Cognee codify — code structure as knowledge      │
│  Official MCP Memory — lightweight KG             │
├─────────────────────────────────────────────────┤
│  LAYER 2: Episodic Memory                         │
│  obra/episodic-memory — past session index        │
│  claude-mem — lifecycle-hook capture              │
│  AgentMemory — auto-capture + auto-surface        │
│  Hindsight — failure/attempt replay               │
├─────────────────────────────────────────────────┤
│  LAYER 3: Temporal Memory                         │
│  Graphiti/Zep — bitemporal knowledge graph        │
│  Codebase-Graph — bitemporal code structure       │
│  Memento MCP — confidence decay                   │
├─────────────────────────────────────────────────┤
│  LAYER 4: Procedural Memory                       │
│  Letta — self-editing agent memory               │
│  Gemini Auto Memory — skills extraction           │
│  Memory-Bank-MCP — workflow templates             │
├─────────────────────────────────────────────────┤
│  LAYER 5: Collaborative Memory                    │
│  Ourmem — personal/team/public tiers              │
│  Beever Atlas — team chat → knowledge graph       │
│  OpenMemory — cross-tool sharing                  │
├─────────────────────────────────────────────────┤
│  LAYER 6: Code-Structural Memory                  │
│  Codebase-Memory-MCP — Tree-Sitter KG (155 lang) │
│  CodePrysm — dependency graphs + GPU accel        │
│  Cognee codify — code graph                       │
├─────────────────────────────────────────────────┤
│  INFRASTRUCTURE                                   │
│  Storage: SQLite (52%), Neo4j, PostgreSQL, JSONL  │
│  Retrieval: BM25+Vector hybrid, KG traversal      │
│  Local models: Ollama/LM Studio (14B+ for MCP)    │
└─────────────────────────────────────────────────┘
```

**Critical insight for the paper:** No single tool covers all layers. The MCP ecosystem is building a *de facto* composable memory architecture, but:
- Nobody has demonstrated the full stack working together
- Layer conflicts (multiple tools writing to same knowledge base) are unaddressed
- No orchestration layer decides which memory to consult when

---

## 4. Local Model Integration

### Current State
- **MCP + local models works** via bridges (MCPHost, ollmcp, LM Studio native)
- **14B+ parameters** needed for reliable MCP tool calling
- **32B+** needed for full benefit from experiential memory (WebCoach finding holds)
- **MoE models** (DeepSeek V4 Flash: 284B/13B active) may shift thresholds

### Hybrid Architectures (Emerging Research)
| Pattern | Description | Efficiency |
|---------|-------------|-----------|
| **LightMem** (arXiv:2604.07798) | SLM manages memory, LLM generates | — |
| **HyMem** (arXiv:2602.13933) | Dynamic dual-tier retrieval | 92.6% cost reduction |
| **WebCoach** | Separate coach model for memory intervention | — |
| **Complexity routing** | Local for classification/filtering, cloud for reasoning | — |

### Model-Agnostic Frameworks
| Framework | Ollama | Self-Host | Air-Gapped | Temporal |
|-----------|--------|-----------|-----------|----------|
| **Cognee** | Yes | SQLite+LanceDB+Kuzu | YES | Limited |
| **Mem0** | Yes | Docker | Yes | Limited |
| **Letta** | Yes | Docker | Yes | No |
| **Graphiti** | Self-host | Neo4j required | Partial | YES |

---

## 5. Figure Concept: "The SE Agent Memory Ecosystem"

**Design: Concentric rings with Claude Code at center**

Center: SE Agent (Claude Code / OpenCode) with built-in capabilities
- Ring 1 (Protocol): MCP — the universal memory bus (7/8 agents support it)
- Ring 2 (Memory Types): Six sectors radiating out, one per memory type
  - Each sector contains the relevant MCP servers, sized by stars
  - Color-coded: green=semantic, blue=episodic, red=temporal, orange=procedural, purple=collaborative, gray=code-structural
- Ring 3 (Infrastructure): Storage backends, retrieval methods, local model support
- Annotations: Gap indicators where sectors are thin (temporal, procedural)

**Alternative: Matrix/heatmap view**
- Rows: 15-20 most important tools
- Columns: Memory types (semantic, episodic, temporal, procedural, collaborative, code-structural)
- Cells: filled/empty showing coverage
- Makes gaps visually obvious

---

## 6. Paper-Ready Key Numbers

- **40+ MCP memory servers** in the ecosystem (vs "15+" currently in paper → update)
- **8/8 production agents** lack episodic memory and temporal versioning natively
- **7/8 agents** support MCP (only Aider lacks native support)
- **Only 2/40+ servers** (5%) implement bitemporal versioning
- **Only 4/40+ servers** (10%) implement procedural memory
- **68% of MCP servers** support fully local operation
- **92% context reduction** with retrieval-augmented memory vs built-in files (AgentMemory benchmark)
- **14B+ parameters** minimum for reliable MCP tool calling with local models
- **claude-mem: 70.9K stars, 109 contributors** — largest community memory extension
- **Cursor removed auto-memory** — naive auto-capture without architecture fails

---

## 7. Narrative for Paper

**The story:** The open-source community has spontaneously recreated the CoALA memory taxonomy as a composable MCP ecosystem — but with the same gaps the research community has. Semantic memory is saturated, episodic is emerging, temporal and procedural remain nearly empty. The pieces exist to build a comprehensive memory-augmented SE agent, but nobody has assembled them. The paper can argue that:

1. **MCP as universal memory bus** enables composable memory architectures
2. **The ecosystem validates the gap**: 40+ tools, yet <5% address temporal versioning
3. **Composability is the path forward**: Not one tool to rule them all, but orchestrated layers
4. **Local models make this sovereign**: 68% of tools work offline; 14B+ models can manage memory
5. **Open research question**: How to orchestrate multiple memory layers without conflicts
