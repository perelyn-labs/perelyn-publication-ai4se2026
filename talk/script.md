# Speaker Script: Memory-Aware Software Engineering Agents
*Architectures, Mechanisms, and Open Gaps*

**Target duration:** 20 minutes
**Venue:** AI4SE Workshop @ KI 2026, Bremen

---

## [Title Slide]
*~15s*

Good morning everyone. My name is Michael Banf, I'm from Perelyn GmbH in Munich. Today I'll be presenting our survey on memory-aware software engineering agents — specifically, the architectures that exist, the mechanisms that are emerging, and the gaps that still need closing.

---

## [Overview]
*~20s*

We'll start with the core problem — why memory matters for software engineering agents. Then we'll look at the production landscape: what do the tools we actually use every day ship in terms of memory? From there, we'll dive into three competing memory architectures from the research community, look at software engineering specific mechanisms, and close with six open gaps we've identified.

---

## --- Section: The Memory Problem ---
*~5s*

Let's start with the fundamental problem.

---

## Slide 1: Software Engineering Agents Are Stateless
*~80s*

Agentic AI systems now operate across the full software engineering lifecycle. Claude Code, Copilot, Cursor, Codex — they resolve bugs, review code, analyze architectures. And during each session, they accumulate significant knowledge about your project: they learn your conventions, discover your constraints, understand your architecture.

But here's the thing — all of that knowledge vanishes when the session ends. The next time you start a task, the agent begins from scratch. It repeats the same investigations, rediscovers the same constraints, re-learns the same project conventions. Every session is day one.

Now, every major AI provider has responded. They've all shipped some form of persistent memory. But — and this is our central finding — the capabilities that matter most, like episodic recall and temporal versioning, the kind of memory that would let an agent actually learn over time — those remain universally absent.

---

## Slide 2: The CoALA Memory Taxonomy
*~70s*

To structure this analysis, we use the CoALA framework, which maps human memory types onto agent components. There are four types.

Working memory is your active context window — that's well-served by modern large language models with their growing context lengths. Semantic memory covers facts and conventions — things like "we use tabs not spaces" or "our API uses REST." That's partially addressed by instruction files like CLAUDE.md or .cursorrules.

But then we get to the critical ones. Episodic memory — structured records of past experiences, like "last time we debugged this module, the problem was in the authentication layer" — that's almost entirely absent. And procedural memory — learned workflows, like knowing that in this codebase you always need to run the migration before testing — that's the rarest type of all.

So the capabilities that would make software engineering agents truly learn over time are precisely the ones nobody has built.

---

## --- Section: Production Landscape ---
*~5s*

So what does the production landscape actually look like?

---

## Slide 3: Ten SE Harnesses, Twenty Dimensions
*~60s*

We conducted a feature-level analysis of ten production software engineering agent harnesses — Claude Code, Gemini CLI, Codex CLI, Cursor, Copilot, Windsurf, OpenCode, Devin, Aider, and OpenHands. We evaluated them across twenty dimensions, grouped into six categories.

The central finding — what we call the episodic-temporal deficit — is stark: no production harness ships episodic memory or temporal versioning natively. The capabilities most critical for agents that should learn over time are those that no tool implements.

---

## Slide 4: Harness Memory Capabilities
*~70s*

Here's the simplified view. All ten harnesses support human-written instruction files — that's semantic memory, and it's well-adopted, though interestingly, research shows it provides little resolution improvement.

Five harnesses generate memories automatically — Claude Code, Codex CLI, Copilot, Windsurf, and Gemini CLI. But none of them distinguishes factual knowledge from experiential knowledge. They just dump everything into the same bucket.

Context compaction is implemented by several, but it's lossy — technical details, intermediate reasoning, and notably failed-approach information get discarded. And that last point matters enormously in software engineering.

And then look at the last two rows — temporal versioning and episodic memory. All red. Universally absent across every production tool.

---

## Slide 5: The Community Response: MCP Memory Add-Ons
*~70s*

The gap between what harnesses ship and what practitioners need has spawned a fascinating ecosystem. We identified over forty memory servers based on the Model Context Protocol, or MCP — community-built add-ons that fill the deficit.

Nine of ten major coding agents now support MCP, which makes these add-ons agent-agnostic. Some notable examples: claude-mem hooks into Claude Code's lifecycle events for session capture. AgentMemory provides a hybrid of keyword search, vector embeddings, and knowledge graph retrieval. Graphiti from Zep is the only reviewed production system with true bi-temporal validity intervals. Codebase-Memory builds a Tree-Sitter knowledge graph across your codebase. And Hindsight specifically captures failed attempts for replay.

But even in this thriving ecosystem, the imbalance persists — semantic memory is near-universal, while temporal versioning and procedural memory remain nearly absent.

---

## Slide 6: The Full Ecosystem
*~40s*

This is the full comparison matrix — twenty dimensions across both production harnesses and community add-ons. I won't walk through every cell, but I want you to notice the pattern: the columns on the right — temporal versioning, bi-temporal validity, governance — are almost entirely red. That's the gap.

---

## --- Section: Memory Architectures ---
*~5s*

Now let's look at what the research community is building to address this.

---

## Slide 7: Three Paradigms
*~80s*

From our classification of the ICLR 2026 MemAgents workshop contributions, three architectural paradigms have reached production maturity and been formally benchmarked against each other.

First, extraction-based memory — Mem0 is the exemplar. It extracts atomic facts from conversations and stores them as vector-indexed entries. It excels at factual recall. But extraction is lossy by design — when you convert a debugging session into atomic facts, you lose the causal chains, the temporal context, the reasoning paths.

Second, self-managing memory — Letta, formerly MemGPT. Here the large language model itself acts as an operating system managing its own memory through explicit read, write, and search operations. It excels at behavioral continuity — maintaining goals, tracking evolving state. But it's less transparent; you can't easily inspect or audit the agent's internal state.

Third, graph-based temporal memory — Graphiti from Zep. This is the only paradigm that distinguishes event time from ingestion time, with every edge carrying validity intervals. It excels at causal reasoning — understanding why a decision was made and how events connect across time. But it adds construction latency and complexity.

---

## Slide 8: The Case for Hybrid Architectures
*~60s*

The LoCoMo-Plus benchmark results make a compelling case: no single paradigm masters all competency types. These three approaches capture genuinely different aspects of the memory problem.

Several emerging directions point toward the future. Reinforcement learning based memory management — systems like Memory-R1 and AgeMem — replace heuristic policies with learned ones that discover non-obvious strategies, like preemptive summarization before the context window fills.

Multi-graph memory, as in MAGMA, represents each memory item across orthogonal semantic, temporal, causal, and entity graphs. For software engineering, this is powerful: you could query dependency relationships, decision provenance, API validity, and conceptual similarity independently.

And hybrid local-cloud architectures like LightMem and HyMem delegate routing to small local models while reserving large models for consolidation — important for cost and latency.

---

## --- Section: SE-Specific Mechanisms ---
*~5s*

Beyond general architectures, several mechanisms have been developed specifically for software engineering.

---

## Slide 9: Versioned Context & Decision Provenance
*~70s*

Two complementary approaches address version control for agent memory. The Git Context Controller introduces git-inspired operations — branching, merging, rolling back — for managing working memory within a single task execution. That's the intra-session problem.

The Lore protocol addresses the complementary inter-session problem. It repurposes git commit messages as structured decision records, carrying constraints, rejected alternatives, and verification metadata via native git trailers. This gives you queryable decision provenance.

Why does this matter? Research shows that each additional deviation in a mutating action reduces success odds. Errors compound as context length increases. Agents drift from stale constraints — deprecated APIs, outdated conventions. Decision provenance lets agents understand why the code is the way it is before proposing changes.

---

## Slide 10: Experiential & Procedural Learning
*~70s*

The SWE Context Bench gives us a critical finding: summarized experience improves resolution, but unfiltered experience actually hurts. You can't just dump everything into memory — curation matters.

Several approaches tackle this. Experiential Co-Learning mines experiences from historical trajectories. ERL — Experiential Reflective Learning — reflects on trajectories to generate transferable heuristics, and notably, self-generated experiences outperform externally seeded ones.

Live-SWE-agent takes a different approach — instead of remembering past experiences, it self-creates new tools during execution. That's procedural memory through self-modification.

Mem-p distills past trajectories into both fine-grained step-by-step instructions and higher-level script-like abstractions. Interestingly, procedural knowledge built from a stronger model transfers effectively to weaker ones.

One striking finding from WebCoach: seven-billion parameter models do not benefit from experiential memory at all. You need thirty-two billion plus parameter models to see gains. This implies experiential memory requires sufficient model capacity to reason over retrieved experience.

---

## Slide 11: Knowledge Graphs & Collaboration
*~70s*

For software engineering specifically, graph memory offers three advantages. First, dependency tracking — code repositories are inherently graph-structured: files import modules, classes inherit from others, functions call functions. Second, decision provenance — architectural decision records, code review discussions, and commit rationale form a causal graph. Third, temporal evolution — tracking when an API was valid, when a convention was adopted, when a dependency was deprecated.

On the collaboration side, software engineering is inherently collaborative, yet memory research exhibits a strong single-agent bias. The Collaborative Memory framework from Rezazadeh offers private memory — your debugging notes — versus shared memory — team conventions and decisions.

But there's a security concern. MINJA demonstrates that shared-memory agents are vulnerable to query-only injection attacks. For agents with access to codebases and deployment pipelines, memory poisoning is a critical supply-chain risk. And no one has addressed software engineering specific governance — access control aligned with repository permissions, memory provenance linked to code review approvals, or temporal policies tied to release cycles.

---

## --- Section: Open Gaps & Vision ---
*~5s*

Let me close with the six gaps we've identified.

---

## Slide 12: Six Open Gaps
*~70s*

One — cross-session learning. Resolution trajectories are still discarded after each session. Early research exists, but no production harness integrates it.

Two — temporal knowledge validity. No software engineering specific temporal memory exists, and there's only one software engineering specific temporal benchmark.

Three — procedural memory. Software engineering craft knowledge is overwhelmingly procedural — knowing how to debug, when to refactor, how to structure tests — yet procedural memory is the rarest type in both research and production.

Four — collaborative memory. Teams need shared decisions, private debugging notes, and repository-aligned access control.

Five — governance and security. Memory injection attacks are demonstrated, GDPR-compliant deletion is entirely unaddressed.

And six — MCP orchestration. The MCP ecosystem gives us composable building blocks, but no orchestration layer decides which memory to consult when, resolves conflicts between overlapping stores, or manages lifecycle across layers. Assembling the full stack remains a manual integration challenge.

---

## Slide 13: Key Takeaway
*~50s*

Our central argument is this: persistent, temporally grounded memory is the prerequisite for software engineering agents that learn alongside the teams they serve.

The factual-to-cognitive gap across production architectures is confirmed by benchmarks — systems are good at remembering facts, but poor at remembering experiences, reasoning, and temporal context.

The Model Context Protocol ecosystem provides composable building blocks, but assembling the full stack remains a manual challenge. Closing these gaps requires a coordinated effort to transform software engineering agents from amnesic tools into learning collaborators that grow alongside the software they help build.

Thank you.

---

## [Discussion]
*~30s*

I'd like to open the floor for discussion. Three questions to get us started:

How do you currently handle memory in your software engineering agent workflows? Which memory type — episodic, procedural, or temporal — would have the highest impact for your specific use case? And a philosophical one: should memory governance be managed by the agent itself, or should developers maintain explicit control?

I'm happy to take any questions.

---
