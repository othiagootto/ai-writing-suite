# SPEC: AI Writing Suite

> Sistema #2/50 | Clone JustDone.com
> Autor: Th[IA]go Otto | Data: 2026-02-07

---

## Visao Geral

Plataforma SaaS all-in-one de escrita com IA para profissionais/corporativo, inspirada no JustDone.com, com visual irmao do Nutron (B&W premium). Combina 8+ ferramentas de escrita (detector de IA, plagiarism checker, humanizer, paraphraser, grammar checker, summarizer, AI chat, citation generator) em um unico workspace com autenticacao, pagamento Stripe e multi-provider LLM.

---

## MVP Scope

### IN (Obrigatorio para v1)

1. **Landing Page** - Hero, features, pricing, testimonials, CTA (visual Nutron B&W)
2. **Auth** - Login/signup com Supabase Auth (email/password)
3. **Dashboard** - Area logada com acesso a todas as ferramentas
4. **8 Ferramentas de IA:**
   - RF01: AI Detector - Cola texto, analisa probabilidade de ser IA (score 0-100%)
   - RF02: Plagiarism Checker - Cola texto, verifica similaridade com fontes online
   - RF03: AI Humanizer - Cola texto AI, reescreve para parecer humano (3 modos: light/auto/bypass)
   - RF04: Paraphraser - Reescreve texto com controle de tom (6 tons) e intensidade (3 niveis)
   - RF05: Grammar Checker - Corrige erros gramaticais e sugere melhorias
   - RF06: Summarizer - Resume textos longos em versoes concisas
   - RF07: AI Chat - Chat conversacional com suporte a upload de PDFs/docs
   - RF08: Citation Generator - Gera citacoes em APA, MLA, Chicago, Harvard
5. **Stripe Checkout** - Trial 7 dias + plano mensal + plano anual
6. **Usage Limits** - Free: 3 usos/dia por ferramenta | Pro: ilimitado
7. **Multi-provider LLM** - OpenAI GPT-4o + Claude como fallback
8. **Historico** - Ultimas 50 operacoes salvas por usuario

### OUT (Nao faz parte do MVP)

- Extensao Chrome
- Upload de imagens/OCR
- Quiz Generator
- Fact Checker com busca na web em tempo real
- API publica
- Teams/organizacoes
- White-label
- Mobile app nativo
- Integracao Google Docs/Word
- Real-time collaboration

---

## User Flows

### Flow 1: Primeiro Acesso (Visitante -> Trial)

1. Visitante acessa landing page
2. Ve hero com proposta de valor + demo das ferramentas
3. Clica "Comecar Gratis"
4. Faz signup (email/senha)
5. Redirecionado ao dashboard
6. Pode usar 3x/dia cada ferramenta gratuitamente
7. Ao atingir limite, ve modal de upgrade

### Flow 2: Usar Ferramenta (AI Detector como exemplo)

1. Usuario logado acessa Dashboard
2. Clica em "AI Detector" no menu lateral
3. Cola texto no campo de input (ou faz upload de arquivo .txt/.docx/.pdf)
4. Clica "Analisar"
5. Sistema envia texto para LLM com prompt especializado
6. Recebe score de probabilidade (0-100%) com breakdown
7. Ve seccoes destacadas com indicacao de "provavelmente IA"
8. Pode clicar "Humanizar" para enviar direto ao Humanizer
9. Resultado salvo no historico

### Flow 3: Upgrade para Pro

1. Usuario atinge limite diario OU clica em "Upgrade"
2. Ve pagina de pricing com 3 opcoes (Free/Mensal/Anual)
3. Seleciona plano
4. Redirecionado ao Stripe Checkout
5. Completa pagamento
6. Webhook atualiza tier no Supabase
7. Redirecionado ao dashboard com acesso completo

### Flow 4: AI Chat com Documento

1. Usuario acessa "AI Chat"
2. Faz upload de PDF/DOCX/TXT
3. Sistema extrai texto do documento
4. Usuario faz perguntas sobre o documento
5. IA responde com contexto do documento
6. Conversa salva no historico

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|------------|
| RF01 | AI Detector: Recebe texto, retorna score 0-100% com breakdown por seccao | P0 |
| RF02 | Plagiarism Checker: Recebe texto, compara com fontes, retorna % similaridade | P0 |
| RF03 | Humanizer: Recebe texto AI, reescreve em 3 modos (light/auto/bypass) | P0 |
| RF04 | Paraphraser: Reescreve com 6 tons e 3 intensidades | P0 |
| RF05 | Grammar Checker: Identifica e corrige erros, sugere melhorias | P0 |
| RF06 | Summarizer: Resume texto com controle de tamanho (curto/medio/longo) | P0 |
| RF07 | AI Chat: Chat conversacional com upload de documentos (PDF/DOCX/TXT) | P0 |
| RF08 | Citation Generator: Gera citacoes em 4 formatos (APA/MLA/Chicago/Harvard) | P1 |
| RF09 | Auth: Login/signup por email + recuperacao de senha | P0 |
| RF10 | Stripe: Checkout com trial 7 dias, plano mensal e anual | P0 |
| RF11 | Usage Limits: Free 3 usos/dia/ferramenta, Pro ilimitado | P0 |
| RF12 | Historico: Ultimas 50 operacoes por usuario | P1 |
| RF13 | Dashboard: Painel com acesso a todas ferramentas + stats de uso | P0 |
| RF14 | Tema: Dark/Light mode (default dark, visual B&W Nutron) | P1 |
| RF15 | Landing Page: Hero + features + pricing + testimonials + CTA | P0 |
| RF16 | Multi-LLM: OpenAI GPT-4o primario + Claude fallback | P0 |
| RF17 | Streaming: Respostas da IA em streaming (token by token) | P1 |
| RF18 | File Upload: Suporte a .pdf, .docx, .txt (max 10MB) | P1 |

---

## Requisitos Nao-Funcionais

| ID | Requisito |
|----|-----------|
| RNF01 | Tempo de resposta da IA < 10s para textos ate 2000 chars |
| RNF02 | Landing page Lighthouse > 90 |
| RNF03 | Mobile responsivo (breakpoints: mobile/tablet/desktop) |
| RNF04 | SEO basico (meta tags, OG tags, sitemap) |
| RNF05 | HTTPS obrigatorio |
| RNF06 | Rate limiting: max 60 requests/min por usuario |
| RNF07 | Dados do usuario nunca usados para treinar modelos |
| RNF08 | Suporte a Portugues e Ingles na interface |

---

## Metricas de Sucesso

1. **Funcional:** Todas 8 ferramentas funcionando end-to-end
2. **Performance:** P95 response time < 8s
3. **Conversao:** Fluxo completo visitante -> signup -> uso -> upgrade
4. **Uptime:** 99% nos primeiros 30 dias
5. **UX:** Tempo medio para completar uma tarefa < 30s (excluindo tempo IA)

---

## Riscos Identificados

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|--------------|---------|-----------|
| Escopo muito ambicioso para 2 dias | Alta | Alto | Cada ferramenta = 1 prompt wrapper. Sem ML custom. |
| Custo de API LLM alto | Media | Medio | Usage limits + cache de respostas similares |
| Plagiarism checker precisa de DB externa | Alta | Alto | Usar API externa (Copyleaks) ou simular com LLM |
| File upload (PDF/DOCX) complexo | Media | Medio | Usar libs: pdf-parse, mammoth |
| Stripe webhook em dev | Baixa | Baixo | Stripe CLI para testes locais |
| Multi-provider LLM complexity | Media | Medio | Abstraction layer simples com try/catch fallback |

---

## Modelo de Dados (Simplificado)

### users
- id (uuid, PK)
- email (text, unique)
- name (text)
- tier (enum: free/pro/annual)
- stripe_customer_id (text, nullable)
- trial_ends_at (timestamp, nullable)
- created_at (timestamp)

### usage_logs
- id (uuid, PK)
- user_id (uuid, FK -> users)
- tool (enum: detector/plagiarism/humanizer/paraphraser/grammar/summarizer/chat/citation)
- input_text (text)
- output_text (text)
- tokens_used (int)
- provider (enum: openai/anthropic)
- created_at (timestamp)

### conversations (para AI Chat)
- id (uuid, PK)
- user_id (uuid, FK -> users)
- title (text)
- created_at (timestamp)

### messages
- id (uuid, PK)
- conversation_id (uuid, FK -> conversations)
- role (enum: user/assistant)
- content (text)
- file_name (text, nullable)
- created_at (timestamp)

### subscriptions
- id (uuid, PK)
- user_id (uuid, FK -> users)
- stripe_subscription_id (text)
- plan (enum: monthly/annual)
- status (enum: active/canceled/past_due)
- current_period_end (timestamp)
- created_at (timestamp)

---

*Spec gerada por @visionary (Iris) em 2026-02-07*
*Pendente review por @critic*
