# REVIEW: AI Writing Suite

**Data:** 2026-02-07
**Reviewer:** @critic (Cato)

---

## Checklist de Critica

### Clareza
- [x] Proposito claro: **SIM** - "Plataforma SaaS all-in-one de escrita com IA" e claro em 5 segundos
- [x] MVP definido: **PARCIAL** - Scope definido, mas 8 ferramentas + Stripe + Auth + Chat + File Upload e muito para "MVP". A palavra "minimo" perdeu o significado
- [x] Requisitos testaveis: **SIM** - Cada RF tem input/output definido

### Viabilidade
- [x] Implementavel em 2 dias: **NAO** - Timeline de 17h ja excede 16h e NAO inclui: debugging, prompts tuning, Supabase RLS, Edge Function deploys, testes manuais. Estimativa realista: 24-30h
- [x] Dependencias confiaveis: **PARCIAL** - Supabase Edge Functions com streaming (SSE) tem historico de problemas. pdf-parse/mammoth em Deno (edge functions) pode ter incompatibilidades
- [x] Stack adequado: **SIM** - Stack consistente com Nutron, familiar ao dev

### Completude
- [x] Fluxos mapeados: **SIM** - 4 fluxos core documentados
- [x] Edge cases: **NAO** - Faltam: texto vazio, texto muito longo (>10k chars), timeout de LLM, falha simultanea de ambos providers, usuario sem internet durante streaming, upload de arquivo corrompido
- [x] APIs identificadas: **PARCIAL** - OpenAI e Anthropic sim, mas falta definir: qual modelo exato do Claude? Qual pricing tier? Streaming via Edge Functions funciona com Supabase free tier?

### Simplicidade
- [x] MVP minimo: **NAO** - 8 ferramentas NAO e minimo. Ver Problema 1
- [x] Arquitetura simples: **SIM** - Pattern de prompt wrapper e elegante e simples
- [x] Sem over-engineering: **PARCIAL** - Multi-provider LLM com fallback e over-engineering para MVP. Comece com 1 provider

---

## Problemas Encontrados

### Problema 1: Escopo absurdamente grande para 2 dias
- **Severidade:** CRITICAL
- **Descricao:** 8 ferramentas + landing page + auth + Stripe + file upload + streaming + historico + multi-provider LLM = 17h estimadas (ja acima de 16h) SEM contar debugging, prompt engineering iterativo, deploy issues e testes. Isso vai estourar para 25-30h facilmente.
- **Sugestao:** Cortar para 4 ferramentas core no MVP:
  - MANTER: AI Detector, Humanizer, Paraphraser, Grammar Checker (o loop principal: detectar -> humanizar -> parafrasear -> corrigir)
  - CORTAR do MVP: Plagiarism Checker (falso sem DB real), Summarizer, Citation Generator, AI Chat com upload
  - Adicionar as cortadas como "Coming Soon" no dashboard

### Problema 2: Plagiarism Checker e uma mentira sem API externa
- **Severidade:** HIGH
- **Descricao:** ADR-006 decide usar LLM para "detectar plagio". Um LLM NAO pode verificar plagio - ele nao tem acesso a base de dados de textos publicados. Vai gerar respostas inventadas (hallucination). Isso e enganar o usuario.
- **Sugestao:** Duas opcoes:
  - A) Remover do MVP (recomendado) e adicionar depois com Copyleaks API
  - B) Renomear para "Originality Analyzer" e deixar claro que e uma analise heuristica, NAO uma verificacao factual contra fontes

### Problema 3: Streaming via Supabase Edge Functions e fragil
- **Severidade:** HIGH
- **Descricao:** Supabase Edge Functions (Deno Deploy) suportam streaming, MAS: (1) timeout padrao e 60s no free tier, (2) cold starts de 2-5s, (3) nao ha garantia de conexao estavel para SSE. GPT-4o com textos longos pode levar >60s.
- **Sugestao:** Para MVP, nao usar streaming. Usar request/response simples com loading spinner. Streaming e P1, nao P0. Se insistir em streaming, usar Vercel API Routes ao inves de Supabase Edge Functions.

### Problema 4: File Upload (PDF/DOCX) no Deno e incerto
- **Severidade:** MEDIUM
- **Descricao:** `pdf-parse` e uma lib Node.js que depende de `fs` e `Buffer`. Supabase Edge Functions rodam Deno, que tem API diferente. `mammoth` tambem tem dependencias Node-specific. Pode nao funcionar sem adaptacoes significativas.
- **Sugestao:** Duas opcoes:
  - A) Suportar apenas .txt no MVP (copy-paste e o fluxo principal mesmo)
  - B) Usar uma API externa de parsing (ex: Unstructured.io API) ou Vercel serverless function (Node.js) so para parsing

### Problema 5: Modelo de dados duplica informacao de subscription
- **Severidade:** MEDIUM
- **Descricao:** Tabela `users.tier` e tabela `subscriptions.status` podem divergir. Se o webhook falhar ou atrasar, usuario paga mas nao tem acesso, ou cancela mas mantem acesso.
- **Sugestao:** Usar APENAS `subscriptions` como source of truth. Derivar o tier em runtime: `tier = subscriptions.where(status='active').plan || 'free'`. Remover `users.tier`.

### Problema 6: RNF08 (i18n PT/EN) e scope creep silencioso
- **Severidade:** MEDIUM
- **Descricao:** "Suporte a Portugues e Ingles na interface" nao foi dimensionado na timeline. i18n requer: (1) lib de traducao (react-intl ou i18next), (2) arquivos de traducao para cada string, (3) seletor de idioma, (4) testes em ambos idiomas. Facilmente +4h.
- **Sugestao:** MVP em Ingles APENAS. Portugues e post-launch. A grande maioria dos SaaS de escrita com IA opera em ingles.

### Problema 7: Falta error handling no fluxo de dados
- **Severidade:** MEDIUM
- **Descricao:** O fluxo de dados (architecture.md) e happy path puro. Nao menciona: o que acontece se LLM retorna JSON invalido? Se timeout? Se token limit excedido? Se usuario envia texto em idioma nao suportado?
- **Sugestao:** Adicionar ao ToolLayout um estado de erro padronizado: `{ error: true, message: string, retryable: boolean }`. Edge function deve ter try/catch com mensagens amigaveis.

---

## Riscos para o Forge

| Risco | Prob. | Impacto | Mitigacao Durante Forge |
|-------|-------|---------|-------------------------|
| Timeline estoura (>16h) | Alta | Alto | Cortar para 4 ferramentas. Se sobrar tempo, adicionar mais |
| Prompt engineering demora mais que esperado | Alta | Medio | Comecar com prompts simples. Iterar depois. "Done > perfect" |
| Edge Function timeout/cold start | Media | Alto | Testar cedo. Se falhar, migrar para Vercel API Routes |
| pdf-parse incompativel com Deno | Media | Medio | Aceitar apenas .txt no MVP. PDF e v1.1 |
| Stripe webhook nao funciona local | Baixa | Medio | Usar Stripe CLI + ngrok. Testar cedo no dia 1 |
| LLM retorna formato inesperado | Media | Medio | Usar structured outputs (JSON mode) do GPT-4o |
| Custo de API dispara em teste | Baixa | Baixo | Usar GPT-4o-mini para desenvolvimento, GPT-4o so em prod |

---

## Recomendacoes Finais do @critic

### O que CORTAR do MVP (economia de ~8h):
1. ~~Plagiarism Checker~~ -> "Coming Soon" (salva 1.5h + evita feature enganosa)
2. ~~Summarizer~~ -> "Coming Soon" (salva 0.5h)
3. ~~Citation Generator~~ -> "Coming Soon" (salva 0.5h)
4. ~~AI Chat com upload~~ -> "Coming Soon" (salva 2h - chat e fluxo totalmente diferente)
5. ~~Streaming~~ -> Loading spinner no MVP (salva 1.5h)
6. ~~File Upload~~ -> Apenas copy-paste (salva 1h)
7. ~~i18n PT/EN~~ -> Ingles apenas (salva 1h)

### O que MANTER no MVP (core loop):
1. Landing Page (B&W Nutron style)
2. Auth (Supabase email/password)
3. Dashboard com 4+4 ferramentas (4 ativas + 4 "Coming Soon")
4. AI Detector -> Humanizer -> Paraphraser -> Grammar Checker (loop completo)
5. Stripe Checkout (trial + monthly + annual)
6. Usage Limits (3/dia free, ilimitado pro)
7. Dark/Light mode

### Timeline Revisada (4 ferramentas, sem streaming/upload):

| Fase | Horas | Entrega |
|------|-------|---------|
| Setup (Vite + Supabase + Tailwind + Nutron tokens) | 1.5h | Projeto rodando com design system |
| Landing Page (6 sections) | 2h | Pagina publica completa |
| Auth (login/signup/forgot) | 1h | Autenticacao funcional |
| Dashboard + DashboardLayout + Sidebar | 1.5h | Area logada com navegacao |
| ToolLayout + TextInput + ResultPanel (shared) | 1.5h | Componentes reutilizaveis |
| AI Detector (prompt + page) | 0.75h | Ferramenta funcionando |
| Humanizer (prompt + page + 3 modos) | 0.75h | Ferramenta funcionando |
| Paraphraser (prompt + page + tons + intensidade) | 0.75h | Ferramenta funcionando |
| Grammar Checker (prompt + page) | 0.75h | Ferramenta funcionando |
| 4x "Coming Soon" cards no dashboard | 0.25h | Placeholder para futuras |
| Supabase Edge Function (process-tool) | 1.5h | Backend funcional |
| Stripe Checkout + Webhook | 1.5h | Pagamento funcional |
| Usage Limits | 0.75h | Limites funcionando |
| Deploy (Vercel + Supabase) | 0.75h | Em producao |
| Buffer para debug/polish | 1h | Margem de seguranca |
| **TOTAL** | **16.25h** | **MVP Entregavel** |

---

## Decisao

- [x] **APROVADO** - Pronto para forge (decisao humana: manter todas 8 ferramentas, aceitar risco de timeline estendida)

---

*Review gerada por @critic (Cato) em 2026-02-07*
*Aguardando decisao humana*
