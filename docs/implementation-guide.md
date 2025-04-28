Below are **three ready-to-paste Markdown docs** (plus a richer “Step 0 – Scaffold” excerpt) that meet all the parameters you gave.

---

## 1 Step 0 – Scaffold the Next .js 19 App-Router project

> This lives in **green-field.mdx** right after the “Prereqs” box.

| Est. effort | ~1 hour |
|-------------|---------|

### 0.1 Create & clean the project 🔮 Wizard Step 1
```bash
pnpm create next-app@latest hackai-llm-guide \
  --ts --tailwind --eslint --app --src-dir --import-alias "@/components/*"
cd hackai-llm-guide
```
- **Remove boilerplate**: delete `/app/api/hello` and the stub home markup.  
- **Rename** default page to `/app/page.tsx`; replace with a minimal hero.

### 0.2 Tighten TypeScript
```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true
  }
}
```

### 0.3 Formatter & linter trio
```bash
pnpm add -D prettier eslint-config-prettier @ianvs/prettier-plugin-sort-imports
```
- Add `.prettierrc`, extend ESLint with `prettier`, and add the import-sort plugin.

### 0.4 Husky + commitlint (semantic commits)
```bash
pnpm add -D husky @commitlint/{config-conventional,cli}
pnpm exec husky install
pnpm exec husky add .husky/commit-msg "pnpm commitlint --edit \$1"
echo "module.exports = { extends: ['@commitlint/config-conventional'] };" > commitlint.config.cjs
```

### 0.5 Vitest skeleton (unit tests later)
```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```
- Create `/test/setup.ts` and reference in `vitest.config.ts`.

### 0.6 Brand theme & shadcn/ui
```bash
pnpm dlx shadcn-ui@latest init
pnpm dlx shadcn-ui@latest add button card
```
- Add Tailwind custom colors: `--brand-900 #0d1f0d`, `--accent-500 #17b978`.

> **Checklist PDF** → `pdfs/phase0-scaffold.pdf` (manual export).

---

## 2 `docs/overview-guide.md`

```md
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
repo: "https://github.com/hackai/llm-project-guide"
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
```

### Key steps
- Run commands from **Step 0** guide (see green-field.mdx).  
- Initial commit:
  ```
  feat: scaffold Next.js19 project with strict linting and Husky
  ```

### Checklist PDF
`pdfs/phase0-scaffold.pdf`

---

## Phase 1 — Design Foundations   (~1.5 hrs)

### Goal
Install shadcn/ui, implement brand palette, global layout, and dark-mode toggle.

### Prompts
```txt
prompt: design_foundations
---
Using Tailwind config below, add shadcn/ui Button & Card,
configure custom colors (--brand-900, --accent-500),
and build a <ThemeToggle> as described.
```

### Steps
1. `pnpm dlx shadcn-ui@latest init`  
2. Update `tailwind.config.ts` with CSS vars.  
3. Create `components/ui/theme-toggle.tsx`.  

Commit template:
```
feat(ui): add brand palette, ThemeToggle, shadcn base
```

Checklist PDF → `pdfs/phase1-design.pdf`

---

## Phase 2 — Content Engine   (~2 hrs)

### Goal
Load MDX guides and render with code highlighting.

### Prompts
```txt
prompt: content_engine
---
Add next-mdx-remote, rehype-prism-plus, and a GuidesIndex page
that auto-imports all files in /content/guides.
```

### Steps
- Install deps: `pnpm add next-mdx-remote rehype-prism-plus gray-matter`.  
- Build `lib/getGuides.ts`.  
- Implement `/app/guides/layout.tsx` & index page.

Commit:
```
feat(content): MDX support and auto-generated Guides index
```

Checklist PDF → `pdfs/phase2-content.pdf`

---

## Phase 3 — Prompt Library   (~1 hr)

### Goal
Expose raw prompt files with copy buttons.

### Prompts
```txt
prompt: prompt_library
---
Create page /resources/prompt-library that scans /prompts/**/*
and renders a searchable table with copy-to-clipboard.
```

### Steps
- Read FS during `generateStaticParams`.  
- Use shadcn Table + CopyButton component.

Commit:
```
feat(resources): prompt library table with clipboard support
```

Checklist PDF → `pdfs/phase3-prompts.pdf`

---

## Phase 4 — Deploy & Polish   (~1 hr)

### Goal
Deploy to Vercel Preview → Production, add SEO meta.

### Prompts
```txt
prompt: deploy_polish
---
Generate vercel.json config with output: 'export'.
Add next-seo to _app.tsx with default meta tags.
```

### Steps
- Push `main` → Vercel auto-build.  
- Verify dark-mode and MDX rendering in preview.

Commit:
```
chore(deploy): configure Vercel and add default SEO tags
```

Checklist PDF → `pdfs/phase4-deploy.pdf`

---

## Future Phases

| Phase | Hook | Effort |
|-------|------|--------|
| Wizard Alpha | 🔮 Steps 1-3 | TBD |
| Account System | 🔮 Step 6 | TBD |
```

---

### How to use these docs with Cursor Agent

1. **open the overview-guide.md** so the agent groks boundaries.  
2. **Feed it the implementation-guide.md** and say:  
   > *“Start with **Phase 0**. Pause when complete.”*  
3. Answer any clarifying questions, then let it run commands.  

When you’re ready, I can help draft the remaining Phase 5+ content or create the first PDF checklists. Just let me know!