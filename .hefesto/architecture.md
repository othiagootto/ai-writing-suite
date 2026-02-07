# ARCHITECTURE: AI Writing Suite

> Sistema #2/50 | Clone JustDone.com
> Autor: Th[IA]go Otto | Data: 2026-02-07

---

## Stack

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| Frontend | React 18 + TypeScript + Vite | Mesmo stack do Nutron, produtividade maxima |
| Styling | Tailwind CSS + ShadCN/Radix | Design system B&W premium do Nutron |
| State | Zustand + React Query | Leve, performatico, pattern ja usado no Nutron |
| Routing | React Router v6 | Consistencia com Nutron |
| Backend | Supabase (Auth + DB + Edge Functions + Storage) | Serverless, rapido de implementar, ja familiar |
| Database | PostgreSQL (via Supabase) | Relacional, robusto, RLS nativo |
| LLM Primary | OpenAI GPT-4o | Melhor custo-beneficio para ferramentas de escrita |
| LLM Fallback | Anthropic Claude Sonnet | Fallback robusto, excelente para texto longo |
| Payments | Stripe Checkout + Webhooks | Padrao da industria, integracao via Edge Functions |
| File Parsing | pdf-parse + mammoth | Parsing de PDF e DOCX no edge function |
| Hosting | Vercel (frontend) + Supabase (backend) | Deploy rapido, SSL automatico |
| Analytics | PostHog | Ja usado no Nutron, open source |
| Icons | Lucide React | Consistencia com Nutron |

---

## Estrutura de Arquivos

```
ai-writing-suite/
├── .hefesto/              # HEFESTO state files
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   └── robots.txt
├── src/
│   ├── App.tsx            # Router + providers
│   ├── main.tsx           # Entry point
│   ├── index.css          # Global styles + design tokens
│   ├── vite-env.d.ts
│   │
│   ├── components/
│   │   ├── ui/            # ShadCN components (button, card, dialog, etc.)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Layout.tsx
│   │   │   └── DashboardLayout.tsx
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── FinalCTA.tsx
│   │   ├── tools/
│   │   │   ├── ToolLayout.tsx        # Layout compartilhado (input/output)
│   │   │   ├── TextInput.tsx         # Textarea + file upload + char counter
│   │   │   ├── ResultPanel.tsx       # Output com copy + export
│   │   │   ├── ScoreDisplay.tsx      # Barra de score (detector/plagiarism)
│   │   │   ├── HighlightedText.tsx   # Texto com trechos destacados
│   │   │   ├── ToneSelector.tsx      # Seletor de tom (paraphraser)
│   │   │   ├── IntensitySlider.tsx   # Slider de intensidade
│   │   │   └── ModeSelector.tsx      # Seletor de modo (humanizer)
│   │   ├── chat/
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── FileUpload.tsx
│   │   ├── auth/
│   │   │   ├── AuthGuard.tsx
│   │   │   └── UserMenu.tsx
│   │   └── shared/
│   │       ├── UsageBadge.tsx        # Mostra usos restantes
│   │       ├── UpgradeModal.tsx      # Modal de upgrade
│   │       └── LoadingSpinner.tsx
│   │
│   ├── pages/
│   │   ├── Index.tsx                 # Landing page
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── ForgotPassword.tsx
│   │   ├── Pricing.tsx
│   │   ├── Dashboard.tsx             # Hub com cards para cada ferramenta
│   │   ├── tools/
│   │   │   ├── AIDetector.tsx
│   │   │   ├── PlagiarismChecker.tsx
│   │   │   ├── Humanizer.tsx
│   │   │   ├── Paraphraser.tsx
│   │   │   ├── GrammarChecker.tsx
│   │   │   ├── Summarizer.tsx
│   │   │   ├── CitationGenerator.tsx
│   │   │   └── AIChat.tsx
│   │   ├── History.tsx
│   │   ├── Account.tsx
│   │   ├── Terms.tsx
│   │   ├── Privacy.tsx
│   │   └── NotFound.tsx
│   │
│   ├── hooks/
│   │   ├── useUser.ts
│   │   ├── useSubscription.ts
│   │   ├── useUsageLimit.ts
│   │   ├── useTool.ts              # Hook generico para chamar ferramentas
│   │   ├── useChat.ts
│   │   ├── useFileUpload.ts
│   │   └── useTheme.ts
│   │
│   ├── services/
│   │   ├── supabase.ts             # Client Supabase
│   │   ├── auth.ts                 # Login, signup, logout
│   │   ├── llm.ts                  # Abstraction layer multi-provider
│   │   ├── tools.ts                # Chamadas para cada ferramenta
│   │   ├── stripe.ts               # Checkout + portal
│   │   ├── files.ts                # Upload + parse de documentos
│   │   └── history.ts              # CRUD historico
│   │
│   ├── stores/
│   │   ├── uiStore.ts              # Tema, sidebar state
│   │   └── chatStore.ts            # Estado do chat
│   │
│   ├── lib/
│   │   ├── prompts.ts              # Todos os system prompts das ferramentas
│   │   ├── constants.ts            # Limites, planos, precos
│   │   └── utils.ts                # Helpers
│   │
│   └── types/
│       └── index.ts                # TypeScript types
│
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   └── functions/
│       ├── process-tool/           # Edge function: processa ferramentas de IA
│       ├── create-checkout/        # Edge function: Stripe checkout
│       ├── stripe-webhook/         # Edge function: webhook do Stripe
│       └── parse-document/         # Edge function: parse PDF/DOCX
│
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Componentes Principais

### 1. ToolLayout (Pattern Core)

Todas as 7 ferramentas de texto (exceto Chat) usam o MESMO layout:

```
┌─────────────────────────────────────────────────┐
│  [Tool Name]              [Usage: 2/3 remaining]│
├────────────────────┬────────────────────────────┤
│                    │                            │
│   INPUT PANEL      │   OUTPUT PANEL             │
│                    │                            │
│   [Textarea]       │   [Result / Score]         │
│   [File Upload]    │   [Highlighted Text]       │
│   [Options]        │   [Copy] [Export]          │
│                    │                            │
│   [== Analyze ==]  │   [Send to Humanizer ->]   │
│                    │                            │
├────────────────────┴────────────────────────────┤
│  History: [Recent results as chips]             │
└─────────────────────────────────────────────────┘
```

### 2. LLM Abstraction Layer

```typescript
// services/llm.ts - Simplified multi-provider
interface LLMRequest {
  systemPrompt: string;
  userPrompt: string;
  stream?: boolean;
  maxTokens?: number;
}

interface LLMResponse {
  content: string;
  provider: 'openai' | 'anthropic';
  tokensUsed: number;
}

async function callLLM(request: LLMRequest): Promise<LLMResponse> {
  try {
    return await callOpenAI(request);  // Primary
  } catch {
    return await callAnthropic(request);  // Fallback
  }
}
```

### 3. Prompts Engine

Cada ferramenta = 1 system prompt especializado:

```typescript
// lib/prompts.ts
export const TOOL_PROMPTS = {
  detector: `You are an AI content detector. Analyze the text...`,
  humanizer: `You are a text humanizer. Rewrite the following AI-generated text...`,
  paraphraser: `You are a professional paraphraser. Rewrite with tone: {tone}...`,
  grammar: `You are a grammar expert. Find and correct errors...`,
  summarizer: `You are a summarization expert. Summarize the text...`,
  citation: `You are a citation generator. Generate a {format} citation...`,
  // plagiarism uses external API or specialized prompt
}
```

### 4. Usage Tracking

```typescript
// hooks/useUsageLimit.ts
function useUsageLimit(tool: ToolType) {
  // Free: 3 uses/day/tool
  // Pro: unlimited
  // Check: count usage_logs WHERE user_id AND tool AND date = today
  // Return: { canUse, remaining, total, isLimited }
}
```

---

## API Endpoints (Supabase Edge Functions)

| Method | Endpoint | Descricao |
|--------|----------|-----------|
| POST | /functions/v1/process-tool | Processa qualquer ferramenta de IA |
| POST | /functions/v1/create-checkout | Cria sessao Stripe Checkout |
| POST | /functions/v1/stripe-webhook | Recebe eventos do Stripe |
| POST | /functions/v1/parse-document | Faz parse de PDF/DOCX para texto |

### process-tool payload

```json
{
  "tool": "detector|humanizer|paraphraser|grammar|summarizer|citation",
  "input": "texto do usuario",
  "options": {
    "tone": "academic",
    "intensity": "moderate",
    "mode": "auto",
    "format": "APA"
  }
}
```

### process-tool response

```json
{
  "result": "texto processado ou analise",
  "score": 85,
  "highlights": [
    { "start": 0, "end": 50, "type": "ai_detected", "confidence": 0.92 }
  ],
  "metadata": {
    "provider": "openai",
    "tokensUsed": 450,
    "processingTime": 2.3
  }
}
```

---

## Fluxo de Dados

```
User Input
    │
    ▼
[Frontend] ──────── TextInput component
    │
    ▼
[Supabase Edge Function: process-tool]
    │
    ├── Check auth (JWT)
    ├── Check usage limits (query usage_logs)
    ├── Build prompt (tool + options + input)
    │
    ▼
[LLM Provider]
    │
    ├── Try OpenAI GPT-4o
    ├── Fallback: Anthropic Claude
    │
    ▼
[Process Response]
    │
    ├── Parse structured output (JSON)
    ├── Log usage (insert usage_logs)
    │
    ▼
[Return to Frontend]
    │
    ▼
[ResultPanel] ──────── Display formatted result
```

---

## Decisoes Tecnicas (ADRs)

### ADR-001: Todas ferramentas como prompt wrappers

**Decisao:** Cada ferramenta e um wrapper de prompt sobre LLM, sem ML customizado.
**Motivo:** Implementavel em 2 dias. 90% da qualidade com 10% da complexidade.
**Tradeoff:** Detector de IA e plagiarism checker serao menos precisos que ferramentas especializadas.

### ADR-002: Supabase Edge Functions como backend

**Decisao:** Usar Supabase Edge Functions (Deno) para toda logica server-side.
**Motivo:** Zero infra para gerenciar. Deploy instantaneo. Auth integrado.
**Tradeoff:** Cold starts podem adicionar 1-2s. Limite de 50MB por funcao.

### ADR-003: Split-panel layout para todas ferramentas

**Decisao:** Input esquerda, output direita. Mesmo layout para tudo.
**Motivo:** UX consistente, menos codigo, mais rapido de implementar.
**Tradeoff:** Pode nao ser ideal para AI Chat (que precisa de layout diferente).

### ADR-004: Multi-provider com fallback simples

**Decisao:** OpenAI primario, Claude fallback via try/catch.
**Motivo:** Resiliencia sem complexidade. Se OpenAI cai, Claude assume.
**Tradeoff:** Nao otimiza por custo/qualidade por ferramenta. Provider unico por request.

### ADR-005: Design system herdado do Nutron

**Decisao:** Copiar design tokens, fontes e componentes base do Nutron.
**Motivo:** Visual profissional pronto. Consistencia de marca. Velocidade.
**Tradeoff:** Pode parecer "generico" se nao customizar cores/branding.

### ADR-006: Plagiarism via LLM (sem API externa)

**Decisao:** Plagiarism "checker" via prompt LLM que analisa originalidade do texto.
**Motivo:** APIs de plagiarism (Copyleaks, Turnitin) custam caro e tem setup complexo.
**Tradeoff:** Nao compara com banco de dados real. E uma analise heuristica, nao factual.
**Alternativa futura:** Integrar Copyleaks API ($0.01/page) quando monetizar.

### ADR-007: Streaming para UX responsiva

**Decisao:** Usar streaming de tokens (SSE) para ferramentas que geram texto.
**Motivo:** Feedback imediato para o usuario. Reduz perceived latency.
**Tradeoff:** Edge functions com streaming sao mais complexas de debugar.

---

## Dependencias Externas

| Servico | Uso | Custo Estimado |
|---------|-----|----------------|
| Supabase (Free tier) | Auth + DB + Edge Functions + Storage | $0/mes (ate 50k MAU) |
| OpenAI API | GPT-4o para todas as ferramentas | ~$5-50/mes (depende de uso) |
| Anthropic API | Claude Sonnet como fallback | ~$2-20/mes (so quando OpenAI falha) |
| Stripe | Processamento de pagamentos | 2.9% + $0.30 por transacao |
| Vercel (Free tier) | Hosting frontend | $0/mes (ate 100GB bandwidth) |
| PostHog (Free tier) | Analytics | $0/mes (ate 1M eventos) |

**Custo total estimado MVP:** $0-10/mes (sem considerar uso de API LLM por usuarios)

---

## Configuracao de Ambiente

### Variaveis de Ambiente (.env)

```env
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

# OpenAI (apenas nas Edge Functions)
OPENAI_API_KEY=sk-...

# Anthropic (apenas nas Edge Functions)
ANTHROPIC_API_KEY=sk-ant-...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...

# PostHog
VITE_POSTHOG_KEY=phc_...
```

### Setup Local

```bash
# 1. Clone
git clone <repo>
cd ai-writing-suite

# 2. Install
npm install

# 3. Supabase local
npx supabase start
npx supabase db reset

# 4. Env
cp .env.example .env
# Preencher keys

# 5. Dev
npm run dev
```

---

## Timeline Estimada (2 dias = 16h AI)

| Fase | Horas | Entrega |
|------|-------|---------|
| Setup (Vite + Supabase + Tailwind) | 1h | Projeto rodando |
| Design System (copiar Nutron tokens) | 1h | Tema B&W funcionando |
| Landing Page | 2h | Pagina publica completa |
| Auth (login/signup) | 1h | Autenticacao funcional |
| Dashboard + Layout | 1.5h | Area logada com sidebar |
| ToolLayout + TextInput + ResultPanel | 1.5h | Componentes base |
| 8 Ferramentas (prompts + UI) | 4h | Todas ferramentas funcionando |
| AI Chat | 1.5h | Chat com upload |
| Stripe Checkout | 1h | Pagamento funcional |
| Usage Limits + History | 1h | Limites e historico |
| Polish + Deploy | 1.5h | Producao |
| **TOTAL** | **17h** | **MVP Completo** |

> Nota: 17h e agressivo. Se necessario, cortar Citation Generator e History.

---

*Architecture gerada por @visionary (Iris) em 2026-02-07*
*Pendente review por @critic*
