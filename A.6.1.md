# SPEC A.6.1 — Painel do Fornecedor (estado inicial)

## Identificação

- **ID:** `A.6.1`
- **Nome:** Painel do Fornecedor — sem filtros aplicados
- **Contexto:** `fornecedor`
- **URL:** `ipa.app/app`
- **Largura:** 1280px
- **Persona:** Representante comercial de um fornecedor (Patrícia Moura, Unilever Brasil)
- **Quando aparece:** Pós-login no produto "Negociação" do IPA. Tela inicial do menu "Início".
- **Wireframe:** `./A.6.1.png`

## Objetivo

Ver e gerir todas as negociações em curso com **um varejista de cada vez**, com troca rápida entre varejistas vinculados. Iniciar nova tabela é o caminho mais proeminente.

## Estrutura da tela (de cima pra baixo)

### Bloco 1 — Header de contexto (varejista ativo)

Bloco fixo no topo, dentro do app (não confundir com header global IPA).

**Linha 1:**
- Label mono "VAREJISTA ATIVO" (à esquerda)
- Combobox com nome do varejista ativo + chevron (centro-esquerda)
- Contagem total "{n} varejistas vinculados" à direita

**Linha 2 — Acessados recentemente:**
- Label mono "ACESSADOS RECENTEMENTE"
- Chips horizontais (até 6 visíveis), cada chip = um varejista
  - Sigla (2 letras) em quadrado + nome curto + badge numérico de pendências (se > 0)
- Botão "Ver todos ({n})" se > 6 varejistas → abre 0.4.5 / `A.6.alt`

### Bloco 2 — Cabeçalho da página

**Esquerda:**
- Título "Negociações com {varejista ativo}" (h2)
- Subtítulo: "{n} ativas · {n} aguardando você · {n} aguardando varejista"

**Direita:**
- CTA primário "+ Nova tabela" → leva a `A.7`

### Bloco 3 — Barra de filtros + busca (Opção A do layout)

**Linha única:**
- Campo de busca (esquerda, flex) — placeholder "Buscar por título ou SKU..."
- Chips de filtro (centro): `Status` · `Aguarda` · `Última ação`
- Botão "Limpar filtros" (direita, só visível se algum filtro está ativo)

**Chips de filtro:**
- Cada chip mostra: label + contador `(n)` se há seleção + chevron
- Clique no chip → abre popover com checkboxes + busca interna (quando aplicável)
- Clique fora do popover → fecha
- Apenas um popover aberto por vez

### Bloco 4 — Tabela de negociações

| Col | Header | Sortable | Conteúdo |
|---|---|---|---|
| 1 | ID | não | "#NG-XXXX" (fonte mono) |
| 2 | NEGOCIAÇÃO | não | Título da tabela (negrito) |
| 3 | ITENS | sim | Inteiro (mono) |
| 4 | STATUS | sim | Status pill |
| 5 | ROUND | sim | "#1", "#2", ... (mono) — round atual da negociação |
| 6 | ÚLTIMA AÇÃO | sim | Data relativa (small) |
| 7 | AGUARDA | sim | "▶ Varejista" ou "◀ Você" (com seta direcional) |
| — | (sem coluna de ações) | — | Clique na linha leva à negociação |

Sort cycle: inativo (⇅) → desc (↓) → asc (↑) → inativo. Uma coluna ativa por vez. Default: sem sort (ordem natural — mais recente primeiro).

### Bloco 5 — Paginação (rodapé da tabela)

- "{x}–{y} de {n}"
- Botões ‹ › para navegar
- Dropdown "20 por página ▾" (default 20)

## Dados de exemplo

Header do contexto:
- Varejista ativo: **Supermercado Estrela**
- Total: **3 varejistas vinculados**
- Acessados recentemente: Estrela (1 pendência) · Carrefour · Pão de Açúcar

Tabela (4 linhas — espelhar wireframe):

| ID | Negociação | Itens | Status | Round | Última ação | Aguarda |
|---|---|---|---|---|---|---|
| #NG-2041 | Tabela Q2 — Higiene & Beleza | 24 | Em tratativa | #3 | hoje, 14:32 | ▶ Varejista |
| #NG-2038 | Proposta — Linha OMO | 8 | Proposta enviada | #1 | ontem | ▶ Varejista |
| #NG-2034 | Reajuste trimestral — Knorr | 12 | Acordo | #2 | há 3 dias | ◀ Você |
| #NG-2029 | Tabela — Sorvetes Kibon | 6 | Fechado | #4 | há 1 semana | — |

## Estados obrigatórios

- [x] **Default** — header + filtros vazios + 5 linhas de exemplo
- [x] **Loading** — skeleton de 5 linhas
- [x] **Vazio (primeiro acesso)** — ver `A.6.empty.md`
- [x] **Filtro sem resultado** — ver `A.6.4.md`
- [x] **Muitos varejistas** — ver `A.6.alt.md`
- [x] **Erro** — banner topo "Não conseguimos carregar" + botão "Tentar novamente"

## Interações

| Gatilho | Comportamento | Vai para |
|---|---|---|
| Combobox de varejista | Abre lista completa de varejistas vinculados | — |
| Selecionar varejista no combo | Troca o contexto; tabela recarrega | — (mesma tela) |
| Chip de varejista (linha 2) | Mesmo efeito do combobox | — |
| "Ver todos" | Abre overlay com todos os varejistas | `A.6.alt` |
| Badge de pendência no chip | Mesmo clique do chip | — |
| "+ Nova tabela" | Navega | `A.7` |
| Digitar na busca | Filtra in-place (debounce 200ms) | — |
| Clique em chip Status | Abre popover com checkboxes: Em análise, Proposta enviada, Em tratativa, Acordo, Fechado | (estado A.6.2) |
| Clique em chip Aguarda | Popover com: Você · Varejista | — |
| Clique em chip Última ação | Popover com radios: Hoje · Últimos 7d · Últimos 30d · Últimos 90d · Qualquer | — |
| Aplicar filtro | Fecha popover, atualiza tabela, atualiza contador no chip | (estado A.6.3) |
| "Limpar filtros" | Remove todos filtros, fecha popovers | — |
| Clique em linha | Abre negociação | `A.8.7` (se varejista vê) / `A.11` (se fornecedor vê) — neste painel sempre A.8.7 do ponto de vista do varejista, A.11 do ponto de vista do fornecedor. **Confirmar com user.** |
| Header de coluna ordenável | Cicla sort | — |
| Paginação | Navega entre páginas | — |

## Validações

Read-only + filtros. Sem validações de dado.

## Fora do escopo desta tela

- Edição inline de qualquer campo
- Drag-and-drop para reordenar
- Exportar
- Bulk actions
- Detalhe da negociação inline (drawer) — abrir leva a tela cheia
- Notificações in-app (sino) — outra tela
- Configurações do produto Negociação

## Perguntas em aberto

- [ ] Clique em linha leva sempre para a mesma tela (A.8.7) ou depende de quem iniciou (A.11 vs A.8.7)?
- [ ] Badge de pendência no chip de varejista: o que conta como pendência? Aguardando você? Aguardando você + atrasada?
- [ ] Trocar de varejista preserva busca/filtros ou limpa?
- [ ] Quando varejista é selecionado, o subtítulo "n ativas · …" usa o total da empresa ou só do varejista atual?
- [ ] Limite de chips na "linha 2" (acessados recentemente): 6 fixo ou responsivo à largura?

## Variantes referenciadas

| Estado | SPEC |
|---|---|
| Chip Status aberto | `A.6.2.md` |
| Filtros aplicados (contadores) | `A.6.3.md` |
| Sem resultados de filtro | `A.6.4.md` |
| Muitos varejistas | `A.6.alt.md` |
| Primeiro acesso (vazio) | `A.6.empty.md` |

## Checklist de aderência

- [ ] Header de contexto (varejista ativo) implementado, com chips de acesso recente
- [ ] Layout em duas linhas: linha 1 (busca + chips + limpar), tabela abaixo
- [ ] Sort cycle de 3 cliques nas colunas marcadas como sortable
- [ ] Chips de filtro com contador + chevron, popovers com checkbox + busca
- [ ] CTA "+ Nova tabela" leva a `A.7`
- [ ] 5 estados implementados
- [ ] Copy exata do COPY.md
- [ ] Sem cores/medidas fora de tokens.css
- [ ] Linhas da tabela são clicáveis (cursor pointer no hover)
