# AI in Production Workshop — Research Landscape Analysis
## Prepared for paper opportunity assessment (May 2026)

---

# 1. EXECUTIVE SUMMARY

This document synthesizes in-depth research across four areas relevant to the "Third Workshop on AI in Production" (IJCAI 2026, Bremen, Aug 11):

1. **Agentic AI in Manufacturing** — rapidly growing but agents are "largely stateless"
2. **Knowledge Graphs in Manufacturing** — mature infrastructure, but KG+agent memory integration is missing
3. **Physical Reasoning for LLMs** — fundamental gap (best models ~46% vs. humans ~76%)
4. **Memory Architectures for Industrial Agents** — the critical missing piece

**Core finding:** Manufacturing AI agents face ALL the same memory gaps identified in our SE research, PLUS domain-specific challenges (safety-criticality, real-time constraints, OT/IT segregation, regulatory compliance). There is no manufacturing-specific memory benchmark, no production agent with genuine episodic memory, and the KG infrastructure exists but hasn't been connected to agent memory architectures.

---

# 2. AGENTIC AI IN MANUFACTURING — STATE OF THE FIELD

## 2.1 Maturity Level
- Field is at an inflection point: 79% of enterprises claim AI agent adoption, but only **11% run them in production**
- Gartner: 40% of enterprise apps will embed AI agents by end of 2026 (up from <5% in 2025)
- Deloitte: fourfold increase in agentic AI adoption in manufacturing by 2026 (6% → 24%)
- Most deployments are Level 1-2 autonomy (bounded, human-supervised)

## 2.2 Key Surveys
| Survey | Authors | Venue | Key Finding |
|--------|---------|-------|-------------|
| Agentic AI in Engineering & Manufacturing | Edwards et al. (MIT) | arXiv 2604.09633, 2026 | 33 interviews, 28 companies: adoption constrained by data fragmentation, not model capability |
| AI Agents and Agentic AI for Future Manufacturing | Ren et al. (Auckland) | J. Manufacturing Systems, 2025 | Five-stage evolutionary pathway; memory module identified as core architecture component |
| Agentic AI Comprehensive Survey | Masterman et al. | Artificial Intelligence Review, 2025 | 90 studies; agents are "largely stateless" — persistent memory is fundamental weakness |
| Integrating LLMs into Digital Manufacturing | Ouerghemmi & Ertz | Computers (MDPI), 2025 | 53 papers; literature fragmented, lacks integrative framework |
| Agentic AI for Smart Manufacturing | Lee & Su (Maryland) | Manufacturing Letters, 2025 | Five-module framework with Data-Model-Knowledge lake |

## 2.3 Concrete Systems and Frameworks
| System | Focus | Key Result |
|--------|-------|------------|
| **A4PS** (2026) | Production planning/scheduling | Multi-agent APS with RAG+CoT; outperforms basic LLMs |
| **IMR-LLM** (2026) | Industrial multi-robot task planning | LLMs construct disjunctive graphs; created IMR-Bench |
| **Vyas & Mercangoz** (2025) | Autonomous industrial control | GPT-4o: 99.63% first-pass accuracy; latency limits real-time use |
| **Lim et al.** (2026) | LLM safety verification | LTLf verification: LLM-only 50-76% rule satisfaction → with verification 86-92% |
| **Ceramic Tile Case** (2025) | Predictive maintenance | 94% accuracy, 67% fewer false positives, 43% less unplanned downtime |

## 2.4 Industry Deployments
- **Siemens + NVIDIA** (2026): "World's first fully AI-driven, adaptive manufacturing sites" — first blueprint at Siemens Erlangen
- **PepsiCo**: Digital twins identify up to 90% of potential issues before physical modification
- **Toyota + Invisible AI**: Vision Execution System for real-time production cycle analysis
- **ABB**: AI agents + Genix Industrial IoT for root-cause analysis
- **XMPro APEX**: Named in Gartner's 2026 Emerging Tech Impact Radar; agents with memory, planning, tools

## 2.5 The Memory Gap in Manufacturing Agents
**This is the most underdeveloped dimension.** Current approaches:
- RAG-based knowledge retrieval (most common)
- Context retention within sessions only
- Digital twin state tracking
- Knowledge graphs (curated, static)

**What's missing:**
- No episodic memory (remembering specific past events)
- No continual/lifelong learning
- No temporal versioning
- No cross-session learning
- No adaptive self-improvement from deployment feedback

**Critical context:** MIT study (Edwards et al.) highlights that most manufacturing expertise is **tacit** — in experienced workers' heads. Average age in small manufacturing shops is ~55, ownership in 60s. This is a workforce retirement knowledge crisis that memory-enabled agents could address.

---

# 3. KNOWLEDGE GRAPHS IN MANUFACTURING

## 3.1 Market and Maturity
- Enterprise KG market: $1.34B (2025) → $19.16B (2033), CAGR ~22-31%
- LLMs without KG grounding: **16.7% accuracy** on complex queries; with KG: **54.2%** (+37.5pp)
- KG construction reaching production maturity (300-320% ROI in 2024-2025)

## 3.2 Key Survey
**"Making knowledge graphs work for smart manufacturing"** (Wan et al., Cardiff, J. Manufacturing Systems, 2024) — most comprehensive survey. Two core challenges: (a) synthesizing complex manufacturing data requiring advanced semantic analysis, (b) contextualizing manufacturing systems requiring dynamic knowledge representation.

## 3.3 KG + LLM Integration (The Hot Topic)
| System | Approach | Result |
|--------|----------|--------|
| **Intent-Driven MaaS** (arXiv 2602.12419, 2026) | Fine-tuned Mistral-7B + Neo4j KG grounded in ISA-95 | 89.33% exact match, 97.27% overall accuracy |
| **ARKNESS** (arXiv 2506.13026, 2025) | Zero-shot KG construction + RAG for CNC planning | 3B Llama-3 matches GPT-4o (+25pp accuracy, +22.4pp F1) |
| **CausalKGPT** (2024) | Causal KG + P-tuning ChatGLM for aerospace quality | Outperforms ChatGPT/GPT-4 on domain tasks |
| **MKG Intelligence** (Adv. Eng. Informatics, 2025) | Auto KG construction agent + refinement agent + Q&A | Addresses LLM-constructed KG incompleteness |
| **Document GraphRAG** (Electronics, 2025) | KGs from document structure in RAG pipeline | Consistent gains over naive RAG |

## 3.4 Digital Twin + KG Convergence
- **Multi-layer KG Digital Twin** (Scientific Reports, 2024): Three-layer architecture (Concept/Model/Decision); validated 5 months, 200 batches in aero-engine blade production; qualification rate 81.3% → 85.2%
- **Self-evolving Digital Twins** (2026): LLM-driven multi-agent system; **47% reduction in changeover/recovery times**

## 3.5 Enterprise Platforms
| Platform | Organization | Focus |
|----------|-------------|-------|
| metaphactory | Siemens/metaphacts | Smart manufacturing planning |
| IRIS Foundry | SymphonyAI | Industrial data fabric |
| Cambridge Semantics | Altair/Siemens | 3D model-sensor integration |
| SAP Knowledge Graph | SAP | Factory-X initiative (47 partners, until mid-2026) |
| Neo4j + MCP | Neo4j Inc. | First data-level MCP integration (Dec 2024) |

## 3.6 The Missing Link: KG as Agent Memory
- Neo4j MCP server exists, Mem0 graph memory exists, Zep temporal graphs exist
- **But:** No published paper demonstrates KG-backed episodic or experiential memory for manufacturing agents
- The "Making MKG more intelligent" paper (2025) proposes KG construction/refinement agents but not KG-as-memory
- **This is the clear open research opportunity**

---

# 4. PHYSICAL REASONING FOR LLMs

## 4.1 The Fundamental Gap
Best LLMs score ~46% on physical reasoning benchmarks where humans score ~76%. This is a **30pp gap**.

| Benchmark | Best Model | Score | Human | Gap |
|-----------|-----------|-------|-------|-----|
| **PhyX** (2025) | GPT-o4-mini | 45.8% | 75.6% | ~30pp |
| **PHYBench** (NeurIPS 2025) | Gemini 2.5 Pro | 36.9% | 61.9% | ~25pp |
| **PhysReason** (ACL 2025) | o3-mini-high | <60% | — | — |

Three critical weaknesses (from PhyX):
1. Over-reliance on memorized knowledge rather than foundational understanding
2. Excessive dependence on mathematical formulations
3. Surface-level visual pattern matching instead of genuine physical comprehension

## 4.2 Embodied AI and Manufacturing
- WEF published "Physical AI: Powering the New Age of Industrial Operations" (Sept 2025)
- Embodied AI market: $4.44B (2025) → $23.06B (2030), 39% CAGR
- 70% of manufacturing plants projected to deploy AMRs by 2030
- **Core problem:** LLMs lack physical intuition — they don't understand geometry, dynamics, or sensor inputs

## 4.3 World Models (The Post-LLM Paradigm)
- **NVIDIA Cosmos**: Open-source world foundation model, 20M hours of real-world data, 2M+ downloads
- **AMI Labs (LeCun)**: JEPA architecture; V-JEPA 2 deployed zero-shot on Franka robot arms
- **World Labs (Fei-Fei Li)**: $1B funding; Marble platform for consistent 3D environments
- **LLMPhy** (Mitsubishi, AISTATS 2026): LLM generates code to estimate physical parameters via analysis-by-synthesis

## 4.4 Memory for Physical Reasoning (Emerging)
| System | Memory Type | Key Result |
|--------|------------|------------|
| **RoboMemory** (2025) | Spatial + Temporal + Episodic + Semantic (brain-inspired) | +26.5% success rate; open-source 72B beats Claude 3.5 |
| **MemoryVLA** (2025) | Perceptual-Cognitive Memory Bank + working memory | 84% success, +26pp on long-horizon tasks |
| **Chameleon** (2026) | Geometry-grounded episodic memory | Hierarchical differentiable memory stack |
| **Dejavu** (2025) | Experience Feedback Networks | Learning from experience with fixed weights |

## 4.5 The Emerging Architecture
Research converges on a hybrid stack:
```
[LLM/VLM Layer]     — semantic reasoning, task planning, NL interface
[World Model Layer]  — JEPA/Cosmos/simulator for physics-aware prediction
[Memory Layer]       — episodic + spatial + semantic (RoboMemory, MemoryVLA)
[VLA/Action Layer]   — direct robot control (Gemini Robotics, pi-0, GEN-0)
[Verification Layer] — neuro-symbolic checking against physical constraints
```

---

# 5. MEMORY ARCHITECTURES FOR INDUSTRIAL AGENTS

## 5.1 Market Context
- AI agent memory market: $6.27B (2026), projected $28.45B by 2030 (35% CAGR)
- **65% of enterprise AI failures in 2025 attributed to context drift or memory loss**
- No flagship model fully integrates production-grade continual learning

## 5.2 Memory Types Mapped to Manufacturing

| Memory Type | General Status | Manufacturing Status |
|-------------|---------------|---------------------|
| **Working** | Context window as working memory; 5 compression mechanisms identified | Acute constraints: must reason over sensor streams + schedules + maintenance simultaneously |
| **Episodic** | Zep tracks temporal state changes; Chronological Awareness scores 0.204-0.290 | **Critical for fault memory** — but no manufacturing agent implements it |
| **Semantic** | Mem0, Supermemory (vector-based) | Encodes machine tolerances, material properties; FDRKG-LLM uses KGs as externalized semantic memory |
| **Procedural** | LEGOMem (AAMAS 2026), Mem^p (2025) | Directly applicable to assembly/changeover/maintenance — but evaluated only on software/web tasks |

## 5.3 Key Manufacturing-Specific Memory Papers
| Paper | Focus | Key Result |
|-------|-------|------------|
| **Memory-Augmented LLM for 3D Printing** (Liu et al., 2025) | Case-based memory for work order merging | Iterations to valid merge: 6.4 → 2.9 |
| **Self-evolving Digital Twins** (2026) | KG + behavior models + geometric reconfiguration | 47% reduction in changeover times |
| **COGNIMAN** (EU Horizon, 2025) | Cognitive digital twin with memory/perception/reasoning | EU flagship effort |
| **FDRKG-LLM** (2025) | KG-enhanced fault diagnostic reasoning | Outperforms standard RAG for mechanical fault analysis |
| **Time-aware KG for Fault Prediction** (2025) | Temporal KG + LSTM + ComplEx | 100% F1 on bearing fault classification |
| **Tercan et al.** (2022) | Memory-aware synapses for injection molding | Prevents catastrophic forgetting across tasks |

## 5.4 Unique Manufacturing Memory Requirements
| Requirement | Manufacturing | General Agents |
|-------------|--------------|----------------|
| **Safety-criticality** | Memory errors → physical harm | Incorrect outputs |
| **Real-time** | Sub-second retrieval for control loops | Seconds latency OK |
| **OT/IT segregation** | Air-gapped environments, separate agent instances | Single network |
| **Temporal granularity** | Millisecond sensor timestamps, multi-scale patterns | Minutes to days |
| **Multi-modal** | Sensor time-series + images + audio + ERP + natural language | Primarily text |
| **Regulatory** | EU AI Act (Aug 2026), ISO 13849, IEC 62443 | GDPR primarily |
| **Memory poisoning** | Physical safety consequences | Data/financial |
| **Collaborative** | Multi-robot coordination, shift handoff | Multi-user personalization |
| **Continual adaptation** | Production drift, tool wear, material changes | Task variety |

## 5.5 Security Concerns
- **MemoryGraft** (Dec 2025): Memory poisoning via implanted false experiences
- **OWASP ASI06** (2026): Memory poisoning as top agentic risk; >95% injection success rates
- Only 26% of S&P 500 companies have comprehensive AI governance policies
- In manufacturing: an attacker implanting false memory about equipment parameters → equipment damage or safety incidents

---

# 6. GAP ANALYSIS — YOUR SE FINDINGS vs. MANUFACTURING

Your six gaps from the SE paper map remarkably well:

| Gap | SE Finding | Manufacturing Status | Opportunity |
|-----|-----------|---------------------|-------------|
| **1. Experiential Learning** | Agents cannot learn from past episodes | Same — only Liu et al. (3D printing) implements case-based memory | HIGH |
| **2. Temporal Consistency** | Only 4% deep temporal | Slightly better (temporal KGs for fault prediction), but separate from agent memory | HIGH |
| **3. Collaborative Memory** | Missing from harnesses | XMPro has shared decision memory, but not true collaborative episodic memory | MEDIUM-HIGH |
| **4. Governance/Security** | Absent from harnesses | More advanced due to EU AI Act, but memory-specific governance weak | MEDIUM |
| **5. Procedural Memory** | Underexplored | LEGOMem/Mem^p exist but evaluated only on software/web — not manufacturing | HIGH |
| **6. Comprehensive Benchmarks** | Lacking | **Even worse** — no manufacturing-specific memory benchmark exists at all | VERY HIGH |

---

# 7. PAPER OPPORTUNITY ASSESSMENT

## 7.1 Option A: "Memory-Augmented Agents for Manufacturing: A Gap Analysis" (Position Paper, 5p)
**Angle:** Bridge your SE memory gap analysis to manufacturing. Argue that the memory crisis is even more acute in manufacturing due to safety-criticality, real-time constraints, and the tacit knowledge retirement problem.

**Structure:**
1. The agent memory gap (brief recap of SE findings)
2. Why manufacturing is harder (unique requirements table)
3. Current manufacturing agent landscape (largely stateless)
4. The missing KG-as-memory link
5. Research agenda for memory-enabled manufacturing agents

**Strength:** Directly leverages your existing research; unique cross-domain perspective (SE memory → manufacturing memory); fills a clear gap (no one has connected these dots).

## 7.2 Option B: "Knowledge Graphs as Agent Memory Backends for Manufacturing" (Short Paper, 5p)
**Angle:** The KG infrastructure exists (Neo4j MCP, ISA-95 ontologies, manufacturing KGs), and the agent memory frameworks exist (Mem0, Zep, Letta), but nobody has connected them for manufacturing agents.

**Structure:**
1. KG maturity in manufacturing
2. Agent memory architecture gaps
3. Proposed integration: KG-backed episodic/semantic/procedural memory
4. Requirements specific to manufacturing (real-time, safety, temporal granularity)
5. Prototype architecture or conceptual framework

**Strength:** Very specific, actionable contribution; KG+LLM is the hot topic at this workshop; connects to "Knowledge Graphs in Manufacturing" track directly.

## 7.3 Option C: "Physical Memory: Towards Experience-Grounded Agents in Production" (Full Paper, 10p)
**Angle:** Combine physical reasoning gaps (LLMs score ~46% on physics) with memory gaps to argue for a new class of "physically-grounded memory" — agents that remember physical interactions and build experiential models of production processes.

**Structure:**
1. Physical reasoning limitations of LLMs (benchmarks)
2. Memory architectures for embodied agents (RoboMemory, MemoryVLA, Chameleon)
3. Manufacturing-specific requirements (real-time, multi-modal, safety)
4. The hybrid architecture (LLM + world model + memory + verification)
5. Case study: predictive maintenance with episodic physical memory
6. Benchmark proposal for manufacturing agent memory

**Strength:** Most ambitious; combines all four research areas; novel contribution. But significantly more work.

## 7.4 Recommended: Option A
Given the May 30 deadline (12 days), **Option A** maximizes reuse of your existing work while providing a genuine novel contribution to this workshop's audience. The manufacturing audience likely hasn't seen the agent memory gap analysis, and framing it for their domain with the unique requirements table is compelling.

---

# 8. KEY REFERENCES (Most Relevant for a Paper)

## Must-Cite Surveys
- Edwards et al. (2026). "Agentic AI in Engineering and Manufacturing." arXiv:2604.09633
- Ren et al. (2025). "AI Agents and Agentic AI for Future Manufacturing." J. Manufacturing Systems
- Masterman et al. (2025). "Agentic AI: A Comprehensive Survey." Artificial Intelligence Review
- Wan et al. (2024). "Making knowledge graphs work for smart manufacturing." J. Manufacturing Systems
- Du (2026). "Memory for Autonomous LLM Agents." arXiv:2603.07670

## Memory-Specific
- Liu et al. (2025). "Memory-Augmented LLM for 3D Printing Work Orders." arXiv:2504.02509
- Yu et al. (2026). "Agentic Memory: Unified Long-Term and Short-Term Memory Management." arXiv:2601.01885
- He et al. (2026). "MemoryArena: Benchmarking Agent Memory." arXiv:2602.16313
- LEGOMem (AAMAS 2026). arXiv:2510.04851
- Chertkov (2026). "Temporal Memory for Resource-Constrained Agents." arXiv:2604.00067

## KG + LLM in Manufacturing
- Intent-Driven Smart Manufacturing (arXiv:2602.12419, 2026)
- ARKNESS (arXiv:2506.13026, 2025)
- CausalKGPT (Adv. Eng. Informatics, 2024)
- FDRKG-LLM (Int. J. Production Research, 2025)

## Physical Reasoning + Memory
- RoboMemory (arXiv:2508.01415, 2025)
- MemoryVLA (arXiv:2508.19236, 2025)
- Chameleon (arXiv:2603.24576, 2026)
- PhyX Benchmark (arXiv:2505.15929, 2025)
- LLMPhy (AISTATS 2026, arXiv:2411.08027)

## Industry/Production
- Vyas & Mercangoz (2025). Autonomous Industrial Control. arXiv:2411.05904
- A4PS Framework (2026). J. Manufacturing Systems
- Self-evolving Digital Twins (2026). Smart Manufacturing and Sustainability
- COGNIMAN (2025). J. Intelligent Manufacturing
- XMPro APEX (Gartner 2026 Emerging Tech)
