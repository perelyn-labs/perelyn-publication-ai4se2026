#!/usr/bin/env python3
"""Generate Excalidraw expanded ecosystem table — 20 dimensions, grouped headers."""

import json
import random
import os
import math

random.seed(42)

def gid():
    c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    return ''.join(random.choice(c) for _ in range(21))

def sd():
    return random.randint(1, 2**31 - 1)

BASE = {
    "angle": 0, "fillStyle": "solid", "strokeStyle": "solid",
    "roughness": 1, "opacity": 100, "groupIds": [], "frameId": None,
    "roundness": None, "isDeleted": False, "boundElements": None,
    "updated": 1700000000000, "link": None, "locked": False,
}

def rect(x, y, w, h, bg="transparent", stroke="#343a40", sw=1, roughness=1):
    return {**BASE, "id": gid(), "type": "rectangle",
            "x": x, "y": y, "width": w, "height": h,
            "strokeColor": stroke, "backgroundColor": bg,
            "strokeWidth": sw, "roughness": roughness,
            "seed": sd(), "version": 1, "versionNonce": sd()}

def txt(x, y, t, fs=14, ff=1, align="left", color="#212529", w=None, angle=0):
    lines = t.split("\n")
    lh = 1.25
    est_w = max(len(l) for l in lines) * fs * 0.6
    est_h = len(lines) * fs * lh
    return {**BASE, "id": gid(), "type": "text",
            "x": x, "y": y, "width": w or est_w, "height": est_h,
            "angle": angle,
            "strokeColor": color, "backgroundColor": "transparent",
            "strokeWidth": 1,
            "text": t, "fontSize": fs, "fontFamily": ff,
            "textAlign": align, "verticalAlign": "top",
            "containerId": None, "originalText": t, "lineHeight": lh,
            "seed": sd(), "version": 1, "versionNonce": sd()}

def ell(x, y, w, h, bg="transparent", stroke="#343a40", sw=1.5):
    return {**BASE, "id": gid(), "type": "ellipse",
            "x": x, "y": y, "width": w, "height": h,
            "strokeColor": stroke, "backgroundColor": bg,
            "strokeWidth": sw,
            "seed": sd(), "version": 1, "versionNonce": sd()}

def dia(x, y, w, h, bg="transparent", stroke="#343a40", sw=1.5):
    return {**BASE, "id": gid(), "type": "diamond",
            "x": x, "y": y, "width": w, "height": h,
            "strokeColor": stroke, "backgroundColor": bg,
            "strokeWidth": sw,
            "seed": sd(), "version": 1, "versionNonce": sd()}

def ln(x1, y1, x2, y2, stroke="#dee2e6", sw=1):
    return {**BASE, "id": gid(), "type": "line",
            "x": x1, "y": y1,
            "width": abs(x2 - x1), "height": abs(y2 - y1),
            "strokeColor": stroke, "backgroundColor": "transparent",
            "strokeWidth": sw,
            "points": [[0, 0], [x2 - x1, y2 - y1]],
            "lastCommittedPoint": None,
            "startBinding": None, "endBinding": None,
            "startArrowhead": None, "endArrowhead": None,
            "seed": sd(), "version": 1, "versionNonce": sd()}

# ── Table data ────────────────────────────────────────────────
# S=Supported (blue circle), T=Partial (yellow diamond), A=Absent (empty circle)
S, T, A = 'S', 'T', 'A'

groups = [
    ("Memory Types (CoALA)", [
        "Semantic", "Episodic", "Procedural"
    ]),
    ("Memory Operations", [
        "Auto-Generated", "Context Compaction", "Fact./Exp. Distinction", "Staleness Detection"
    ]),
    ("Temporal", [
        "Temporal Metadata", "Temporal Versioning", "Bi-Temporal"
    ]),
    ("SE-Specific Capabilities", [
        "Code-Structural", "Cross-Session", "Decision Provenance", "Failed Att. Replay", "Git-Aware"
    ]),
    ("Collab. & Governance", [
        "Collab./Team", "Access Control", "Memory Provenance"
    ]),
    ("Integration", [
        "MCP Support", "Local Deployment"
    ]),
]

# Group colors for headers
group_colors = ["#1864ab", "#2b8a3e", "#c92a2a", "#e67700", "#7048e8", "#495057"]

agents = [
    ("Claude Code",   [S,A,A,  S,S,A,A,  A,A,A,  A,A,A,A,A,  A,A,A,  S,S]),
    ("Gemini CLI",    [S,T,T,  S,S,A,A,  T,A,A,  T,T,A,A,A,  A,A,A,  S,S]),
    ("Codex CLI",     [S,A,A,  S,S,A,T,  T,A,A,  A,T,A,A,A,  A,A,A,  S,S]),
    ("Copilot",       [S,A,A,  S,S,A,T,  T,A,A,  T,A,A,A,A,  A,A,A,  S,A]),
    ("Cursor",        [S,A,A,  A,S,A,A,  A,A,A,  T,A,A,A,A,  A,A,A,  S,A]),
    ("OpenCode",      [S,A,A,  A,S,A,A,  A,A,A,  A,A,A,A,A,  A,A,A,  S,S]),
    ("Windsurf",      [S,A,A,  S,T,A,A,  A,A,A,  T,A,A,A,A,  A,A,A,  S,A]),
    ("Devin",         [T,A,A,  T,T,A,A,  A,A,A,  T,A,A,A,A,  T,A,A,  S,A]),
    ("Aider",         [T,A,A,  A,A,A,A,  A,A,A,  T,A,T,A,S,  A,A,A,  T,S]),
    ("OpenHands",     [S,A,A,  A,S,A,A,  A,A,A,  A,A,A,A,A,  A,A,A,  S,S]),
]

addons = [
    ("claude-mem",       [S,S,A,  S,S,A,A,  T,A,A,  A,S,A,A,A,  A,A,A,  S,S]),
    ("Mem0",             [S,T,A,  S,S,A,A,  T,A,A,  A,S,A,A,A,  T,A,A,  S,S]),
    ("Graphiti / Zep",   [S,S,A,  S,S,A,S,  S,S,S,  A,S,S,T,A,  A,A,S,  S,S]),
    ("Cognee",           [S,A,T,  S,S,A,A,  T,A,A,  S,S,A,A,A,  A,A,T,  S,S]),
    ("AgentMemory",      [S,S,T,  S,S,T,A,  T,A,A,  A,S,T,A,A,  A,S,T,  S,S]),
    ("Letta / MemGPT",   [S,T,T,  A,T,T,T,  T,A,A,  T,S,T,T,A,  A,A,T,  S,S]),
    ("Codebase-Memory",  [S,A,A,  S,S,A,A,  A,A,A,  S,S,A,A,A,  A,A,A,  S,S]),
    ("Engram-MCP",       [A,S,S,  S,S,S,A,  S,T,A,  A,S,S,S,S,  A,A,S,  S,S]),
    ("Ourmem",           [S,A,A,  S,T,A,A,  T,A,A,  A,S,A,A,A,  S,S,T,  S,T]),
    ("Hindsight",        [A,S,A,  S,T,A,T,  T,A,A,  A,S,T,S,A,  A,A,T,  S,S]),
]

# ── Layout ────────────────────────────────────────────────────
all_cols = []
for gname, cols in groups:
    all_cols.extend(cols)

NC = len(all_cols)
LABEL_W = 190
COL_W = 55
HEADER_H = 30          # group header row
SUB_HEADER_H = 160     # rotated text area
ROW_H = 32
SECTION_H = 28
SYM = 14

n_agents = len(agents)
n_addons = len(addons)
TW = LABEL_W + NC * COL_W
TH = HEADER_H + SUB_HEADER_H + SECTION_H + n_agents * ROW_H + SECTION_H + n_addons * ROW_H

els = []

# ── Group header backgrounds ─────────────────────────────────
col_offset = 0
for gi, (gname, cols) in enumerate(groups):
    gx = LABEL_W + col_offset * COL_W
    gw = len(cols) * COL_W
    # Pale tinted background for group
    pale_colors = ["#d0ebff", "#d3f9d8", "#ffe3e3", "#fff3bf", "#e5dbff", "#e9ecef"]
    els.append(rect(gx, 0, gw, HEADER_H, bg=pale_colors[gi],
                    stroke="transparent", roughness=0))
    # Group label text
    tw = gw - 8
    els.append(txt(gx + 4, 6, gname, fs=11, ff=1,
                   align="center", w=tw, color=group_colors[gi]))
    col_offset += len(cols)

# ── Sub-header background ────────────────────────────────────
els.append(rect(LABEL_W, HEADER_H, NC * COL_W, SUB_HEADER_H,
                bg="#f8f9fa", stroke="transparent", roughness=0))

# ── Name column header background ────────────────────────────
els.append(rect(0, 0, LABEL_W, HEADER_H + SUB_HEADER_H,
                bg="#e9ecef", stroke="transparent", roughness=0))

# ── Sub-header labels (90° rotated) ──────────────────────────
RAD90 = -math.pi / 2  # 90° counter-clockwise
for i, colname in enumerate(all_cols):
    cx = LABEL_W + i * COL_W + COL_W / 2
    # Place text at bottom of sub-header area, rotated upward
    tx = cx + 5
    ty = HEADER_H + SUB_HEADER_H - 8
    els.append(txt(tx, ty, colname, fs=11, ff=1,
                   color="#343a40", angle=RAD90))

# ── Section backgrounds & labels ──────────────────────────────
y_s1 = HEADER_H + SUB_HEADER_H
els.append(rect(0, y_s1, TW, SECTION_H, bg="#e9ecef", stroke="transparent", roughness=0))
els.append(txt(10, y_s1 + SECTION_H / 2 - 7,
               "Production Agents", fs=11, ff=1, color="#495057"))

y_agents_start = y_s1 + SECTION_H

# Alternating stripes for agent rows
for i in range(n_agents):
    y = y_agents_start + i * ROW_H
    if i % 2 == 1:
        els.append(rect(0, y, TW, ROW_H, bg="#f8f9fa", stroke="transparent", roughness=0))

y_s2 = y_agents_start + n_agents * ROW_H
els.append(rect(0, y_s2, TW, SECTION_H, bg="#e9ecef", stroke="transparent", roughness=0))
els.append(txt(10, y_s2 + SECTION_H / 2 - 7,
               "Selected MCP Community Add-ons", fs=11, ff=1, color="#495057"))

y_addons_start = y_s2 + SECTION_H

# Alternating stripes for addon rows
for i in range(n_addons):
    y = y_addons_start + i * ROW_H
    if i % 2 == 1:
        els.append(rect(0, y, TW, ROW_H, bg="#f8f9fa", stroke="transparent", roughness=0))

# ── Table border ──────────────────────────────────────────────
els.append(rect(0, 0, TW, TH, stroke="#495057", sw=2, roughness=1))

# ── Grid lines ────────────────────────────────────────────────
# Header separator
els.append(ln(0, HEADER_H, TW, HEADER_H, stroke="#adb5bd", sw=1))
els.append(ln(0, HEADER_H + SUB_HEADER_H, TW, HEADER_H + SUB_HEADER_H, stroke="#495057", sw=2))

# Section separators
els.append(ln(0, y_s1, TW, y_s1, stroke="#adb5bd", sw=1))
els.append(ln(0, y_s1 + SECTION_H, TW, y_s1 + SECTION_H, stroke="#adb5bd", sw=1))
els.append(ln(0, y_s2, TW, y_s2, stroke="#adb5bd", sw=1))
els.append(ln(0, y_s2 + SECTION_H, TW, y_s2 + SECTION_H, stroke="#adb5bd", sw=1))

# Row separators
for i in range(1, n_agents):
    y = y_agents_start + i * ROW_H
    els.append(ln(0, y, TW, y, stroke="#dee2e6", sw=0.5))
for i in range(1, n_addons):
    y = y_addons_start + i * ROW_H
    els.append(ln(0, y, TW, y, stroke="#dee2e6", sw=0.5))

# Label column separator
els.append(ln(LABEL_W, 0, LABEL_W, TH, stroke="#495057", sw=1.5))

# Thin column separators
for i in range(1, NC):
    x = LABEL_W + i * COL_W
    els.append(ln(x, HEADER_H, x, TH, stroke="#e9ecef", sw=0.5))

# Group separators (thicker)
col_offset = 0
for gname, cols in groups:
    if col_offset > 0:
        x = LABEL_W + col_offset * COL_W
        els.append(ln(x, 0, x, TH, stroke="#adb5bd", sw=1))
    col_offset += len(cols)

# ── Data rows ─────────────────────────────────────────────────
def draw_rows(rows, y_start):
    for i, (name, values) in enumerate(rows):
        y = y_start + i * ROW_H
        ty = y + ROW_H / 2 - 7
        els.append(txt(10, ty, name, fs=12, ff=1, color="#212529"))

        for ci, val in enumerate(values):
            cx = LABEL_W + ci * COL_W + COL_W / 2
            cy = y + ROW_H / 2
            sx, sy = cx - SYM / 2, cy - SYM / 2
            if val == S:
                els.append(ell(sx, sy, SYM, SYM, bg="#228be6", stroke="#1864ab"))
            elif val == T:
                els.append(dia(sx, sy, SYM, SYM, bg="#ffd43b", stroke="#e67700"))
            elif val == A:
                els.append(ell(sx, sy, SYM, SYM, bg="transparent", stroke="#adb5bd", sw=1.5))

draw_rows(agents, y_agents_start)
draw_rows(addons, y_addons_start)

# ── Legend ────────────────────────────────────────────────────
ly = TH + 18
lx = 14
items = [
    ("Supported", "#228be6", "#1864ab", "ell"),
    ("Partial",   "#ffd43b", "#e67700", "dia"),
    ("Absent",    "transparent", "#adb5bd", "ell"),
]
for label, bg, stroke, shape in items:
    if shape == "ell":
        els.append(ell(lx, ly + 2, 14, 14, bg=bg, stroke=stroke))
    else:
        els.append(dia(lx, ly + 2, 14, 14, bg=bg, stroke=stroke))
    els.append(txt(lx + 22, ly, label, fs=12, ff=1, color="#495057"))
    lx += 110

# ── Output ────────────────────────────────────────────────────
doc = {
    "type": "excalidraw",
    "version": 2,
    "source": "https://excalidraw.com",
    "elements": els,
    "appState": {"gridSize": None, "viewBackgroundColor": "#ffffff"},
    "files": {}
}

out = os.path.join(os.path.dirname(__file__), "ecosystem-table-expanded.excalidraw")
with open(out, "w") as f:
    json.dump(doc, f, indent=2)

print(f"Created {out}")
print(f"  {len(els)} elements, table {TW}x{TH}px")
print(f"\nOpen in VS Code (Excalidraw extension) or excalidraw.com")
print(f"Export as PNG, then save as ecosystem-table-expanded.png")
