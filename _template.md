# SPEC Template — `<id>`

> Substitua tudo entre `<…>` ao gerar uma nova spec.

## Identificação

- **ID:** `<id>`
- **Nome:** `<nome curto>`
- **Contexto:** `varejista` | `fornecedor`
- **URL:** `<rota-do-protótipo>`
- **Largura:** 1280px
- **Persona:** `<quem usa esta tela>`
- **Quando aparece:** `<gatilho que leva o usuário aqui>`
- **Wireframe:** `./<id>.png`

## Objetivo

Uma frase curta. O que o usuário precisa conseguir fazer aqui?

## Estrutura da tela

Lista numerada de cima para baixo, esquerda para direita. Cada item tem:

| # | Elemento | Componente do DS | Estado default | Observações |
|---|---|---|---|---|
| 1 | … | … | … | … |

## Estados obrigatórios

- [ ] **Default** — descreva
- [ ] **Loading** — descreva (ou marcar N/A)
- [ ] **Vazio** — descreva (ou marcar N/A)
- [ ] **Erro** — descreva (ou marcar N/A)

## Interações

| Gatilho | Comportamento | Vai para |
|---|---|---|
| Clique em `<elemento>` | `<o que acontece>` | `<id da próxima tela ou "—">` |

## Validações

| Campo | Regra | Mensagem (ver COPY.md) |
|---|---|---|

## Fora do escopo desta tela

Liste o que **não** deve ser implementado, para evitar criatividade indesejada:

- …

## Perguntas em aberto

Decisões que ainda precisam de validação:

- [ ] …

## Checklist de aderência

- [ ] Estrutura bate com o PNG (sem elementos extras)
- [ ] Todos os estados acima estão implementados
- [ ] Copy bate exatamente com `COPY.md`
- [ ] Sem cores/medidas fora de `tokens.css`
- [ ] Componentes vêm de `components.html`
- [ ] Interações listadas funcionam
- [ ] Navegação para próxima tela respeita `FLOWS.md`
