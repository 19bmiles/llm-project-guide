---
title: "HackAI LLM Project Guide • Overview"
mvp_success:
  - Green-field and Add-Feature guides published as MDX
  - Prompt library page lists ≥8 copy-paste prompts
  - Site deployed to Vercel with dark/light toggle
non_goals:
  - Storybook documentation
  - e2e Cypress tests
  - Any database or API layer
palette:
  base: "#000000"
  accent: "#17b978"
stack: ["Next.js 19", "React 15", "TypeScript", "Tailwind", "shadcn/ui"]
deployment: "Vercel"
repo: "https://github.com/19bmiles/llm-project-guide"
---

# Project Vision

HackAI’s mission is to **teach developers how to partner with LLMs** (e.g., Cursor Agent) while shipping real code.  
Version 2 focuses on two workflows:

1. **Green-field** – start a brand-new webapp from scratch.  
2. **Add a Feature** – integrate a cross-cutting capability into a mature monorepo SaaS.

> Future versions will add interactive wizards to automate scoping, prompt generation, and checklists.

## Information Architecture (MVP)

| Route | Purpose |
|-------|---------|
| `/` | Hero, value prop, quick links |
| `/guides/green-field` | Step-by-step build of **this** site |
| `/guides/add-feature` | Step-by-step feature integration |
| `/resources/prompt-library` | Copy-paste prompt catalog |
| `/about` | HackAI background & contribution guide |

## Out-of-Scope (MVP)

- Component playgrounds (Storybook)  
- End-to-end tests (Cypress / Playwright)  
- Database integration or backend APIs  

## Future Automation Hooks

| Hook | Description |
|------|-------------|
| 🔮 Wizard Step 1 | Capture project description and goals |
| 🔮 Wizard Step 3 | Auto-generate supplemental docs (coding standards, styling guide) |
| 🔮 Wizard Step 6 | Batch-execute Cursor agent phases |

---

## 3 `docs/implementation-guide.md`

```md
---
title: "LLM-Assisted Implementation Roadmap"
---

# Phase-by-Phase Plan

> Each phase lists: *goal • effort • exact prompts • commit template*.  
> Printable checklists live in `/static/pdfs/`.

## Phase 0 — Scaffold & Hardening   (~2 hrs)

### Goal
Create a clean Next 19 + React 15 base with strict linting & formatting.

### Prompts
```txt
prompt: scaffold_project
---
Act as a lead engineer. Guide me through:
1. Running pnpm create next-app with Tailwind & TS
2. Removing boilerplate
3. Enabling strict TS + Prettier + ESLint
4. Setting up Husky with commitlint
Return shell commands only.
