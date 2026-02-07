# TASKS: AI Writing Suite

> Plano de implementacao para FORGE
> Baseado na review do @critic - escopo ajustado para 4 ferramentas core

---

## Wave 1: Foundation (Paralelo - 4.5h)

### Task 1.1 - Project Setup
- **Arquivos:** package.json, vite.config.ts, tsconfig.json, index.html, tailwind.config.ts, postcss.config.js
- **Acao:** Criar projeto Vite + React + TypeScript. Instalar dependencias: tailwindcss, @radix-ui/*, lucide-react, zustand, @tanstack/react-query, react-router-dom, @supabase/supabase-js, zod, class-variance-authority, clsx, tailwind-merge, sonner
- **Verificacao:** `npm run dev` abre pagina em branco no browser
- **Done:** Projeto roda sem erros

### Task 1.2 - Design System (Nutron B&W)
- **Arquivos:** src/index.css, tailwind.config.ts, src/lib/utils.ts
- **Acao:** Copiar design tokens do Nutron: cores B&W (light/dark), tipografia (Plus Jakarta Sans + Inter), spacing, border-radius, shadows, animacoes. Configurar dark mode via class strategy. Importar fontes do Google Fonts no index.html
- **Verificacao:** Elementos basicos (texto, fundo, bordas) renderizam corretamente em dark e light mode
- **Done:** Design tokens configurados, dark mode funciona

### Task 1.3 - ShadCN UI Components
- **Arquivos:** src/components/ui/*.tsx, components.json
- **Acao:** Instalar/configurar ShadCN. Gerar componentes necessarios: button, card, input, textarea, dialog, dropdown-menu, tabs, badge, separator, toast, tooltip, select, slider, label, switch, avatar, scroll-area, progress
- **Verificacao:** Componentes renderizam com estilo B&W correto
- **Done:** Todos componentes UI base disponiveis

### Task 1.4 - Supabase Setup
- **Arquivos:** src/services/supabase.ts, supabase/migrations/001_initial_schema.sql
- **Acao:** Criar projeto Supabase. Configurar client. Criar migration com schema: users (sem tier - derivar de subscriptions), usage_logs, subscriptions. Configurar RLS policies basicas
- **Verificacao:** `npx supabase db reset` roda sem erros. Client conecta
- **Done:** Database com schema e RLS, client funcional

### Task 1.5 - Router + Providers Setup
- **Arquivos:** src/App.tsx, src/main.tsx, src/stores/uiStore.ts
- **Acao:** Configurar React Router com todas as rotas (lazy loaded). Setup QueryClientProvider + Toaster. Criar uiStore com theme management. Configurar Suspense com fallback
- **Verificacao:** Navegacao entre rotas funciona. Theme toggle funciona
- **Done:** App shell rodando com routing e providers

---

## Wave 2: Public Pages (Sequencial - 3h)

### Task 2.1 - Layout Components
- **Arquivos:** src/components/layout/Header.tsx, Footer.tsx, Layout.tsx, Sidebar.tsx, DashboardLayout.tsx
- **Acao:** Criar Header (logo, nav, theme toggle, auth buttons). Footer basico. Layout wrapper (Header + Outlet + Footer). DashboardLayout (Sidebar + content area). Sidebar com links para ferramentas
- **Verificacao:** Header e footer renderizam. Sidebar mostra ferramentas com icones
- **Done:** Layouts publico e logado funcionando
- **Depende de:** 1.1, 1.2, 1.3

### Task 2.2 - Landing Page
- **Arquivos:** src/pages/Index.tsx, src/components/landing/Hero.tsx, Features.tsx, HowItWorks.tsx, Pricing.tsx, Testimonials.tsx, FinalCTA.tsx
- **Acao:** Criar landing page com 6 secoes. Hero com headline, subtitle, CTA. Features grid com 8 ferramentas (4 ativas + 4 coming soon). HowItWorks (3 passos). Pricing (3 planos). Testimonials (6-8 fake). Final CTA
- **Verificacao:** Landing page completa, responsiva, visual B&W premium
- **Done:** Todas 6 secoes renderizam corretamente em mobile e desktop
- **Depende de:** 2.1

### Task 2.3 - Auth Pages
- **Arquivos:** src/pages/Login.tsx, Signup.tsx, ForgotPassword.tsx, src/services/auth.ts, src/hooks/useUser.ts, src/components/auth/AuthGuard.tsx, UserMenu.tsx
- **Acao:** Criar paginas de login/signup/forgot com Supabase Auth. Hook useUser com session management. AuthGuard para rotas protegidas. UserMenu dropdown
- **Verificacao:** Signup cria usuario. Login redireciona ao dashboard. Rotas protegidas redirecionam para login
- **Done:** Auth flow completo funciona end-to-end
- **Depende de:** 1.4, 2.1

---

## Wave 3: Core Tools (Sequencial - 5h)

### Task 3.1 - Supabase Edge Function: process-tool
- **Arquivos:** supabase/functions/process-tool/index.ts
- **Acao:** Criar edge function que: (1) valida JWT, (2) verifica usage limits, (3) monta prompt baseado no tool + options, (4) chama OpenAI GPT-4o (JSON mode), (5) faz fallback para Claude se OpenAI falhar, (6) loga uso em usage_logs, (7) retorna resultado estruturado. NAO usar streaming - request/response simples
- **Verificacao:** Curl para edge function retorna resultado correto para cada ferramenta
- **Done:** Edge function processa todas 4 ferramentas corretamente
- **Depende de:** 1.4

### Task 3.2 - Shared Tool Components
- **Arquivos:** src/components/tools/ToolLayout.tsx, TextInput.tsx, ResultPanel.tsx, ScoreDisplay.tsx, HighlightedText.tsx, ToneSelector.tsx, IntensitySlider.tsx, ModeSelector.tsx, src/components/shared/UsageBadge.tsx, UpgradeModal.tsx, LoadingSpinner.tsx
- **Acao:** Criar ToolLayout (split panel: input left, output right). TextInput (textarea + char counter + clear). ResultPanel (resultado + copy + send to other tool). ScoreDisplay (barra de progresso 0-100%). HighlightedText (trechos coloridos). UsageBadge (X/3 remaining). UpgradeModal. Seletores especializados
- **Verificacao:** Componentes renderizam isoladamente com dados mock
- **Done:** Todos componentes reutilizaveis prontos
- **Depende de:** 2.1

### Task 3.3 - Hook useTool + useUsageLimit
- **Arquivos:** src/hooks/useTool.ts, useUsageLimit.ts, src/services/tools.ts, src/lib/constants.ts
- **Acao:** Criar useTool hook que chama edge function, gerencia loading/error/result. useUsageLimit que consulta usage_logs do dia. Constants com limites e tool definitions
- **Verificacao:** Hook retorna resultado correto quando chamado com mock data
- **Done:** Hooks funcionais, integrados com Supabase
- **Depende de:** 3.1

### Task 3.4 - AI Detector Page
- **Arquivos:** src/pages/tools/AIDetector.tsx, src/lib/prompts.ts (detector prompt)
- **Acao:** Criar pagina usando ToolLayout. Input: textarea. Output: ScoreDisplay (0-100%) + HighlightedText com trechos "provavelmente IA" destacados. Botao "Humanizar" que navega para Humanizer com texto pre-preenchido. Prompt: instruir LLM a retornar JSON com score e highlights
- **Verificacao:** Colar texto AI -> score alto. Colar texto humano -> score baixo. Highlights aparecem
- **Done:** AI Detector funcional end-to-end
- **Depende de:** 3.2, 3.3

### Task 3.5 - Humanizer Page
- **Arquivos:** src/pages/tools/Humanizer.tsx, src/lib/prompts.ts (humanizer prompt)
- **Acao:** Criar pagina com ModeSelector (Light / Auto / Bypass). Input: textarea (aceita pre-fill via query param). Output: texto humanizado. Prompt: instruir LLM a reescrever variando por modo
- **Verificacao:** Texto AI entra -> texto "humano" sai. 3 modos produzem outputs diferentes
- **Done:** Humanizer funcional com 3 modos
- **Depende de:** 3.2, 3.3

### Task 3.6 - Paraphraser Page
- **Arquivos:** src/pages/tools/Paraphraser.tsx, src/lib/prompts.ts (paraphraser prompt)
- **Acao:** Criar pagina com ToneSelector (Academic/Casual/Professional/Neutral/Humanize/Remove Plagiarism) e IntensitySlider (Minimum/Moderate/Maximum). Input: textarea. Output: texto parafraseado. Prompt: instruir LLM com tom e intensidade
- **Verificacao:** Diferentes combinacoes de tom + intensidade produzem outputs visivelmente diferentes
- **Done:** Paraphraser funcional com 6 tons e 3 intensidades
- **Depende de:** 3.2, 3.3

### Task 3.7 - Grammar Checker Page
- **Arquivos:** src/pages/tools/GrammarChecker.tsx, src/lib/prompts.ts (grammar prompt)
- **Acao:** Criar pagina. Input: textarea. Output: texto corrigido + lista de erros encontrados (tipo, posicao, sugestao). HighlightedText com erros destacados. Prompt: instruir LLM a retornar JSON com correcoes e texto corrigido
- **Verificacao:** Texto com erros -> correcoes aparecem destacadas. Texto limpo -> "Nenhum erro encontrado"
- **Done:** Grammar Checker funcional end-to-end
- **Depende de:** 3.2, 3.3

### Task 3.8 - Dashboard Page
- **Arquivos:** src/pages/Dashboard.tsx
- **Acao:** Criar dashboard hub com 8 cards (grid 2x4 ou 4x2). 4 cards ativos (Detector, Humanizer, Paraphraser, Grammar) com icone, nome, descricao, link. 4 cards "Coming Soon" (Plagiarism, Summarizer, Citation, AI Chat) com badge e estilo opaco. Stats de uso do dia no topo
- **Verificacao:** Dashboard renderiza todos cards. Cards ativos navegam para ferramenta. Cards "Coming Soon" mostram badge
- **Done:** Dashboard completo com navegacao funcional
- **Depende de:** 3.4, 3.5, 3.6, 3.7

---

## Wave 4: Monetizacao + Polish (Paralelo - 3.75h)

### Task 4.1 - Stripe Checkout
- **Arquivos:** supabase/functions/create-checkout/index.ts, supabase/functions/stripe-webhook/index.ts, src/services/stripe.ts, src/hooks/useSubscription.ts, src/pages/Pricing.tsx (update)
- **Acao:** Criar edge function create-checkout (cria sessao Stripe com trial). Criar stripe-webhook (atualiza subscriptions no Supabase). Frontend: useSubscription hook (isPro, isTrialing). Pricing page com botoes que redirecionam para Stripe
- **Verificacao:** Clicar em "Upgrade" -> Stripe Checkout abre. Pagamento teste -> subscription criada no DB. Webhook processa corretamente
- **Done:** Fluxo completo de pagamento funciona
- **Depende de:** 1.4, 2.3

### Task 4.2 - Usage Limits Integration
- **Arquivos:** Ajustar components/tools/ToolLayout.tsx, components/shared/UpgradeModal.tsx
- **Acao:** Integrar useUsageLimit em cada ferramenta. Se free e limite atingido: bloquear textarea, mostrar UpgradeModal. UsageBadge no header de cada ferramenta mostrando "X/3 usos restantes"
- **Verificacao:** Free user: apos 3 usos, ferramenta bloqueada com modal de upgrade. Pro user: sem limite
- **Done:** Limites funcionam corretamente para free e pro
- **Depende de:** 3.3, 4.1

### Task 4.3 - Pages Auxiliares
- **Arquivos:** src/pages/Account.tsx, Terms.tsx, Privacy.tsx, NotFound.tsx
- **Acao:** Account: info do usuario + link para Stripe portal. Terms/Privacy: texto placeholder legal. NotFound: 404 com link para home
- **Verificacao:** Todas paginas renderizam sem erro
- **Done:** Paginas auxiliares completas
- **Depende de:** 2.1

### Task 4.4 - Deploy
- **Arquivos:** vercel.json, README.md
- **Acao:** Deploy frontend no Vercel. Deploy edge functions no Supabase (producao). Configurar env vars em producao. Configurar dominio (se tiver). Testar fluxo completo em producao
- **Verificacao:** URL de producao acessivel. Signup -> uso de ferramenta -> upgrade funciona
- **Done:** Sistema em producao acessivel publicamente
- **Depende de:** Todas tasks anteriores

---

## Resumo

| Wave | Tasks | Horas | Paralelismo |
|------|-------|-------|-------------|
| Wave 1: Foundation | 5 tasks | 4.5h | Paralelo |
| Wave 2: Public Pages | 3 tasks | 3h | Sequencial |
| Wave 3: Core Tools | 8 tasks | 5h | Parcialmente paralelo |
| Wave 4: Monetizacao + Polish | 4 tasks | 3.75h | Paralelo |
| **TOTAL** | **20 tasks** | **16.25h** | |

---

## Ordem de Execucao Recomendada

```
1.1 ──┐
1.2 ──┤
1.3 ──┼── [paralelo] ──> 2.1 ──> 2.2
1.4 ──┤                    │
1.5 ──┘                    └──> 2.3
                                  │
3.1 ──────────────────────────────┤ [pode iniciar em paralelo com Wave 2]
                                  │
3.2 + 3.3 ──> 3.4 ──> 3.5 ──> 3.6 ──> 3.7 ──> 3.8
                                                  │
4.1 ──┐                                          │
4.2 ──┼── [paralelo, depende de 3.x] ────────────┤
4.3 ──┘                                          │
                                                  └──> 4.4 (deploy)
```

---

*Tasks geradas por @critic (Cato) em 2026-02-07*
*Pronto para FORGE apos aprovacao humana*
