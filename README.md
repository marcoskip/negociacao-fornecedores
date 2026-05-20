# Briefing — Negociação com Fornecedor

Pacote de handoff para prototipagem no Claude Code com o design system IPA.

> **Origem:** Wireframes V2 (UX) · maio/2026
> **Stack alvo:** HTML + CSS + JS puro, tokens do DS, sem libs externas
> **Largura padrão:** 1280px (desktop)

---

## Como usar

1. Leia o **`CLAUDE.md`** — são as regras invioláveis. Coloque no root do repo do Claude Code.
2. Antes de cada tela, leia (nessa ordem):
   - `FLOWS.md` — onde a tela se encaixa no fluxo geral
   - `COPY.md` — textos finais
   - `<id-da-tela>.md` + `<id-da-tela>.png` — spec funcional + wireframe
3. Gere uma tela por prompt. **Nunca o fluxo inteiro de uma vez.**
4. Use o checklist no final de cada SPEC antes de marcar a tela como pronta.

---

## Índice de telas

### Fluxo 0 — Onboarding do Fornecedor
Varejista cadastra, convida e fornecedor cria conta. Pré-requisito de todos os outros fluxos.

| ID | Tela | Contexto |
|---|---|---|
| `0.1` | Gestão de Fornecedores | Varejista |
| `0.2` | Formulário de Convite | Varejista |
| `0.3` | Aceite do Convite (e-mail) | Fornecedor |
| `0.4` | Criação de Conta | Fornecedor |
| `0.4.5` | Menu de Produtos (switch InfoPanel ↔ Negociação) | Fornecedor |
| `0.4.6` | Aceite — E-mail já existe no IPA | Fornecedor |
| `0.4.7` | Aceite de Novo Vínculo (2FA) | Fornecedor |

### Fluxo A — Fornecedor inicia
Fornecedor envia tabela. Varejista revisa produto a produto e responde.

| ID | Tela | Contexto |
|---|---|---|
| `A.6.empty` | Painel — primeiro acesso (vazio) | Fornecedor |
| `A.6.1` | Painel — estado inicial | Fornecedor |
| `A.6.2` | Painel — chip Status aberto | Fornecedor |
| `A.6.3` | Painel — chips com filtros aplicados | Fornecedor |
| `A.6.4` | Painel — sem resultados (estado vazio de filtro) | Fornecedor |
| `A.6.alt` | Painel — muitos varejistas (overflow) | Fornecedor |
| `A.7` | Nova Tabela — Upload | Fornecedor |
| `A.7.manual` | Nova Tabela — Inserção Manual | Fornecedor |
| `A.8` | Revisão e Envio | Fornecedor |
| `A.8.5` | Confirmação + preview do e-mail | Fornecedor |
| `A.8.6` | Triagem de propostas recebidas | Varejista |
| `A.8.7` | Negociação vigente (pós-aceite) | Varejista |
| `A.9` | Negociações salvas (lista) | Varejista |
| `A.10` | Round 3 — Fornecedor respondeu | Varejista |
| `A.11` | Resposta do Varejista | Fornecedor |
| `T.1` | Tabelas Enviadas (menu lateral) | Fornecedor |

### Fluxo B — Varejista inicia
Varejista estrutura negociação no IPA e envia ao fornecedor. Rounds até fechar.

| ID | Tela | Contexto |
|---|---|---|
| `B.12` | Confirmar Envio ao Fornecedor (modal) | Varejista |
| `B.13` | Preços-alvo (R1 rascunho) | Varejista |
| `B.14` | Fornecedor recebe proposta (R1) | Fornecedor |
| `B.15` | Contraproposta (R2) | Fornecedor |
| `B.16` | Recebe contraproposta (R3 · diff view) | Varejista |

---

## Padrões compartilhados (presentes em várias telas)

Implemente uma vez e reuse — não duplique:

- **Sidebar varejista:** Negociação fornecedores · Negociações salvas · Fornecedores
- **Sidebar fornecedor:** Início · Tabelas
- **Header de contexto:** logo IPA + nome da empresa + menu do usuário
- **Status pill** (negociação): Em análise · Proposta enviada · Em tratativa · Acordo · Fechado · Recusado
- **Status pill** (vínculo): Ativo · Convite pendente · Inativo
- **Chip de filtro:** label + contador + chevron, abre popover com checkbox + busca
- **Header de coluna ordenável:** label + glyph (⇅ inativo · ↓ desc · ↑ asc), ciclo de 3 cliques
- **Linha de produto:** SKU + nome + preço atual · preço sugerido · variação % · status
- **Painel de histórico de rounds:** lateral direita, lista timeline com R1, R2, R3...

Veja `components.html` para markup de cada um.

---

## Padrão de estados por tela

Para qualquer tela com dados (lista, tabela, dashboard), implemente sempre:

1. **Default** — com dados de exemplo do SPEC
2. **Loading** — skeleton ou spinner, conforme componente do DS
3. **Vazio** — sem dados ainda (com call-to-action quando aplicável)
4. **Erro** — falha de carregamento (com botão "Tentar novamente")

Cada SPEC explicita quais desses são obrigatórios para aquela tela.

---

## Checklist de aderência (passar antes de marcar tela como pronta)

- [ ] Todos os elementos do PNG estão na tela
- [ ] Todos os elementos do SPEC estão implementados
- [ ] Estados listados (default, vazio, loading, erro) funcionam
- [ ] Copy é exatamente o do `COPY.md`
- [ ] Sem `#`, `rgb(`, `px` ou `font-size` fora de `tokens.css` no CSS gerado
- [ ] Componentes recorrentes vêm de `components.html` (sem duplicar markup)
- [ ] Contexto (varejista/fornecedor) está coerente com SPEC
- [ ] Navegação respeita o `FLOWS.md`
