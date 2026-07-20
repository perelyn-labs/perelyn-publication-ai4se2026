# slide-forge — Convention File for Claude Code

## What this is
A paper-to-Beamer slide generator. The CLI handles compilation and theme management.
Claude Code handles slide generation, editing, and speaker scripts.

## Project layout
```
slides.yaml              # talk config (source, duration, narrative)
slides/
├── talk.tex             # Beamer slides (Perelyn theme, XeLaTeX)
├── script.md            # per-slide speaker narration
├── script.json          # structured data for TTS
├── outline.json         # optional cached outline
└── figures/             # images for slides
```

## slides.yaml
The config file defines: source (file/folder/list), duration, audience, narrative
(hook, arc, takeaway), focus (sections, skip, key_figures), style, constraints.
Read it before generating slides to understand what the user wants.

## Slide generation workflow
1. Read slides.yaml to understand the brief
2. Read the source paper (.tex preferred, .pdf/.md also supported)
3. Generate talk.tex using the Perelyn beamer theme
4. Compile: `slide-forge rebuild slides/talk.tex` (or `xelatex` directly)
5. Generate script.md + script.json with per-slide narration

## Perelyn Beamer theme conventions
- `\usetheme{Perelyn}` — requires XeLaTeX
- Title slide: `\begin{frame}[plain]\titlepage\end{frame}`
- Section divider: `\section{Title}` then `\begin{frame}[plain]\sectionpage\end{frame}`
- Key terms: `\alert{term}`
- Two-column: `\begin{columns}[T]` with `\begin{column}{0.48\textwidth}`
- Highlighted box: `\begin{block}{Title}...\end{block}`
- Max 5 items per slide, concise one-line bullets
- Include `\tableofcontents` after title, discussion frame before closing

## Editing slides
When the user asks to edit specific slides:
- Read the .tex file first
- Make targeted edits (don't regenerate the whole file)
- After editing, recompile: `cd slides && xelatex talk.tex && xelatex talk.tex`
- If script.md exists, update the narration for changed slides

## CLI commands (for non-LLM operations)
```bash
slide-forge init                          # create slides.yaml template
slide-forge theme slides/                 # install theme files
slide-forge rebuild slides/talk.tex       # recompile .tex → .pdf
slide-forge script slides/talk.tex        # generate script from .tex
slide-forge clean slides/                 # remove aux files
```
