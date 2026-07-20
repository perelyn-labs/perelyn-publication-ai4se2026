// Export architecture comparison table — Playwright + rough.js
// Same visual style as export_expanded_table.js
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const DATA = {
  columns: ["Extraction", "Self-Managing", "Graph-Temporal", "Hybrid"],
  colColors: ["#1864ab", "#2b8a3e", "#c92a2a", "#7048e8"],
  colBgs: ["#d0ebff", "#d3f9d8", "#ffe3e3", "#e5dbff"],
  rows: [
    // S=checkmark, T=diamond/partial, A=cross/absent
    { label: "Factual recall",             vals: ["S", "T", "T", "S"] },
    { label: "Behavioral continuity",      vals: ["A", "S", "T", "S"] },
    { label: "Causal reasoning",           vals: ["A", "T", "S", "S"] },
    { label: "Temporal grounding",         vals: ["A", "A", "S", "T"] },
    { label: "Transparency / auditability",vals: ["S", "A", "S", "T"] },
  ],
  textRows: [
    { label: "Setup complexity",    vals: ["Low", "Medium", "High", "High"],
      colors: ["#2b8a3e", "#e67700", "#c92a2a", "#c92a2a"] },
    { label: "Representative system", vals: ["Mem0", "Letta", "Graphiti", "MAGMA"],
      colors: ["#495057", "#495057", "#495057", "#495057"] },
  ],
};

const HTML = `<!DOCTYPE html><html><head>
<script src="https://unpkg.com/roughjs@4.6.6/bundled/rough.js"><\/script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap');
  body { margin:0; background:white; }
  svg { font-family: 'IBM Plex Sans', sans-serif; }
</style>
</head><body>
<svg id="canvas" xmlns="http://www.w3.org/2000/svg"></svg>
<script>
const data = ${JSON.stringify(DATA)};

// ── Layout constants ────────────────────────────────────────
const LABEL_W = 260;
const COL_W = 140;
const HEADER_H = 48;
const ROW_H = 42;
const S = 16;
const PAD = 14;
const NC = data.columns.length;
const NR = data.rows.length + data.textRows.length;
const TW = LABEL_W + NC * COL_W;
const TH = HEADER_H + NR * ROW_H;
const LEGEND_H = 44;

const svgEl = document.getElementById("canvas");
svgEl.setAttribute("width", TW + PAD * 2);
svgEl.setAttribute("height", TH + PAD * 2 + LEGEND_H);
svgEl.setAttribute("viewBox",
  (-PAD) + " " + (-PAD) + " " + (TW + PAD * 2) + " " + (TH + PAD * 2 + LEGEND_H));

const rc = rough.svg(svgEl);

// ── Helpers ─────────────────────────────────────────────────
function addText(x, y, str, opts={}) {
  const {size=15, color="#212529", anchor="start", weight="400",
         baseline="middle", style="normal"} = opts;
  const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  t.setAttribute("x", x);
  t.setAttribute("y", y);
  t.setAttribute("text-anchor", anchor);
  t.setAttribute("dominant-baseline", baseline);
  t.setAttribute("font-size", size);
  t.setAttribute("font-weight", weight);
  t.setAttribute("font-style", style);
  t.setAttribute("fill", color);
  t.textContent = str;
  svgEl.appendChild(t);
}

// ── Header backgrounds ──────────────────────────────────────
// Label column header
svgEl.appendChild(rc.rectangle(0, 0, LABEL_W, HEADER_H, {
  fill: "#e9ecef", fillStyle: "solid", stroke: "none", roughness: 0.2, fillWeight: 0}));

// Column header colored backgrounds
data.columns.forEach((col, i) => {
  const cx = LABEL_W + i * COL_W;
  svgEl.appendChild(rc.rectangle(cx, 0, COL_W, HEADER_H, {
    fill: data.colBgs[i], fillStyle: "solid", stroke: "none", roughness: 0.2, fillWeight: 0}));
});

// ── Alternating row stripes ─────────────────────────────────
for (let i = 1; i < NR; i += 2) {
  svgEl.appendChild(rc.rectangle(0, HEADER_H + i * ROW_H, TW, ROW_H, {
    fill: "#f1f3f5", fillStyle: "solid", stroke: "none", roughness: 0.2, fillWeight: 0}));
}

// ── Grid lines ──────────────────────────────────────────────
// Outer border
svgEl.appendChild(rc.rectangle(0, 0, TW, TH, {
  stroke: "#495057", strokeWidth: 2, roughness: 0.8, fill: "none"}));

// Header separator (thick)
svgEl.appendChild(rc.line(0, HEADER_H, TW, HEADER_H, {
  stroke: "#495057", strokeWidth: 2, roughness: 0.6}));

// Separator between symbol rows and text rows
const sepY = HEADER_H + data.rows.length * ROW_H;
svgEl.appendChild(rc.line(0, sepY, TW, sepY, {
  stroke: "#adb5bd", strokeWidth: 1.5, roughness: 0.5}));

// Row separators
for (let i = 1; i < NR; i++) {
  const ry = HEADER_H + i * ROW_H;
  if (ry !== sepY) {
    svgEl.appendChild(rc.line(0, ry, TW, ry, {
      stroke: "#dee2e6", strokeWidth: 0.5, roughness: 0.4}));
  }
}

// Label column separator
svgEl.appendChild(rc.line(LABEL_W, 0, LABEL_W, TH, {
  stroke: "#495057", strokeWidth: 1.5, roughness: 0.6}));

// Column separators
for (let i = 1; i < NC; i++) {
  const cx = LABEL_W + i * COL_W;
  svgEl.appendChild(rc.line(cx, 0, cx, TH, {
    stroke: "#e9ecef", strokeWidth: 0.5, roughness: 0.4}));
}

// ── Header text ─────────────────────────────────────────────
addText(LABEL_W / 2, HEADER_H / 2, "Property", {
  size: 16, color: "#495057", weight: "600", anchor: "middle"});

data.columns.forEach((col, i) => {
  const cx = LABEL_W + i * COL_W + COL_W / 2;
  addText(cx, HEADER_H / 2, col, {
    size: 15, color: data.colColors[i], weight: "600", anchor: "middle"});
});

// ── Draw symbols ────────────────────────────────────────────
function drawSymbol(cx, cy, val) {
  if (val === "S") {
    const s = S * 0.5;
    svgEl.appendChild(rc.linearPath(
      [[cx - s, cy], [cx - s * 0.25, cy + s * 0.65], [cx + s, cy - s * 0.6]],
      {stroke: "#2b8a3e", strokeWidth: 3, roughness: 0.7}));
  } else if (val === "A") {
    const s2 = S * 0.33;
    svgEl.appendChild(rc.line(cx - s2, cy - s2, cx + s2, cy + s2,
      {stroke: "#e03131", strokeWidth: 2.5, roughness: 0.7}));
    svgEl.appendChild(rc.line(cx + s2, cy - s2, cx - s2, cy + s2,
      {stroke: "#e03131", strokeWidth: 2.5, roughness: 0.7}));
  } else if (val === "T") {
    const s2 = S * 0.42;
    svgEl.appendChild(rc.polygon(
      [[cx, cy - s2], [cx + s2, cy], [cx, cy + s2], [cx - s2, cy]],
      {fill: "#ffd43b", fillStyle: "solid", stroke: "#e67700",
       strokeWidth: 1.5, roughness: 0.6, fillWeight: 2}));
  }
}

// ── Symbol rows ─────────────────────────────────────────────
data.rows.forEach((row, ri) => {
  const ry = HEADER_H + ri * ROW_H + ROW_H / 2;
  addText(14, ry, row.label, {size: 15, color: "#212529"});
  row.vals.forEach((v, ci) => {
    drawSymbol(LABEL_W + ci * COL_W + COL_W / 2, ry, v);
  });
});

// ── Text rows (complexity, representative system) ───────────
data.textRows.forEach((row, ri) => {
  const ry = HEADER_H + (data.rows.length + ri) * ROW_H + ROW_H / 2;
  addText(14, ry, row.label, {size: 15, color: "#212529"});
  row.vals.forEach((v, ci) => {
    addText(LABEL_W + ci * COL_W + COL_W / 2, ry, v, {
      size: 14, color: row.colors[ci], weight: "500", anchor: "middle",
      style: ri === 1 ? "italic" : "normal"});
  });
});

// ── Legend ───────────────────────────────────────────────────
const ly = TH + 22;
let lx = 14;
[{l: "Supported", t: "S"}, {l: "Partial", t: "T"}, {l: "Absent", t: "A"}].forEach(({l, t}) => {
  drawSymbol(lx + 10, ly + 10, t);
  addText(lx + 28, ly + 10, l, {size: 15, color: "#495057"});
  lx += 140;
});

document.getElementById("canvas").setAttribute("data-ready", "true");
<\/script></body></html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } });
  await page.setContent(HTML, { waitUntil: "networkidle" });
  await page.waitForFunction(
    () => document.getElementById("canvas")?.getAttribute("data-ready") === "true",
    { timeout: 15000 }
  );
  await page.waitForTimeout(1500); // font loading

  const svg = await page.$eval("#canvas", el => el.outerHTML);
  const outSvg = path.join(__dirname, "architecture-table.svg");
  fs.writeFileSync(outSvg, svg);
  console.log("SVG saved:", outSvg);

  const svgBox = await page.$eval("#canvas", el => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  const outPng = path.join(__dirname, "architecture-table.png");
  await page.screenshot({ path: outPng, clip: svgBox, omitBackground: false });
  console.log("PNG saved:", outPng);

  await browser.close();
})();
