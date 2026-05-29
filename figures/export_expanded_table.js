// Export expanded ecosystem table (20 dimensions) — Playwright + rough.js
// Adapted from fundus/figures/export_ecosystem_svg.js (the good one)
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

// Logos — use the high-quality ones from fundus original
const LOGOS = {
  "Claude Code": "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+QW50aHJvcGljPC90aXRsZT48cGF0aCBmaWxsPSIjRDk3NzA2IiBkPSJNMTcuMzA0MSAzLjU0MWgtMy42NzE4bDYuNjk2IDE2LjkxOEgyNFptLTEwLjYwODIgMEwwIDIwLjQ1OWgzLjc0NDJsMS4zNjkzLTMuNTUyN2g3LjAwNTJsMS4zNjkzIDMuNTUyOGgzLjc0NDJMMTAuNTM2MyAzLjU0MDlabS0uMzcxMiAxMC4yMjMyIDIuMjkxNC01Ljk0NTYgMi4yOTE0IDUuOTQ1NloiLz48L3N2Zz4=",
  "Gemini CLI": "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+R29vZ2xlIEdlbWluaTwvdGl0bGU+PHBhdGggZmlsbD0iIzQyODVGNCIgZD0iTTExLjA0IDE5LjMyUTEyIDIxLjUxIDEyIDI0cTAtMi40OS45My00LjY4Ljk2LTIuMTkgMi41OC0zLjgxdDMuODEtMi41NVEyMS41MSAxMiAyNCAxMnEtMi40OSAwLTQuNjgtLjkzYTEyLjMgMTIuMyAwIDAgMS0zLjgxLTIuNTggMTIuMyAxMi4zIDAgMCAxLTIuNTgtMy44MVExMiAyLjQ5IDEyIDBxMCAyLjQ5LS45NiA0LjY4LS45MyAyLjE5LTIuNTUgMy44MWExMi4zIDEyLjMgMCAwIDEtMy44MSAyLjU4UTIuNDkgMTIgMCAxMnEyLjQ5IDAgNC42OC45NiAyLjE5LjkzIDMuODEgMi41NXQyLjU1IDMuODEiLz48L3N2Zz4=",
  "Codex CLI": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMTBBMzdGIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIyLjI4MiA5LjgyMWE1Ljk4NSA1Ljk4NSAwIDAgMC0uNTE2LTQuOTEgNi4wNDYgNi4wNDYgMCAwIDAtNi41MS0yLjlBNi4wNjUgNi4wNjUgMCAwIDAgNC45ODEgNC4xOGE1Ljk4NSA1Ljk4NSAwIDAgMC0zLjk5OCAyLjkgNi4wNDYgNi4wNDYgMCAwIDAgLjc0MyA3LjA5NyA1Ljk4IDUuOTggMCAwIDAgLjUxIDQuOTExIDYuMDUxIDYuMDUxIDAgMCAwIDYuNTE1IDIuOUE1Ljk4NSA1Ljk4NSAwIDAgMCAxMy4yNiAyNGE2LjA1NiA2LjA1NiAwIDAgMCA1Ljc3Mi00LjIwNiA1Ljk5IDUuOTkgMCAwIDAgMy45OTctMi45IDYuMDU2IDYuMDU2IDAgMCAwLS43NDctNy4wNzN6TTEzLjI2IDIyLjQzYTQuNDc2IDQuNDc2IDAgMCAxLTIuODc2LTEuMDRsLjE0MS0uMDgxIDQuNzc5LTIuNzU4YS43OTUuNzk1IDAgMCAwIC4zOTItLjY4MXYtNi43MzdsMi4wMiAxLjE2OGEuMDcxLjA3MSAwIDAgMSAuMDM4LjA1MnY1LjU4M2E0LjUwNCA0LjUwNCAwIDAgMS00LjQ5NCA0LjQ5NHpNMy42IDE4LjMwNGE0LjQ3IDQuNDcgMCAwIDEtLjUzNS0zLjAxNGwuMTQyLjA4NSA0Ljc4MyAyLjc1OWEuNzcxLjc3MSAwIDAgMCAuNzggMGw1Ljg0My0zLjM2OXYyLjMzMmEuMDguMDggMCAwIDEtLjAzMy4wNjJMOS43NCAxOS45NWE0LjUgNC41IDAgMCAxLTYuMTQtMS42NDZ6TTIuMzQgNy44OTZhNC40ODUgNC40ODUgMCAwIDEgMi4zNjYtMS45NzNWMTEuNmEuNzY2Ljc2NiAwIDAgMCAuMzg4LjY3Nmw1LjgxNSAzLjM1NS0yLjAyIDEuMTY4YS4wNzYuMDc2IDAgMCAxLS4wNzEgMGwtNC44My0yLjc4NkE0LjUwNCA0LjUwNCAwIDAgMSAyLjM0IDcuODcyem0xNi41OTcgMy44NTVsLTUuODMzLTMuMzg3TDE1LjExOSA3LjJhLjA3Ni4wNzYgMCAwIDEgLjA3MSAwbDQuODMgMi43OTFhNC40OTQgNC40OTQgMCAwIDEtLjY3NiA4LjEwNXYtNS42NzhhLjc5Ljc5IDAgMCAwLS40MDctLjY2N3ptMi4wMS0zLjAyM2wtLjE0MS0uMDg1LTQuNzc0LTIuNzgyYS43NzYuNzc2IDAgMCAwLS43ODUgMEw5LjQwOSA5LjIzVjYuODk3YS4wNjYuMDY2IDAgMCAxIC4wMjgtLjA2MWw0LjgzLTIuNzg3YTQuNSA0LjUgMCAwIDEgNi42OCA0LjY2em0tMTIuNjQgNC4xMzVsLTIuMDItMS4xNjRhLjA4LjA4IDAgMCAxLS4wMzgtLjA1N1Y2LjA3NWE0LjUgNC41IDAgMCAxIDcuMzc1LTMuNDUzbC0uMTQyLjA4TDguNzA0IDUuNDZhLjc5NS43OTUgMCAwIDAtLjM5My42ODF6bTEuMDk3LTIuMzY1bDIuNjAyLTEuNSAyLjYwNyAxLjV2Mi45OTlsLTIuNTk3IDEuNS0yLjYwNy0xLjV6Ii8+PC9zdmc+Cg==",
  "Copilot": "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+R2l0SHViIENvcGlsb3Q8L3RpdGxlPjxwYXRoIGZpbGw9IiMxRjZGRUIiIGQ9Ik0yMy45MjIgMTYuOTk3QzIzLjA2MSAxOC40OTIgMTguMDYzIDIyLjAyIDEyIDIyLjAyIDUuOTM3IDIyLjAyLjkzOSAxOC40OTIuMDc4IDE2Ljk5N0EuNjQxLjY0MSAwIDAgMSAwIDE2Ljc0MXYtMi44NjlhLjg4My44ODMgMCAwIDEgLjA1My0uMjJjLjM3Mi0uOTM1IDEuMzQ3LTIuMjkyIDIuNjA1LTIuNjU2LjE2Ny0uNDI5LjQxNC0xLjA1NS42NDQtMS41MTdhMTAuMDk4IDEwLjA5OCAwIDAgMS0uMDUyLTEuMDg2YzAtMS4zMzEuMjgyLTIuNDk5IDEuMTMyLTMuMzY4LjM5Ny0uNDA2Ljg5LS43MTcgMS40NzQtLjk1MkM3LjI1NSAyLjkzNyA5LjI0OCAxLjk4IDExLjk3OCAxLjk4YzIuNzMxIDAgNC43NjcuOTU3IDYuMTY2IDIuMDkzLjU4NC4yMzUgMS4wNzcuNTQ2IDEuNDc0Ljk1Mi44NS44NjkgMS4xMzIgMi4wMzcgMS4xMzIgMy4zNjggMCAuMzY4LS4wMTQuNzMzLS4wNTIgMS4wODYuMjMuNDYyLjQ3NyAxLjA4OC42NDQgMS41MTcgMS4yNTguMzY0IDIuMjMzIDEuNzIxIDIuNjA1IDIuNjU2YS44NDEuODQxIDAgMCAxIC4wNTMuMjJ2Mi44NjlhLjY0MS42NDEgMCAwIDEtLjA3OC4yNTZaIi8+PC9zdmc+",
  "Cursor": "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+Q3Vyc29yPC90aXRsZT48cGF0aCBmaWxsPSIjMUExQTFBIiBkPSJNMTEuNTAzLjEzMSAxLjg5MSA1LjY3OGEuODQuODQgMCAwIDAtLjQyLjcyNnYxMS4xODhjMCAuMy4xNjIuNTc1LjQyLjcyNGw5LjYwOSA1LjU1YTEgMSAwIDAgMCAuOTk4IDBsOS42MS01LjU1YS44NC44NCAwIDAgMCAuNDItLjcyNFY2LjQwNGEuODQuODQgMCAwIDAtLjQyLS43MjZMMTIuNDk3LjEzMWExLjAxIDEuMDEgMCAwIDAtLjk5NiAwTTIuNjU3IDYuMzM4aDE4LjU1Yy4yNjMgMCAuNDMuMjg3LjI5Ny41MTVMMTIuMjMgMjIuOTE4Yy0uMDYyLjEwNy0uMjI5LjA2NC0uMjI5LS4wNlYxMi4zMzVhLjU5LjU5IDAgMCAwLS4yOTUtLjUxbC05LjExLTUuMjU3Yy0uMTA5LS4wNjMtLjA2NC0uMjMuMDYxLS4yMyIvPjwvc3ZnPg==",
  "OpenCode": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMjJDNTVFIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3QgeD0iMSIgeT0iMiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIwIiByeD0iMyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjJDNTVFIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNNiA5bDQgMy00IDNNMTMgMTVoNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjJDNTVFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPgo=",
  "Windsurf": "data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+V2luZHN1cmY8L3RpdGxlPjxwYXRoIGZpbGw9IiMwRUE1RTkiIGQ9Ik0yMy41NSA1LjA2N2MtMS4yMDM4LS4wMDItMi4xODA2Ljk3My0yLjE4MDYgMi4xNzY1djQuODY3NmMwIC45NzItLjgwMzUgMS43NTk0LTEuNzU5NyAxLjc1OTQtLjU2OCAwLTEuMTM1Mi0uMjg2LTEuNDcxOC0uNzY1OWwtNC45NzEzLTcuMTAwM2MtLjQxMjUtLjU4OTYtMS4wODM3LS45NDEtMS44MTAzLS45NDEtMS4xMzM0IDAtMi4xNTMzLjk2MzUtMi4xNTMzIDIuMTUzdjQuODk1N2MwIC45NzItLjc5NjkgMS43NTk0LTEuNzU5NiAxLjc1OTQtLjU3IDAtMS4xMzYzLS4yODYtMS40NzI4LS43NjU4TC40MDc2IDUuMTU5OEMuMjgyMiA0Ljk3OTguMCA1LjA2ODguMCA1LjI4ODJ2NC4yNDUyYzAgLjIxNDcuMDY1Ni40MjI4LjE4ODQuNTk5bDUuNDc0OCA3LjgxODNjLjMyMzQuNDYyLjgwMDYuODA1MiAxLjM1MDkuOTI5OCAxLjM3NzEuMzEzIDIuNjQ0Ni0uNzQ3IDIuNjQ0Ni0yLjA5Nzd2LTQuODkzYzAtLjk3Mi43ODc1LTEuNzU5MyAxLjc1OTYtMS43NTkzaC4wMDNhMS43OTggMS43OTggMCAwIDEgMS40NzE4Ljc2NThsNC45NzIzIDcuMDk5NGMuNDEzNS41OTA1IDEuMDUuOTQxIDEuODA5My45NDEgMS4xNTg3IDAgMi4xNTE1LS45NjQ1IDIuMTUxNS0yLjE1M3YtNC44OTQ4YzAtLjk3Mi43ODc1LTEuNzU5NCAxLjc1OTYtMS43NTk0aC4xOTRhLjIyLjIyIDAgMCAwIC4yMjA0LS4yMjAydi00LjYyMmEuMjIuMjIgMCAwIDAtLjIyMDMtLjIyMDNaIi8+PC9zdmc+",
  "Devin": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjN0MzQUVEIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzdDM0FFRCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iMTIiIHk9IjE3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1mYW1pbHk9IkFyaWFsLHNhbnMtc2VyaWYiIGZpbGw9IiM3QzNBRUQiPkQ8L3RleHQ+PC9zdmc+Cg==",
  "Aider": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjMTZBMzRBIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggNGwtNiA4IDYgOE0xNiA0bDYgOC02IDgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzE2QTM0QSIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0xNCA0bC00IDE2IiBmaWxsPSJub25lIiBzdHJva2U9IiMxNkEzNEEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+Cg==",
  "OpenHands": "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRUE1ODBDIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgMTFWNGExIDEgMCAwIDEgMiAwdjRNOSA4VjNhMSAxIDAgMCAxIDIgMHY1TTExIDhWNGExIDEgMCAwIDEgMiAwdjRNMTMgOFY2YTEgMSAwIDAgMSAyIDB2NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRUE1ODBDIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTcgMTFhNCA0IDAgMCAwIDAgNGwyIDNoNmwyLTNhNCA0IDAgMCAwIDAtNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRUE1ODBDIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+Cg==",
  "claude-mem": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMi41IiBmaWxsPSIjRDk3NzA2Ii8+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTIsMTIpIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNFQTc4MEMiIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0wLTQuNUMxLjUtNi41IDEuNS05IDAtMTAiLz48cGF0aCBkPSJNMC00LjVDLTEuNS02LjUtMS41LTkgMC0xMCIgdHJhbnNmb3JtPSJyb3RhdGUoNjApIi8+PHBhdGggZD0iTTAtNC41QzEuNS02LjUgMS41LTkgMC0xMCIgdHJhbnNmb3JtPSJyb3RhdGUoNjApIi8+PHBhdGggZD0iTTAtNC41Qy0xLjUtNi41LTEuNS05IDAtMTAiIHRyYW5zZm9ybT0icm90YXRlKDEyMCkiLz48cGF0aCBkPSJNMC00LjVDMS41LTYuNSAxLjUtOSAwLTEwIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+PHBhdGggZD0iTTAtNC41Qy0xLjUtNi41LTEuNS05IDAtMTAiIHRyYW5zZm9ybT0icm90YXRlKDE4MCkiLz48cGF0aCBkPSJNMC00LjVDMS41LTYuNSAxLjUtOSAwLTEwIiB0cmFuc2Zvcm09InJvdGF0ZSgxODApIi8+PHBhdGggZD0iTTAtNC41Qy0xLjUtNi41LTEuNS05IDAtMTAiIHRyYW5zZm9ybT0icm90YXRlKDI0MCkiLz48cGF0aCBkPSJNMC00LjVDMS41LTYuNSAxLjUtOSAwLTEwIiB0cmFuc2Zvcm09InJvdGF0ZSgyNDApIi8+PHBhdGggZD0iTTAtNC41Qy0xLjUtNi41LTEuNS05IDAtMTAiIHRyYW5zZm9ybT0icm90YXRlKDMwMCkiLz48cGF0aCBkPSJNMC00LjVDMS41LTYuNSAxLjUtOSAwLTEwIiB0cmFuc2Zvcm09InJvdGF0ZSgzMDApIi8+PHBhdGggZD0iTTAtNC41Qy0xLjUtNi41LTEuNS05IDAtMTAiLz48L2c+PC9nPjwvc3ZnPg==",
  "Mem0": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTEuNSIgZmlsbD0iIzdDM0FFRCIvPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMsMykgc2NhbGUoMC4xNjY3KSI+CiAgICA8Y2lyY2xlIGN4PSI1NC41IiBjeT0iNTUuMiIgcj0iMTMuNCIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjU0LjUiIGN5PSI0LjUiIHI9IjQuNSIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjU0LjUiIGN5PSIxMDMuNCIgcj0iNC41IiBmaWxsPSJ3aGl0ZSIvPgogICAgPGNpcmNsZSBjeD0iNC45IiBjeT0iNTUuOCIgcj0iNC41IiBmaWxsPSJ3aGl0ZSIvPgogICAgPGNpcmNsZSBjeD0iMTA0LjUiIGN5PSI1NS44IiByPSI0LjUiIGZpbGw9IndoaXRlIi8+CiAgICA8Y2lyY2xlIGN4PSI5MS44IiBjeT0iMjEuNiIgcj0iNC41IiBmaWxsPSJ3aGl0ZSIvPgogICAgPGNpcmNsZSBjeD0iMTkiIGN5PSIyMC4xIiByPSI0LjUiIGZpbGw9IndoaXRlIi8+CiAgICA8Y2lyY2xlIGN4PSIxOSIgY3k9Ijg5LjIiIHI9IjQuNSIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjkxIiBjeT0iOTAuNyIgcj0iNC41IiBmaWxsPSJ3aGl0ZSIvPgogICAgPGxpbmUgeDE9IjU0LjUiIHkxPSI5IiB4Mj0iNTQuNSIgeTI9IjQxLjgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMy41Ii8+CiAgICA8bGluZSB4MT0iNTQuNSIgeTE9IjY4LjYiIHgyPSI1NC41IiB5Mj0iOTguOSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzLjUiLz4KICAgIDxsaW5lIHgxPSI5LjMiIHkxPSI1NS44IiB4Mj0iNDEuMSIgeTI9IjU1LjIiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMy41Ii8+CiAgICA8bGluZSB4MT0iNjcuOSIgeTE9IjU1LjIiIHgyPSIxMDAiIHkyPSI1NS44IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNSIvPgogICAgPGxpbmUgeDE9IjQ1IiB5MT0iNDUiIHgyPSIyMyIgeTI9IjI0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNSIvPgogICAgPGxpbmUgeDE9IjY0IiB5MT0iNDUiIHgyPSI4OCIgeTI9IjI0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNSIvPgogICAgPGxpbmUgeDE9IjQ1IiB5MT0iNjUiIHgyPSIyMyIgeTI9Ijg2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNSIvPgogICAgPGxpbmUgeDE9IjY0IiB5MT0iNjUiIHgyPSI4OCIgeTI9Ijg3IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMuNSIvPgogIDwvZz4KPC9zdmc+Cg==",
  "Graphiti / Zep": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMiIgZGF0YS1uYW1lPSJMYXllciAyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzUxLjg0IDM1MS44NCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogdXJsKCNsaW5lYXItZ3JhZGllbnQpOwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6ICNmZmY7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9Ii4xNSIgeTE9IjEuNTgiIHgyPSIzNTAuNyIgeTI9IjM0OS4yOCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM0MjI2YTgiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZDM0NzliIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZyBpZD0iTGF5ZXJfMS0yIiBkYXRhLW5hbWU9IkxheWVyIDEiPgogICAgPGc+CiAgICAgIDxyZWN0IGNsYXNzPSJjbHMtMSIgd2lkdGg9IjM1MS44NCIgaGVpZ2h0PSIzNTEuODQiLz4KICAgICAgPGc+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJtMjkxLjIxLDE4OS44OWwtMS40OC0xLjU1aC0xMC4yNmwzLjU5LTc1Ljg2LTE0LjgtLjQ1LTIuNzcsNDkuMzFjLTU5LjYtMy4yNC0xMTkuMzMtMy4yNC0xNzguOTItLjAybC0xLjczLTY0Ljk2LTE0LjguNDUsMi41LDkxLjUzaC0xMC40OGwtMS40MSwxLjQ3Yy0xLjU1LDE2LjIzLS42NiwzMi42OCwyLjI2LDQ4Ljg5aDEwLjgzbC4xOCwxLjI3Yy42NywxOS4zNCwxNi4xLDM0LjY4LDM1LjksMzQuNjhzNDQuODYtLjkyLDY2LjEyLS45Miw0Ni41Ni45Miw2NS45NS45MiwzNS4xOS0xNS4yOSwzNS45LTM0LjYxbC4xNi0xLjM0aDExLjAyYzIuOTEtMTYuMTksMy44MS0zMi42MSwyLjI2LTQ4LjgxWm0tMTU4LjIzLDU4LjAxYy0xNy4yNywwLTMwLjI1LTEzLjc4LTMwLjI1LTI5Ljc4czEyLjk5LTI5Ljc4LDMwLjI1LTI5Ljc4LDI5LjYyLDEzLjk0LDI5LjYyLDI5Ljk0LTEyLjM1LDI5LjYyLTI5LjYyLDI5LjYyWm04Ni41MSwwYy0xNy4yNywwLTMwLjI1LTEzLjc4LTMwLjI1LTI5Ljc4czEyLjk5LTI5Ljc4LDMwLjI1LTI5Ljc4LDI5LjYyLDEzLjk0LDI5LjYyLDI5Ljk0LTEyLjM1LDI5LjYyLTI5LjYyLDI5LjYyWiIvPgogICAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxNzEuNjQgMTAzLjU4IDE1My4yNiAxMzEuMTYgMTUzLjQgMTMxLjY2IDI0NS43NiAxMTkuNyAyNTAuODIgMTA4Ljg3IDE3NC4yIDExNy43NCAxNzcuNTggMTEyLjY3IDE3Ny41NyAxMTIuNjYgMTk4LjI2IDgxLjY4IDE5OC4xMyA4MS4xOSAxMDcuNTQgOTIuNzggMTAyLjczIDEwMy40NiAxNzguMjIgOTMuOCAxNzEuNjQgMTAzLjU4Ii8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJtMTMyLjg0LDIwMi42NmMtOC42NywwLTE1LjczLDYuOTMtMTUuNzMsMTUuNDZzNy4wNiwxNS40NiwxNS43MywxNS40NiwxNS4zNy02Ljc1LDE1LjM3LTE1LjM3LTYuNzUtMTUuNTUtMTUuMzctMTUuNTVaIi8+CiAgICAgICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJtMjE5LjM1LDIwMi42NmMtOC42NywwLTE1LjczLDYuOTMtMTUuNzMsMTUuNDZzNy4wNiwxNS40NiwxNS43MywxNS40NiwxNS4zNy02Ljc1LDE1LjM3LTE1LjM3LTYuNzUtMTUuNTUtMTUuMzctMTUuNTVaIi8+CiAgICAgIDwvZz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPg==",
  "Cognee": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTEuNSIgZmlsbD0iIzZDMkJEOSIvPgogIDxwYXRoIGQ9Ik0xNS41IDguNUMxNC41IDcuMiAxMyA2LjUgMTEuNSA2LjVDOC41IDYuNSA2IDkgNiAxMnMyLjUgNS41IDUuNSA1LjVjMS41IDAgMy0uNyA0LTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+Cg==",
  "AgentMemory": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIGZpbGw9IiMwNTk2NjkiIHN0cm9rZT0ibm9uZSIvPjx0ZXh0IHg9IjEyIiB5PSIxNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtZmFtaWx5PSJBcmlhbCxzYW5zLXNlcmlmIiBmaWxsPSJ3aGl0ZSI+QTwvdGV4dD48L3N2Zz4=",
  "Letta / MemGPT": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3QgeD0iNCIgeT0iNCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0iIzFhMWExYSIvPgogIDxyZWN0IHg9IjciIHk9IjciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgcng9IjEiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41Ii8+CiAgPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ3aGl0ZSIvPgogIDxyZWN0IHg9IjkiIHk9IjEiIHdpZHRoPSIyLjUiIGhlaWdodD0iMyIgcng9IjAuNSIgZmlsbD0iIzFhMWExYSIvPgogIDxyZWN0IHg9IjEyLjUiIHk9IjEiIHdpZHRoPSIyLjUiIGhlaWdodD0iMyIgcng9IjAuNSIgZmlsbD0iIzFhMWExYSIvPgogIDxyZWN0IHg9IjkiIHk9IjIwIiB3aWR0aD0iMi41IiBoZWlnaHQ9IjMiIHJ4PSIwLjUiIGZpbGw9IiMxYTFhMWEiLz4KICA8cmVjdCB4PSIxMi41IiB5PSIyMCIgd2lkdGg9IjIuNSIgaGVpZ2h0PSIzIiByeD0iMC41IiBmaWxsPSIjMWExYTFhIi8+CiAgPHJlY3QgeD0iMSIgeT0iOSIgd2lkdGg9IjMiIGhlaWdodD0iMi41IiByeD0iMC41IiBmaWxsPSIjMWExYTFhIi8+CiAgPHJlY3QgeD0iMSIgeT0iMTIuNSIgd2lkdGg9IjMiIGhlaWdodD0iMi41IiByeD0iMC41IiBmaWxsPSIjMWExYTFhIi8+CiAgPHJlY3QgeD0iMjAiIHk9IjkiIHdpZHRoPSIzIiBoZWlnaHQ9IjIuNSIgcng9IjAuNSIgZmlsbD0iIzFhMWExYSIvPgogIDxyZWN0IHg9IjIwIiB5PSIxMi41IiB3aWR0aD0iMyIgaGVpZ2h0PSIyLjUiIHJ4PSIwLjUiIGZpbGw9IiMxYTFhMWEiLz4KPC9zdmc+Cg==",
  "Codebase-Memory": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIGZpbGw9IiMyNTYzRUIiLz48dGV4dCB4PSIxMiIgeT0iMTciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IndoaXRlIj5DQjwvdGV4dD48L3N2Zz4=",
  "Engram-MCP": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIGZpbGw9IiMwZDk0ODgiLz48dGV4dCB4PSIxMiIgeT0iMTciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IndoaXRlIj5FPC90ZXh0Pjwvc3ZnPg==",
  "Ourmem": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTEiIGZpbGw9IiNlYTU4MGMiLz48dGV4dCB4PSIxMiIgeT0iMTciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LWZhbWlseT0iQXJpYWwiIGZpbGw9IndoaXRlIj5PPC90ZXh0Pjwvc3ZnPg==",
  "Hindsight": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImhnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzBFQTVFOSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyNTYzRUIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGQ9Ik0yIDEyczQtNyAxMC03IDEwIDcgMTAgNy00IDctMTAgN1MyIDEyIDIgMTJ6IiBmaWxsPSJ1cmwoI2hnKSIvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjQiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMiIgZmlsbD0iIzFlNDBhZiIvPgogIDxjaXJjbGUgY3g9IjQiIGN5PSI1IiByPSIyIiBmaWxsPSJ1cmwoI2hnKSIvPgogIDxjaXJjbGUgY3g9IjIwIiBjeT0iNSIgcj0iMiIgZmlsbD0idXJsKCNoZykiLz4KICA8Y2lyY2xlIGN4PSI0IiBjeT0iMTkiIHI9IjIiIGZpbGw9InVybCgjaGcpIi8+CiAgPGNpcmNsZSBjeD0iMjAiIGN5PSIxOSIgcj0iMiIgZmlsbD0idXJsKCNoZykiLz4KICA8bGluZSB4MT0iNS41IiB5MT0iNi41IiB4Mj0iOSIgeTI9IjkiIHN0cm9rZT0idXJsKCNoZykiIHN0cm9rZS13aWR0aD0iMSIvPgogIDxsaW5lIHgxPSIxOC41IiB5MT0iNi41IiB4Mj0iMTUiIHkyPSI5IiBzdHJva2U9InVybCgjaGcpIiBzdHJva2Utd2lkdGg9IjEiLz4KICA8bGluZSB4MT0iNS41IiB5MT0iMTcuNSIgeDI9IjkiIHkyPSIxNSIgc3Ryb2tlPSJ1cmwoI2hnKSIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPGxpbmUgeDE9IjE4LjUiIHkxPSIxNy41IiB4Mj0iMTUiIHkyPSIxNSIgc3Ryb2tlPSJ1cmwoI2hnKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPgo=",
};

// Data: S=Supported, T=parTial, A=Absent
// 20 dimensions in 6 groups
const DATA = {
  groups: [
    { name: "Memory Types", color: "#1864ab", bg: "#d0ebff",
      cols: ["Semantic", "Episodic", "Procedural"] },
    { name: "Memory Operations", color: "#2b8a3e", bg: "#d3f9d8",
      cols: ["Auto-Generated", "Compaction", "Fact./Experiential", "Staleness"] },
    { name: "Temporal", color: "#c92a2a", bg: "#ffe3e3",
      cols: ["Temporal Metadata", "Temporal Versioning", "Bi-Temporal"] },
    { name: "Software\nEngineering", color: "#e67700", bg: "#fff3bf",
      cols: ["Code-Structural", "Cross-Session", "Provenance", "Failed Replay", "Git-Aware"] },
    { name: "Collaboration\n& Governance", color: "#7048e8", bg: "#e5dbff",
      cols: ["Team/Collab.", "Access Control", "Memory Provenance"] },
    { name: "Integration", color: "#495057", bg: "#e9ecef",
      cols: ["MCP Support", "Local Deploy"] },
  ],
  sections: [
    { label: "Production Agents", rows: [
      //                                   Sem Epi Proc  Auto Comp F/E Stal  Tmeta Tver BiT  Code Xses Prov Fail Git  Team Gov Mpro  MCP Loc
      { name: "Claude Code",  vals: ["S","A","A", "S","S","A","A", "A","A","A", "A","A","A","A","A", "A","A","A", "S","S"] },
      { name: "Gemini CLI",   vals: ["S","T","T", "S","S","A","A", "T","A","A", "T","T","A","A","A", "A","A","A", "S","S"] },
      { name: "Codex CLI",    vals: ["S","A","A", "S","S","A","T", "T","A","A", "A","T","A","A","A", "A","A","A", "S","S"] },
      { name: "Copilot",      vals: ["S","A","A", "S","S","A","T", "T","A","A", "T","A","A","A","A", "A","A","A", "S","A"] },
      { name: "Cursor",       vals: ["S","A","A", "A","S","A","A", "A","A","A", "T","A","A","A","A", "A","A","A", "S","A"] },
      { name: "OpenCode",     vals: ["S","A","A", "A","S","A","A", "A","A","A", "A","A","A","A","A", "A","A","A", "S","S"] },
      { name: "Windsurf",     vals: ["S","A","A", "S","T","A","A", "A","A","A", "T","A","A","A","A", "A","A","A", "S","A"] },
      { name: "Devin",        vals: ["T","A","A", "T","T","A","A", "A","A","A", "T","A","A","A","A", "T","A","A", "S","A"] },
      { name: "Aider",        vals: ["T","A","A", "A","A","A","A", "A","A","A", "T","A","T","A","S", "A","A","A", "T","S"] },
      { name: "OpenHands",    vals: ["S","A","A", "A","S","A","A", "A","A","A", "A","A","A","A","A", "A","A","A", "S","S"] },
    ]},
    { label: "MCP Community Add-ons", rows: [
      { name: "claude-mem",      vals: ["S","S","A", "S","S","A","A", "T","A","A", "A","S","A","A","A", "A","A","A", "S","S"] },
      { name: "Mem0",            vals: ["S","T","A", "S","S","A","A", "T","A","A", "A","S","A","A","A", "T","A","A", "S","S"] },
      { name: "Graphiti / Zep",  vals: ["S","S","A", "S","S","A","S", "S","S","S", "A","S","S","T","A", "A","A","S", "S","S"] },
      { name: "Cognee",          vals: ["S","A","T", "S","S","A","A", "T","A","A", "S","S","A","A","A", "A","A","T", "S","S"] },
      { name: "AgentMemory",     vals: ["S","S","T", "S","S","T","A", "T","A","A", "A","S","T","A","A", "A","S","T", "S","S"] },
      { name: "Letta / MemGPT",  vals: ["S","T","T", "A","T","T","T", "T","A","A", "T","S","T","T","A", "A","A","T", "S","S"] },
      { name: "Codebase-Memory", vals: ["S","A","A", "S","S","A","A", "A","A","A", "S","S","A","A","A", "A","A","A", "S","S"] },
      { name: "Engram-MCP",      vals: ["A","S","S", "S","S","S","A", "S","T","A", "A","S","S","S","S", "A","A","S", "S","S"] },
      { name: "Ourmem",          vals: ["S","A","A", "S","T","A","A", "T","A","A", "A","S","A","A","A", "S","S","T", "S","T"] },
      { name: "Hindsight",       vals: ["A","S","A", "S","T","A","T", "T","A","A", "A","S","T","S","A", "A","A","T", "S","S"] },
    ]},
  ],
};

const LOGOS_JSON = JSON.stringify(LOGOS);

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
const logos = ${LOGOS_JSON};

// ── Layout constants ────────────────────────────────────────
const LABEL_W = 220;
const COL_W = 52;
const GROUP_H = 36;
const SUB_H = 160;
const ROW_H = 38;
const SECTION_H = 34;
const LOGO_SZ = 20;
const S = 16;
const PAD = 14;

// Flatten columns and compute spans
const allCols = [];
const groupSpans = [];
data.groups.forEach(g => {
  groupSpans.push({ name: g.name, color: g.color, bg: g.bg, start: allCols.length, count: g.cols.length });
  g.cols.forEach(c => allCols.push(c));
});
const NC = allCols.length;
const TW = LABEL_W + NC * COL_W;

// Compute vertical positions
const s1 = data.sections[0];
const s2 = data.sections[1];
const HEADER_H = GROUP_H + SUB_H;
const y_s1 = HEADER_H;
const y_rows1 = y_s1 + SECTION_H;
const y_s2 = y_rows1 + s1.rows.length * ROW_H;
const y_rows2 = y_s2 + SECTION_H;
const TH = y_rows2 + s2.rows.length * ROW_H;
const LEGEND_H = 44;

const svgEl = document.getElementById("canvas");
svgEl.setAttribute("width", TW + PAD * 2);
svgEl.setAttribute("height", TH + PAD * 2 + LEGEND_H);
svgEl.setAttribute("viewBox",
  (-PAD) + " " + (-PAD) + " " + (TW + PAD * 2) + " " + (TH + PAD * 2 + LEGEND_H));

const rc = rough.svg(svgEl);

// ── Helpers ─────────────────────────────────────────────────
function addText(x, y, str, opts={}) {
  const {size=14, color="#212529", anchor="start", weight="400",
         baseline="middle", style="normal", rotate=0} = opts;
  const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  t.setAttribute("x", x);
  t.setAttribute("y", y);
  t.setAttribute("text-anchor", anchor);
  t.setAttribute("dominant-baseline", baseline);
  t.setAttribute("font-size", size);
  t.setAttribute("font-weight", weight);
  t.setAttribute("font-style", style);
  t.setAttribute("fill", color);
  if (rotate) t.setAttribute("transform", "rotate(" + rotate + "," + x + "," + y + ")");
  t.textContent = str;
  svgEl.appendChild(t);
}

function addLogo(x, y, name, sz) {
  const href = logos[name];
  if (!href) return;
  const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
  img.setAttribute("href", href);
  img.setAttribute("x", x);
  img.setAttribute("y", y - sz / 2);
  img.setAttribute("width", sz);
  img.setAttribute("height", sz);
  svgEl.appendChild(img);
}

// ── Group header backgrounds ────────────────────────────────
// Name column header bg
svgEl.appendChild(rc.rectangle(0, 0, LABEL_W, HEADER_H, {
  fill: "#e9ecef", fillStyle: "solid", stroke: "none", roughness: 0.2, fillWeight: 0}));

// Group header colored backgrounds
groupSpans.forEach(g => {
  const gx = LABEL_W + g.start * COL_W;
  const gw = g.count * COL_W;
  svgEl.appendChild(rc.rectangle(gx, 0, gw, GROUP_H, {
    fill: g.bg, fillStyle: "solid", stroke: "none", roughness: 0.2, fillWeight: 0}));
});

// Sub-header background (rotated labels area)
svgEl.appendChild(rc.rectangle(LABEL_W, GROUP_H, NC * COL_W, SUB_H, {
  fill: "#f8f9fa", fillStyle: "solid", stroke: "none", roughness: 0.2, fillWeight: 0}));

// ── Section header backgrounds ──────────────────────────────
[y_s1, y_s2].forEach(sy => {
  svgEl.appendChild(rc.rectangle(0, sy, TW, SECTION_H, {
    fill: "#e9ecef", fillStyle: "solid", stroke: "none", roughness: 0.2, fillWeight: 0}));
});

// ── Alternating row stripes ─────────────────────────────────
function addStripes(yStart, rows) {
  for (let i = 1; i < rows.length; i += 2) {
    svgEl.appendChild(rc.rectangle(0, yStart + i * ROW_H, TW, ROW_H, {
      fill: "#f1f3f5", fillStyle: "solid", stroke: "none", roughness: 0.2, fillWeight: 0}));
  }
}
addStripes(y_rows1, s1.rows);
addStripes(y_rows2, s2.rows);

// ── Grid lines ──────────────────────────────────────────────
// Outer border
svgEl.appendChild(rc.rectangle(0, 0, TW, TH, {
  stroke: "#495057", strokeWidth: 2, roughness: 0.8, fill: "none"}));

// Group header bottom line
svgEl.appendChild(rc.line(LABEL_W, GROUP_H, TW, GROUP_H, {
  stroke: "#adb5bd", strokeWidth: 1, roughness: 0.5}));

// Header/data separator (thick)
svgEl.appendChild(rc.line(0, HEADER_H, TW, HEADER_H, {
  stroke: "#495057", strokeWidth: 2, roughness: 0.6}));

// Section separators
[y_s1, y_s1 + SECTION_H, y_s2, y_s2 + SECTION_H].forEach(sy => {
  svgEl.appendChild(rc.line(0, sy, TW, sy, {
    stroke: "#adb5bd", strokeWidth: 1, roughness: 0.5}));
});

// Row separators
function addRowLines(yStart, rows) {
  for (let i = 1; i < rows.length; i++) {
    svgEl.appendChild(rc.line(0, yStart + i * ROW_H, TW, yStart + i * ROW_H, {
      stroke: "#dee2e6", strokeWidth: 0.5, roughness: 0.4}));
  }
}
addRowLines(y_rows1, s1.rows);
addRowLines(y_rows2, s2.rows);

// Label column separator
svgEl.appendChild(rc.line(LABEL_W, 0, LABEL_W, TH, {
  stroke: "#495057", strokeWidth: 1.5, roughness: 0.6}));

// Group separators (thicker than column separators)
groupSpans.forEach(g => {
  if (g.start > 0) {
    const x = LABEL_W + g.start * COL_W;
    svgEl.appendChild(rc.line(x, 0, x, TH, {
      stroke: "#adb5bd", strokeWidth: 1, roughness: 0.5}));
  }
});

// Thin column separators within groups
for (let i = 1; i < NC; i++) {
  // Skip if this is already a group separator
  const isGroupBorder = groupSpans.some(g => g.start === i);
  if (!isGroupBorder) {
    const x = LABEL_W + i * COL_W;
    svgEl.appendChild(rc.line(x, GROUP_H, x, TH, {
      stroke: "#e9ecef", strokeWidth: 0.5, roughness: 0.4}));
  }
}

// ── Group header text (supports multi-line with \\n) ────────
groupSpans.forEach(g => {
  const gx = LABEL_W + g.start * COL_W;
  const gw = g.count * COL_W;
  const lines = g.name.split("\\n");
  const lineH = 15;
  const totalH = lines.length * lineH;
  const baseY = GROUP_H / 2 - totalH / 2 + lineH / 2;
  lines.forEach((line, li) => {
    addText(gx + gw / 2, baseY + li * lineH, line, {
      size: 13, color: g.color, anchor: "middle", weight: "600"});
  });
});

// ── Sub-header labels (90 deg rotated) ──────────────────────
allCols.forEach((colName, i) => {
  const cx = LABEL_W + i * COL_W + COL_W / 2 + 4;
  const cy = GROUP_H + SUB_H - 8;
  addText(cx, cy, colName, {
    size: 13, color: "#343a40", weight: "500", rotate: -90});
});

// ── Section labels ──────────────────────────────────────────
addText(14, y_s1 + SECTION_H / 2, s1.label, {
  size: 16, color: "#495057", weight: "600", style: "italic"});
addText(14, y_s2 + SECTION_H / 2, s2.label, {
  size: 16, color: "#495057", weight: "600", style: "italic"});

// ── Draw symbols: green checkmark, yellow diamond, red cross ─
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

// ── Data rows ───────────────────────────────────────────────
function drawRows(rows, yStart) {
  rows.forEach((row, ri) => {
    const ry = yStart + ri * ROW_H + ROW_H / 2;
    addLogo(10, ry, row.name, LOGO_SZ);
    addText(10 + LOGO_SZ + 6, ry, row.name, {size: 15, color: "#212529"});
    row.vals.forEach((v, ci) => {
      drawSymbol(LABEL_W + ci * COL_W + COL_W / 2, ry, v);
    });
  });
}
drawRows(s1.rows, y_rows1);
drawRows(s2.rows, y_rows2);

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
  const page = await browser.newPage({ viewport: { width: 1800, height: 1400 } });
  await page.setContent(HTML, { waitUntil: "networkidle" });
  await page.waitForFunction(
    () => document.getElementById("canvas")?.getAttribute("data-ready") === "true",
    { timeout: 15000 }
  );
  await page.waitForTimeout(1500); // font loading

  const svg = await page.$eval("#canvas", el => el.outerHTML);
  const outSvg = path.join(__dirname, "ecosystem-table-expanded.svg");
  fs.writeFileSync(outSvg, svg);
  console.log("SVG saved:", outSvg);

  const svgBox = await page.$eval("#canvas", el => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
  const outPng = path.join(__dirname, "ecosystem-table-expanded.png");
  await page.screenshot({ path: outPng, clip: svgBox, omitBackground: false });
  console.log("PNG saved:", outPng);

  await browser.close();
})();
