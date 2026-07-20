# Table 1 Reasoning Report: Memory Capability Matrix

Every entry in the 20×20 matrix (10 production agents + 10 MCP add-ons, across 20 dimensions) with justification.

Legend: **S** = Supported, **T** = Partial, **A** = Absent

---

## Production Agents

### Claude Code
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | CLAUDE.md, .claude/settings.json, project-level instructions. Well-documented context file system. |
| Episodic | A | No structured records of past sessions. Auto-memories are factual snippets, not session trajectories. |
| Procedural | A | No workflow/tool-usage memory. Cannot learn new procedures from past executions. |
| Auto-Generated | S | Automatically generates memories from sessions, stored in ~/.claude/memory/. |
| Context Compaction | S | Automatic context compaction when window fills (~95% utilization). |
| Fact./Exp. Distinction | A | Auto-memories mix facts and experiences without distinguishing them. |
| Staleness Detection | A | No mechanism to detect or flag outdated memories. |
| Temporal Metadata | A | Memories lack timestamps or temporal context. |
| Temporal Versioning | A | No tracking of when knowledge was valid/invalid. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | A | No persistent code-structure awareness across sessions. |
| Cross-Session | A | Auto-memories persist but are not structured for cross-session learning (no trajectory replay). |
| Decision Provenance | A | No record of why decisions were made. |
| Failed Attempt Replay | A | Failed approaches are discarded during compaction. |
| Git-Aware | A | Uses git for context within session but no git-aware memory persistence. |
| Team/Collab. | A | Memories are per-user, no sharing mechanism. |
| Access Control | A | No access control on memories. |
| Memory Provenance | A | No tracking of where memories came from. |
| MCP Support | S | Full MCP client support, major driver of MCP ecosystem. |
| Local Deployment | S | Runs locally on developer machine. |

### Gemini CLI
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | GEMINI.md instruction files, multi-level (global, project). |
| Episodic | **T** | Four-tier memory hierarchy includes session-level context. "Skills" extraction converts session experiences into reusable knowledge — a form of episodic-to-procedural conversion. But no full structured episodic records (no session trajectories, no decision rationale capture). Partial. |
| Procedural | **T** | The "skills" tier automatically extracts procedural patterns from sessions. However, these are simple extracted heuristics, not full workflow representations. Partial. |
| Auto-Generated | S | Automatically extracts and stores memories including "skills". |
| Context Compaction | S | Automatic context management. |
| Fact./Exp. Distinction | A | No explicit separation of factual vs experiential knowledge. |
| Staleness Detection | A | No staleness detection mechanism. |
| Temporal Metadata | **T** | Skills carry creation timestamps. Basic temporal awareness but not rich metadata. |
| Temporal Versioning | A | No versioning of knowledge validity over time. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | **T** | Some code-structure awareness via codebase indexing within sessions. Not persisted as structural memory. |
| Cross-Session | **T** | Skills and memories persist across sessions. Some cross-session learning via accumulated skills. But no structured trajectory replay or experience transfer. |
| Decision Provenance | A | No decision rationale capture. |
| Failed Attempt Replay | A | No failed attempt tracking. |
| Git-Aware | A | No git-aware memory. |
| Team/Collab. | A | Single-user memory only. |
| Access Control | A | No access control. |
| Memory Provenance | A | No provenance tracking. |
| MCP Support | S | Full MCP support. |
| Local Deployment | S | Runs locally. |

### Codex CLI
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | AGENTS.md and instruction files supported. |
| Episodic | A | No episodic memory. |
| Procedural | A | No procedural memory. |
| Auto-Generated | S | Generates memories automatically from sessions. |
| Context Compaction | S | Context management with automatic compaction. |
| Fact./Exp. Distinction | A | No distinction. |
| Staleness Detection | **T** | Some awareness of outdated information via codebase verification, but not systematic. |
| Temporal Metadata | **T** | Basic timestamps on stored memories. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | A | No persistent code-structural memory. |
| Cross-Session | **T** | Memories persist across sessions but without structured learning. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git-aware memory. |
| Team/Collab. | A | Single-user. |
| Access Control | A | No access control. |
| Memory Provenance | A | No provenance. |
| MCP Support | S | MCP support. |
| Local Deployment | S | Runs locally. |

### Copilot (GitHub Copilot)
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Custom instructions, .github/copilot-instructions.md, repository-level context. |
| Episodic | A | No episodic memory. |
| Procedural | A | No procedural memory. |
| Auto-Generated | S | Copilot generates context-aware suggestions; some auto-memory features in Copilot Chat. |
| Context Compaction | S | Manages context window automatically. |
| Fact./Exp. Distinction | A | No distinction. |
| Staleness Detection | **T** | Just-in-time codebase verification of stored facts — checks if remembered facts still match current code. Partial because it's limited to code-level verification, not general staleness. |
| Temporal Metadata | **T** | Basic awareness of recency in suggestions. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | **T** | Understands code structure within session (via Language Server, tree-sitter). Not persisted as memory. |
| Cross-Session | A | No cross-session memory persistence beyond instruction files. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git-aware memory (uses git context but doesn't persist git-related memories). |
| Team/Collab. | A | Organization-level instructions exist but no collaborative memory. |
| Access Control | A | No memory access control. |
| Memory Provenance | A | No provenance. |
| MCP Support | S | MCP support in Copilot extensions. |
| Local Deployment | A | Cloud-based service, no local deployment option. |

### Cursor
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | .cursor/rules files, project-level instructions. |
| Episodic | A | No episodic memory. Cursor previously had auto-memory but removed it (suggesting naive auto-capture degraded quality). |
| Procedural | A | No procedural memory. |
| Auto-Generated | A | Auto-memory feature was removed. |
| Context Compaction | S | Automatic context management. |
| Fact./Exp. Distinction | A | No distinction. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | A | No temporal metadata. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | **T** | Codebase indexing provides structural awareness within session. Not persisted. |
| Cross-Session | A | No cross-session memory (beyond static rules files). |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git-aware memory. |
| Team/Collab. | A | Team-level rules can be shared via repo, but no collaborative memory system. |
| Access Control | A | No access control. |
| Memory Provenance | A | No provenance. |
| MCP Support | S | MCP support. |
| Local Deployment | A | Requires Cursor cloud services. |

### OpenCode
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Instruction files supported. |
| Episodic | A | No episodic memory. |
| Procedural | A | No procedural memory. |
| Auto-Generated | A | No auto-generated memories. |
| Context Compaction | S | Context window management. |
| Fact./Exp. Distinction | A | No distinction. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | A | No temporal metadata. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | A | No persistent code-structural memory. |
| Cross-Session | A | No cross-session memory. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git-aware memory. |
| Team/Collab. | A | Single-user. |
| Access Control | A | No access control. |
| Memory Provenance | A | No provenance. |
| MCP Support | S | MCP support. |
| Local Deployment | S | Fully local, open source. |

### Windsurf
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Rules files and project instructions. |
| Episodic | A | No episodic memory. |
| Procedural | A | No procedural memory. |
| Auto-Generated | S | Cascade generates memories from interactions. |
| Context Compaction | **T** | Some context management but less sophisticated than Claude Code/Copilot. |
| Fact./Exp. Distinction | A | No distinction. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | A | No temporal metadata on memories. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | **T** | Codebase indexing within sessions. |
| Cross-Session | A | Memories persist but no structured cross-session learning. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git-aware memory. |
| Team/Collab. | A | Single-user. |
| Access Control | A | No access control. |
| Memory Provenance | A | No provenance. |
| MCP Support | S | MCP support. |
| Local Deployment | A | Cloud-dependent. |

### Devin
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | **T** | Has some instruction/playbook support but less flexible than file-based systems. Instructions are configured via web UI rather than repo-level files. |
| Episodic | A | No structured episodic memory. |
| Procedural | A | No procedural memory. |
| Auto-Generated | **T** | Some automatic context capture within its persistent environment, but not formalized as a memory system. |
| Context Compaction | **T** | Manages long-running sessions with some compaction, but details are opaque. |
| Fact./Exp. Distinction | A | No distinction. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | A | No temporal metadata. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | **T** | Has persistent development environment with code awareness. |
| Cross-Session | A | No cross-session learning. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | Uses git but no git-aware memory. |
| Team/Collab. | **T** | Operates as a "team member" with Slack integration, can receive instructions from multiple team members, and work is visible to the team. But no formal collaborative memory sharing — it's more workflow collaboration than memory collaboration. |
| Access Control | A | No memory-level access control. |
| Memory Provenance | A | No provenance. |
| MCP Support | S | MCP support. |
| Local Deployment | A | Cloud-hosted service. |

### Aider
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | **T** | Supports conventions files (.aider.conf.yml, in-chat directives) but less structured than CLAUDE.md-style systems. |
| Episodic | A | No episodic memory. |
| Procedural | A | No procedural memory. |
| Auto-Generated | A | No auto-generated memories. |
| Context Compaction | A | No automatic context compaction — user manually manages context via /add, /drop. |
| Fact./Exp. Distinction | A | No distinction. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | A | No temporal metadata. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | **T** | Repository map via tree-sitter provides code structure awareness. Not persisted as memory. |
| Cross-Session | A | No cross-session memory. |
| Decision Provenance | **T** | Commit messages include context about changes. Basic provenance via git history. Not a formal system but provides some traceability. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | **S** | Deeply git-integrated — auto-commits changes, works with branches, understands git history. Core architectural feature. |
| Team/Collab. | A | Single-user tool. |
| Access Control | A | No access control. |
| Memory Provenance | A | No provenance. |
| MCP Support | **T** | Experimental/limited MCP support. |
| Local Deployment | S | Fully local, open source. |

### OpenHands
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Supports instruction files and micro-agents with specialized prompts. |
| Episodic | A | No episodic memory. |
| Procedural | A | No procedural memory. |
| Auto-Generated | A | No auto-generated memories. |
| Context Compaction | S | Condenser module for context management with multiple strategies. |
| Fact./Exp. Distinction | A | No distinction. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | A | No temporal metadata. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | A | No persistent code-structural memory. |
| Cross-Session | A | No cross-session memory. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git-aware memory. |
| Team/Collab. | A | Single-user. |
| Access Control | A | No access control. |
| Memory Provenance | A | No provenance. |
| MCP Support | S | MCP support. |
| Local Deployment | S | Fully local, open source (Docker-based). |

---

## MCP Community Add-ons

### claude-mem
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Stores factual memories extracted from sessions. |
| Episodic | **S** | Hooks into Claude Code lifecycle events (session start/end, compaction) to capture session-level records. This is genuine episodic capture. |
| Procedural | A | No procedural memory. |
| Auto-Generated | S | Automatically captures memories via lifecycle hooks. |
| Context Compaction | S | Captures pre-compaction context to prevent information loss. |
| Fact./Exp. Distinction | A | No explicit distinction. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | **T** | Session timestamps are recorded. Basic temporal info. |
| Temporal Versioning | A | No versioning of knowledge validity. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | A | No code-structural awareness. |
| Cross-Session | **S** | Explicitly designed for cross-session memory persistence. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git awareness. |
| Team/Collab. | A | Single-user. |
| Access Control | A | No access control. |
| Memory Provenance | A | No provenance tracking. |
| MCP Support | S | MCP server. |
| Local Deployment | S | Local SQLite storage. |

### Mem0
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Core strength — extracts and stores factual memories. |
| Episodic | **T** | Can store conversation-level memories that approximate episodes, but no structured session trajectories or decision rationale. Partial. |
| Procedural | A | No procedural memory. |
| Auto-Generated | S | Automatic memory extraction from conversations. |
| Context Compaction | S | Memory consolidation and deduplication. |
| Fact./Exp. Distinction | A | No explicit distinction. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | **T** | Memories carry timestamps. Basic temporal info. |
| Temporal Versioning | A | No knowledge validity tracking. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | A | General-purpose, no code awareness. |
| Cross-Session | **S** | Designed for cross-session persistence. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git awareness. |
| Team/Collab. | **T** | Supports user/agent/organization scoping of memories. Memories can be scoped to organizations, enabling some sharing. But no formal collaborative memory with access control. |
| Access Control | A | No fine-grained access control. |
| Memory Provenance | A | No provenance tracking. |
| MCP Support | S | MCP server available. |
| Local Deployment | S | Can run locally with Ollama. |

### Graphiti / Zep
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Knowledge graph stores entities and relationships (semantic knowledge). |
| Episodic | **S** | Episodic edges in the graph capture event-level memories with temporal context. |
| Procedural | A | No procedural memory. |
| Auto-Generated | S | Automatic entity/relationship extraction from conversations. |
| Context Compaction | S | Graph consolidation, deduplication, and pruning. |
| Fact./Exp. Distinction | A | No explicit distinction between factual and experiential. |
| Staleness Detection | **S** | Bi-temporal validity intervals enable detecting when facts became stale. |
| Temporal Metadata | **S** | Full temporal metadata on all edges (creation time, validity intervals). |
| Temporal Versioning | **S** | Tracks when knowledge was valid and when it changed. Core architectural feature. |
| Bi-Temporal | **S** | Distinguishes event time from ingestion time. Unique among production systems. |
| Code-Structural | A | General-purpose graph, not code-aware. |
| Cross-Session | **S** | Persistent graph enables cross-session continuity. |
| Decision Provenance | **S** | Causal edges in the graph can represent decision chains. |
| Failed Attempt Replay | **T** | Graph can store failed attempt nodes, but no dedicated replay mechanism. |
| Git-Aware | A | No git integration. |
| Team/Collab. | A | Single-agent graph (can be shared but no formal multi-user model). |
| Access Control | A | No access control. |
| Memory Provenance | **S** | Edge metadata tracks the source and context of each memory. |
| MCP Support | S | MCP server available. |
| Local Deployment | S | Can be self-hosted. |

### Cognee
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Knowledge graph with entity extraction. |
| Episodic | A | No episodic memory in the CoALA sense. |
| Procedural | **T** | Some pipeline-based processing that can encode workflows. Not formal procedural memory. |
| Auto-Generated | S | Automatic knowledge extraction. |
| Context Compaction | S | Graph consolidation. |
| Fact./Exp. Distinction | A | No distinction. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | **T** | Basic timestamps on graph nodes. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | **S** | Can ingest and represent code structure. |
| Cross-Session | **S** | Persistent knowledge graph. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git awareness. |
| Team/Collab. | A | Single-user. |
| Access Control | A | No access control. |
| Memory Provenance | **T** | Some source tracking in graph metadata. |
| MCP Support | S | MCP server. |
| Local Deployment | S | Can run locally with Ollama. |

### AgentMemory
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Stores semantic knowledge via vector embeddings and knowledge graph. |
| Episodic | **S** | Session-level memory capture with contextual information. |
| Procedural | **T** | Can store some procedural patterns but not formal workflow memory. |
| Auto-Generated | S | Automatic memory extraction. |
| Context Compaction | S | Memory consolidation and retrieval optimization. |
| Fact./Exp. Distinction | **T** | Some implicit distinction via different storage layers (KG vs. vector vs. BM25). |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | **T** | Basic timestamps. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | A | General-purpose, no code awareness. |
| Cross-Session | **S** | Designed for cross-session persistence. |
| Decision Provenance | **T** | Some contextual information stored with memories. Not formal provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git awareness. |
| Team/Collab. | A | Single-user. |
| Access Control | **S** | Implements namespace/scope-based access control for memories. |
| Memory Provenance | **T** | Some source tracking. |
| MCP Support | S | MCP server. |
| Local Deployment | S | Local deployment. |

### Letta / MemGPT
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Hierarchical memory store with core/archival memory. |
| Episodic | **T** | Archival memory can store conversation segments. Not structured episodic records. |
| Procedural | **T** | Agent can learn to use its memory tools in new ways, a form of implicit procedural learning. |
| Auto-Generated | A | Memory management is explicit — the LLM decides what to store via tool calls. Not automatic extraction. |
| Context Compaction | **T** | The LLM manages its own context via explicit read/write/search. More sophisticated than simple truncation but requires LLM judgment. |
| Fact./Exp. Distinction | **T** | Core memory (facts about user/system) vs archival memory (past interactions) provides some implicit distinction. |
| Staleness Detection | **T** | Agent can overwrite/update core memory, implicitly handling staleness. But no systematic detection. |
| Temporal Metadata | **T** | Archival entries carry timestamps. |
| Temporal Versioning | A | No formal versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | **T** | Can be configured for code-aware contexts, but not native. |
| Cross-Session | **S** | Core architectural feature — persistent memory across sessions. |
| Decision Provenance | **T** | Inner monologue provides some reasoning traces. Not formal provenance. |
| Failed Attempt Replay | **T** | Archival memory can store failed attempts if agent chooses to. Not systematic. |
| Git-Aware | A | No git awareness. |
| Team/Collab. | A | Single-agent memory (multi-agent configurations possible but no shared memory model). |
| Access Control | A | No access control. |
| Memory Provenance | **T** | Archival entries carry some source context. |
| MCP Support | S | MCP support. |
| Local Deployment | S | Can run locally with Ollama. |

### Codebase-Memory
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Tree-sitter knowledge graph of codebase structure. |
| Episodic | A | No episodic memory — focused on code structure. |
| Procedural | A | No procedural memory. |
| Auto-Generated | S | Automatically generates KG from code via Tree-sitter parsing. |
| Context Compaction | S | Graph-based retrieval avoids full-context loading. |
| Fact./Exp. Distinction | A | Only factual code structure, no experiential. |
| Staleness Detection | A | Re-indexes on change but no explicit staleness tracking. |
| Temporal Metadata | A | No temporal metadata. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | **S** | Core purpose — Tree-sitter based code structure graph across many languages. |
| Cross-Session | **S** | Persistent code structure graph. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git awareness (indexes current state, not history). |
| Team/Collab. | A | Single-user. |
| Access Control | A | No access control. |
| Memory Provenance | A | No provenance. |
| MCP Support | S | MCP server. |
| Local Deployment | S | Local deployment. |

### Engram-MCP
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | A | Not focused on factual/semantic storage. Focused on session handoffs. |
| Episodic | **S** | Core purpose — captures structured session episodes for handoff. |
| Procedural | **S** | Can encode workflows and procedures as part of session handoff context. |
| Auto-Generated | S | Automatic session capture. |
| Context Compaction | S | Session summarization for handoffs. |
| Fact./Exp. Distinction | **S** | Distinguishes session context (experiential) from project facts. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | **S** | Full temporal context on sessions (timestamps, durations, sequencing). |
| Temporal Versioning | **T** | Git-branch-aware sessions provide some temporal versioning via branch context. Not full bi-temporal. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | A | No code-structural awareness. |
| Cross-Session | **S** | Core purpose — session handoff across sessions. |
| Decision Provenance | **S** | Session records include decision context and rationale for handoffs. |
| Failed Attempt Replay | **S** | Captures what was tried and what failed for successor sessions. |
| Git-Aware | **S** | Core feature — git-branch-aware session handoffs. Memories scoped to branches. |
| Team/Collab. | A | Single-developer session handoffs. |
| Access Control | A | No access control. |
| Memory Provenance | **S** | Full provenance on session records (who, when, what branch). |
| MCP Support | S | MCP server. |
| Local Deployment | S | Local deployment. |

### Ourmem
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | S | Key-value and structured memory storage. |
| Episodic | A | No episodic memory. |
| Procedural | A | No procedural memory. |
| Auto-Generated | S | Automatic memory extraction. |
| Context Compaction | **T** | Some memory management but not full compaction. |
| Fact./Exp. Distinction | A | No distinction. |
| Staleness Detection | A | No staleness detection. |
| Temporal Metadata | **T** | Basic timestamps. |
| Temporal Versioning | A | No versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | A | General-purpose, not code-aware. |
| Cross-Session | **S** | Persistent memory across sessions. |
| Decision Provenance | A | No decision provenance. |
| Failed Attempt Replay | A | No replay. |
| Git-Aware | A | No git awareness. |
| Team/Collab. | **S** | Core feature — designed for multi-user/team memory sharing ("our" memory). |
| Access Control | **S** | User-level and group-level access control on memories. |
| Memory Provenance | **T** | Some tracking of memory origin. |
| MCP Support | S | MCP server. |
| Local Deployment | **T** | Can run locally but some features require cloud. |

### Hindsight
| Dimension | Rating | Reasoning |
|---|---|---|
| Semantic | A | Not focused on semantic/factual storage. Focused on attempt history. |
| Episodic | **S** | Core purpose — records episodes of what was attempted and what happened. |
| Procedural | A | No procedural memory. |
| Auto-Generated | S | Automatically captures attempt records. |
| Context Compaction | **T** | Some summarization of attempt history. |
| Fact./Exp. Distinction | A | Focused on experiential (attempts) only. No factual storage. |
| Staleness Detection | **T** | Awareness of which approaches have been tried and failed (implicit staleness of failed strategies). |
| Temporal Metadata | **T** | Timestamps on attempts. |
| Temporal Versioning | A | No formal versioning. |
| Bi-Temporal | A | No bi-temporal model. |
| Code-Structural | A | No code-structural awareness. |
| Cross-Session | **S** | Attempt history persists across sessions. |
| Decision Provenance | **T** | Attempt records provide some decision context (what was tried and why it failed). |
| Failed Attempt Replay | **S** | Core purpose — replays failed attempts to prevent repeating mistakes. |
| Git-Aware | A | No git awareness. |
| Team/Collab. | A | Single-user. |
| Access Control | A | No access control. |
| Memory Provenance | **T** | Attempt records carry context about origin. |
| MCP Support | S | MCP server. |
| Local Deployment | S | Local deployment. |

---

## Key Observations

1. **Gemini CLI Episodic (T)**: The four-tier hierarchy with "skills" extraction is the closest any production agent gets to episodic memory, but it's still a simplified extraction rather than full structured episode records. Rated partial, not full.

2. **Mem0 Team/Collab (T)**: Mem0 supports organization-level memory scoping, allowing memories to be shared within an org. This is basic collaborative memory but lacks formal access control or provenance.

3. **Devin Team/Collab (T)**: Devin's team collaboration is workflow-level (Slack integration, shared visibility) rather than memory-level. Team members can see what Devin did, but there's no shared memory store with access control.

4. **Text assertion "no production system supports episodic memory"**: This refers to full, structured episodic memory in the CoALA sense (complete session trajectories with decision rationale, queryable). Gemini CLI's partial support is acknowledged in the table with T rating. The text statement is accurate for full (S) support.

5. **Temporal versioning column**: Completely absent across all production agents, with only Graphiti/Zep and Engram-MCP (partial) offering any form of it among add-ons.
