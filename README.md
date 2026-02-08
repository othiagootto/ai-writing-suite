# AI Writing Suite

> 8 AI-powered writing tools in one platform. Detect, humanize, paraphrase, check grammar, and more.

## What is it

A full-stack SaaS platform that bundles 8 essential AI writing tools into a single interface. Built for content writers, students, and marketers who need to detect AI content, humanize text, check grammar, verify originality, summarize documents, generate citations, paraphrase text, and chat with an AI writing assistant.

## Features

- **AI Detector** - Analyze text to determine if it was written by AI
- **AI Humanizer** - Rewrite AI-generated text to sound naturally human
- **Paraphraser** - Rewrite text with different tone and intensity
- **Grammar Checker** - Find and fix grammar, spelling, and style errors
- **Plagiarism Checker** - Analyze text originality and detect potential plagiarism
- **Summarizer** - Condense long texts into concise summaries
- **Citation Generator** - Generate citations in APA, MLA, Chicago, and Harvard
- **AI Chat** - Chat with AI about your documents and writing
- **i18n** - Full support for English, Portuguese, and Spanish
- **Dark Mode** - Premium B&W design with full dark mode support
- **Freemium Model** - 3 free uses/day per tool, unlimited with Pro subscription

## Quick Start

```bash
# Clone
git clone https://github.com/othiagootto/ai-writing-suite.git
cd ai-writing-suite

# Install
npm install

# Configure
cp .env.example .env.local
# Fill in your Supabase and Stripe keys

# Run
npm run dev
```

## Stack

- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS v4 + ShadCN/UI
- **Backend:** Supabase (Auth, Database, Edge Functions)
- **AI:** OpenAI GPT-4o + Claude Sonnet fallback
- **Payments:** Stripe (Checkout + Customer Portal)
- **Hosting:** Vercel (frontend) + Supabase (backend)
- **State:** Zustand + TanStack Query
- **i18n:** Custom zero-dependency system (Zustand + JSON)

## Links

- **Live:** https://ai-writing-suite.vercel.app
- **Code:** https://github.com/othiagootto/ai-writing-suite

---

**System #2/50** from the [HEFESTO](https://github.com/othiagootto) project

Made by [Th[IA]go Otto](https://thiagootto.dev)
