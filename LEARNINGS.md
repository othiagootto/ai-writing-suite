# LEARNINGS: AI Writing Suite

System #2/50 from the HEFESTO project
Date: 2026-02-07

---

## What I learned

### 1. ShadCN toast is deprecated, use Sonner

When setting up the project with ShadCN, the `toast` component from ShadCN is deprecated. The official replacement is `sonner`, a standalone toast library. This caught us during setup and applies to all future ShadCN projects.

### 2. Tailwind v4 uses @import not @tailwind

Tailwind CSS v4 changed the entry point syntax. Instead of `@tailwind base; @tailwind components; @tailwind utilities;`, it now uses `@import "tailwindcss"`. Small but breaks builds if you use the old syntax.

### 3. Zero-dependency i18n is viable for small apps

For an app with 3 locales and ~400 strings, a custom i18n solution using Zustand + a flat JSON translation map works perfectly. No need for react-i18next. The entire system is ~50 lines of code (hook + store update). Translation file is flat key-value pairs like `'landing.headline': 'Write Better.'`, which is easy to maintain and extend.

### 4. Parallel agent execution (Wave pattern) maximizes throughput

Splitting FORGE into 4 parallel waves (infrastructure -> pages -> tools -> polish) allowed independent work streams to execute simultaneously. The same pattern worked for i18n: 4 agents updating different file groups in parallel completed in the time of 1.

### 5. lucide-react creates an 861KB chunk

Importing from `lucide-react` pulls the entire icon library into the bundle. For production, consider manual imports (`import { Globe } from 'lucide-react'` already does tree-shaking, but the barrel export still causes issues with some bundlers). Worth investigating in future projects.

### 6. Prompt-wrapper architecture scales easily

All 8 tools share the same pattern: text input -> LLM prompt -> structured output. The `useTool` hook + `process-tool` Edge Function handle everything. Adding a new tool is just: define a prompt, add a page, register the route. No new backend code needed.

### 7. Vercel needs .npmrc for ESLint peer dep conflicts

ESLint v9/v10 + @eslint/js have conflicting peer dependencies. Vercel's `npm install` fails without `legacy-peer-deps=true` in `.npmrc`. Local installs work fine because of existing lockfile. Always test clean installs.

---

## What I'd do differently

- **Tree-shake lucide-react** from day 1 to avoid the 861KB chunk warning
- **Add .npmrc earlier** to avoid deploy surprises
- **Start with i18n from the beginning** - retrofitting 400 strings is tedious, but the HEFESTO process intentionally adds i18n as a polish step

## Biggest challenge

The i18n retrofit: extracting ~400 hardcoded strings from 27 files and creating accurate translations for 3 languages. The parallel agent pattern made it feasible in a single session, but it's inherently error-prone. A better approach for future systems is to use translation keys from the start.

## Surprises

- Browser locale auto-detection (`navigator.language`) works reliably across all modern browsers
- The Zustand persist middleware automatically handles locale persistence with zero extra code
- Vercel auto-detects Vite projects and configures the build correctly

---

## Metrics

- Total time: 2 days (concept to production)
- Human time: ~25min
- Commits: 8
- Lines of code: ~15,000
- Files: 100+
- Languages: 3 (EN, PT, ES)
- Build: 0 TypeScript errors

---

*Forged with HEFESTO*
