# Expanded Table 1: Comprehensive Memory Capability Matrix

## Legend
- ✓ = Supported
- ◆ = Partial
- ✗ = Absent

## Dimensions (grouped)

### A. CoALA Memory Types
1. **Sem** — Semantic memory (instruction files, facts, conventions)
2. **Epi** — Episodic memory (structured past session records)
3. **Proc** — Procedural memory (workflows, skills, tool usage)

### B. Memory Operations
4. **Auto** — Auto-generated memories (vs human-written only)
5. **Comp** — Context compaction / summarization
6. **F/E** — Factual vs experiential distinction
7. **Stale** — Staleness detection / forgetting

### C. Temporal
8. **T-meta** — Temporal metadata (timestamps, ordering, decay)
9. **T-ver** — Temporal versioning (validity tracking)
10. **Bi-T** — Bi-temporal (event time vs ingestion time)

### D. SE-Specific
11. **Code** — Code-structural awareness (AST, dependency graphs)
12. **X-sess** — Cross-session learning / experience transfer
13. **Prov** — Decision provenance
14. **Fail** — Failed attempt replay
15. **Git** — Git-aware memory operations

### E. Collaboration & Governance
16. **Collab** — Collaborative / team-shared memory
17. **Gov** — Access control / governance
18. **M-prov** — Memory provenance tracking

### F. Integration
19. **MCP** — MCP protocol support
20. **Local** — Local / sovereign deployment

---

## Production SE Agent Harnesses

| Agent         | Sem | Epi | Proc | Auto | Comp | F/E | Stale | T-meta | T-ver | Bi-T | Code | X-sess | Prov | Fail | Git | Collab | Gov | M-prov | MCP | Local |
|---------------|-----|-----|------|------|------|-----|-------|--------|-------|------|------|--------|------|------|-----|--------|-----|--------|-----|-------|
| Claude Code   |  ✓  |  ✗  |  ✗   |  ✓   |  ✓   |  ✗  |   ✗   |   ✗    |   ✗   |  ✗   |  ✗   |   ✗    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ✗    |  ✓  |   ✓   |
| Gemini CLI    |  ✓  |  ◆  |  ◆   |  ✓   |  ✓   |  ✗  |   ✗   |   ◆    |   ✗   |  ✗   |  ◆   |   ◆    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ✗    |  ✓  |   ✓   |
| Codex CLI     |  ✓  |  ✗  |  ✗   |  ✓   |  ✓   |  ✗  |   ◆   |   ◆    |   ✗   |  ✗   |  ✗   |   ◆    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ✗    |  ✓  |   ✓   |
| Copilot       |  ✓  |  ✗  |  ✗   |  ✓   |  ✓   |  ✗  |   ◆   |   ◆    |   ✗   |  ✗   |  ◆   |   ✗    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ✗    |  ✓  |   ✗   |
| Cursor        |  ✓  |  ✗  |  ✗   |  ✗   |  ✓   |  ✗  |   ✗   |   ✗    |   ✗   |  ✗   |  ◆   |   ✗    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ✗    |  ✓  |   ✗   |
| OpenCode      |  ✓  |  ✗  |  ✗   |  ✗   |  ✓   |  ✗  |   ✗   |   ✗    |   ✗   |  ✗   |  ✗   |   ✗    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ✗    |  ✓  |   ✓   |
| Windsurf      |  ✓  |  ✗  |  ✗   |  ✓   |  ◆   |  ✗  |   ✗   |   ✗    |   ✗   |  ✗   |  ◆   |   ✗    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ✗    |  ✓  |   ✗   |
| Devin         |  ◆  |  ✗  |  ✗   |  ◆   |  ◆   |  ✗  |   ✗   |   ✗    |   ✗   |  ✗   |  ◆   |   ✗    |  ✗   |  ✗   |  ✗  |   ◆    |  ✗  |   ✗    |  ✓  |   ✗   |
| Aider         |  ◆  |  ✗  |  ✗   |  ✗   |  ✗   |  ✗  |   ✗   |   ✗    |   ✗   |  ✗   |  ◆   |   ✗    |  ◆   |  ✗   |  ✓  |   ✗    |  ✗  |   ✗    |  ◆  |   ✓   |
| OpenHands     |  ✓  |  ✗  |  ✗   |  ✗   |  ✓   |  ✗  |   ✗   |   ✗    |   ✗   |  ✗   |  ✗   |   ✗    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ✗    |  ✓  |   ✓   |

### Key observations (Production Agents):
- **Semantic memory** is universal (all 10, though 2 only partial)
- **Auto-generation** in 6/10 (Claude Code, Gemini, Codex, Copilot, Windsurf, Devin partial)
- **Context compaction** in 9/10 (all except Aider)
- **No agent** implements: full episodic, temporal versioning, bi-temporal, factual/experiential distinction, failed attempt replay, governance, or memory provenance
- **Gemini CLI** is most sophisticated: partial episodic, partial procedural (skills extraction), partial cross-session
- **Copilot** has unique JIT codebase verification (staleness ◆, temporal metadata ◆)
- **Codex CLI** has 30-day aging (staleness ◆, temporal metadata ◆)
- **Aider** is unique with native git-awareness and implicit decision provenance via commits
- **Cursor** notably removed auto-memory — quality degradation without proper architecture

---

## Selected MCP Community Add-ons

| Server             | Sem | Epi | Proc | Auto | Comp | F/E | Stale | T-meta | T-ver | Bi-T | Code | X-sess | Prov | Fail | Git | Collab | Gov | M-prov | MCP | Local |
|--------------------|-----|-----|------|------|------|-----|-------|--------|-------|------|------|--------|------|------|-----|--------|-----|--------|-----|-------|
| claude-mem         |  ✓  |  ✓  |  ✗   |  ✓   |  ✓   |  ✗  |   ✗   |   ◆    |   ✗   |  ✗   |  ✗   |   ✓    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ✗    |  ✓  |   ✓   |
| Mem0               |  ✓  |  ◆  |  ✗   |  ✓   |  ✓   |  ✗  |   ✗   |   ◆    |   ✗   |  ✗   |  ✗   |   ✓    |  ✗   |  ✗   |  ✗  |   ◆    |  ✗  |   ✗    |  ✓  |   ✓   |
| Graphiti / Zep     |  ✓  |  ✓  |  ✗   |  ✓   |  ✓   |  ✗  |   ✓   |   ✓    |   ✓   |  ✓   |  ✗   |   ✓    |  ✓   |  ◆   |  ✗  |   ✗    |  ✗  |   ✓    |  ✓  |   ✓   |
| Cognee             |  ✓  |  ✗  |  ◆   |  ✓   |  ✓   |  ✗  |   ✗   |   ◆    |   ✗   |  ✗   |  ✓   |   ✓    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ◆    |  ✓  |   ✓   |
| AgentMemory        |  ✓  |  ✓  |  ◆   |  ✓   |  ✓   |  ◆  |   ✗   |   ◆    |   ✗   |  ✗   |  ✗   |   ✓    |  ◆   |  ✗   |  ✗  |   ✗    |  ✓  |   ◆    |  ✓  |   ✓   |
| Letta / MemGPT     |  ✓  |  ◆  |  ◆   |  ✗   |  ◆   |  ◆  |   ◆   |   ◆    |   ✗   |  ✗   |  ◆   |   ✓    |  ◆   |  ◆   |  ✗  |   ✗    |  ✗  |   ◆    |  ✓  |   ✓   |
| Codebase-Memory    |  ✓  |  ✗  |  ✗   |  ✓   |  ✓   |  ✗  |   ✗   |   ✗    |   ✗   |  ✗   |  ✓   |   ✓    |  ✗   |  ✗   |  ✗  |   ✗    |  ✗  |   ✗    |  ✓  |   ✓   |
| Engram-MCP         |  ✗  |  ✓  |  ✓   |  ✓   |  ✓   |  ✓  |   ✗   |   ✓    |   ◆   |  ✗   |  ✗   |   ✓    |  ✓   |  ✓   |  ✓  |   ✗    |  ✗  |   ✓    |  ✓  |   ✓   |
| Ourmem             |  ✓  |  ✗  |  ✗   |  ✓   |  ◆   |  ✗  |   ✗   |   ◆    |   ✗   |  ✗   |  ✗   |   ✓    |  ✗   |  ✗   |  ✗  |   ✓    |  ✓  |   ◆    |  ✓  |   ◆   |
| Hindsight          |  ✗  |  ✓  |  ✗   |  ✓   |  ◆   |  ✗  |   ◆   |   ◆    |   ✗   |  ✗   |  ✗   |   ✓    |  ◆   |  ✓   |  ✗  |   ✗    |  ✗  |   ◆    |  ✓  |   ✓   |

### Key observations (MCP Add-ons):
- **Graphiti/Zep** is the only system with bi-temporal validity — and the most feature-rich overall
- **Engram-MCP** is the only git-aware system with decision provenance + failed attempt replay + factual/experiential distinction
- **Letta** has the most ◆ (partial) entries — self-managing architecture means capabilities depend on LLM behavior
- **Ourmem** is the only collaborative-first system with governance
- **AgentMemory** is the only other system with governance (role-based access)
- **No MCP server** implements full bi-temporal + code-structural + collaborative — the gap remains composite
- **Cognee** and **Codebase-Memory** are the only code-structure-aware servers
- **Cross-session learning** is well-covered (9/10 MCP add-ons)
- **Factual/experiential distinction** remains rare (only Engram-MCP full, Letta/AgentMemory partial)

---

## Ecosystem-wide coverage summary

| Dimension                    | Prod. Agents (of 10) | MCP Add-ons (of 10) | Combined |
|------------------------------|----------------------|----------------------|----------|
| Semantic memory              | 10 (2 partial)       | 8                    | 18/20    |
| Episodic memory              | 1 partial            | 6 (2 partial)        | 7/20     |
| Procedural memory            | 1 partial            | 4 (3 partial)        | 5/20     |
| Auto-generated memories      | 6 (1 partial)        | 9                    | 15/20    |
| Context compaction           | 9 (2 partial)        | 10 (4 partial)       | 19/20    |
| Factual/experiential dist.   | 0                    | 2 (2 partial)        | 2/20     |
| Staleness detection          | 2 partial            | 3 (2 partial)        | 5/20     |
| Temporal metadata            | 3 partial            | 8 (6 partial)        | 11/20    |
| Temporal versioning          | 0                    | 2 (1 partial)        | 2/20     |
| Bi-temporal validity         | 0                    | 1                    | 1/20     |
| Code-structural awareness    | 5 partial            | 3 (1 partial)        | 8/20     |
| Cross-session learning       | 2 partial            | 9                    | 11/20    |
| Decision provenance          | 1 partial            | 5 (3 partial)        | 6/20     |
| Failed attempt replay        | 0                    | 4 (2 partial)        | 4/20     |
| Git-aware operations         | 1                    | 1                    | 2/20     |
| Collaborative memory         | 1 partial            | 2 (1 partial)        | 3/20     |
| Governance / access control  | 0                    | 2                    | 2/20     |
| Memory provenance            | 0                    | 5 (4 partial)        | 5/20     |
| MCP support                  | 9 (1 partial)        | 10                   | 19/20    |
| Local deployment             | 6                    | 9 (1 partial)        | 15/20    |

### Bottom-5 capabilities (most critical gaps):
1. **Bi-temporal validity** — 1/20 (Graphiti/Zep only)
2. **Factual/experiential distinction** — 2/20
3. **Temporal versioning** — 2/20
4. **Git-aware operations** — 2/20 (Aider + Engram-MCP)
5. **Governance / access control** — 2/20
