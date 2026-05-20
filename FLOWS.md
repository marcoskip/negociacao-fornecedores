# FLOWS.md — Navegação entre telas

Grafo de navegação. Cada transição lista a tela de origem, a ação do usuário, e a tela de destino.

---

## Fluxo 0 — Onboarding do Fornecedor

```
[Varejista logado]
   │
   ▼
0.1 Gestão de Fornecedores
   │ clica "Convidar fornecedor"
   ▼
0.2 Formulário de Convite
   │ preenche + clica "Enviar convite"
   ▼ (volta para 0.1 com toast "Convite enviado")
   │
   │   ─── E-mail enviado ao fornecedor ───
   │
   ▼ (fornecedor clica no link do e-mail)
0.3 Aceite do Convite
   │ clica "Aceitar e criar conta"
   │
   ├── e-mail novo no IPA ──▶ 0.4 Criação de Conta
   │                              │ cria senha + aceita termos
   │                              ▼
   │                          0.4.5 Menu de Produtos
   │                              │ seleciona "Negociação"
   │                              ▼
   │                          A.6.empty Painel (primeiro acesso)
   │
   ├── e-mail já existe no IPA ──▶ 0.4.6 Vincular papel
   │                                   │ "Vincular e acessar"
   │                                   ▼
   │                               (vai para 0.4.7 ou direto ao painel)
   │
   └── fornecedor já é cliente IPA ──▶ 0.4.7 Aceite com 2FA
                                          │ confirma código
                                          ▼
                                       A.6.1 Painel (já populado)
```

**Pontos de decisão:**
- `0.3 → 0.4 vs 0.4.6 vs 0.4.7` depende do estado da conta no IPA. Backend decide; UI só mostra a tela correta.
- `0.4.5` é o **switcher** do produto. Default pós-login é InfoPanel; usuário troca para "Negociação".

---

## Fluxo A — Fornecedor inicia

```
A.6.empty Painel vazio (primeiro acesso)
   │ clica "Enviar nova tabela"
   ▼
A.7 Nova Tabela — Upload
   │
   ├── upload de arquivo ──▶ continua em A.7
   └── clica "Inserir manualmente" ──▶ A.7.manual

A.7 / A.7.manual
   │ clica "Revisar antes de enviar"
   ▼
A.8 Revisão e Envio
   │ clica "Enviar para varejista"
   ▼
A.8.5 Confirmação + preview do e-mail
   │ clica "Voltar ao painel"
   ▼
A.6.1 Painel (estado inicial, com nova tabela listada)

   ─── Do lado do varejista, simultaneamente ───

A.8.6 Triagem
   │
   ├── clica "Aceitar e iniciar negociação" ──▶ A.8.7 Negociação vigente
   ├── clica "Recusar" ──▶ tabela some da triagem, fornecedor é notificado
   └── clica "Pedir ajuste" ──▶ devolve para fornecedor com mensagem

A.8.7 Negociação vigente
   │ varejista preenche "Novo custo" + "Novo preço" e clica "Enviar contraproposta"
   ▼ (notificação ao fornecedor)
A.11 Resposta do Varejista (visão fornecedor)
   │ fornecedor responde (R3)
   ▼
A.10 Round 3 (visão varejista · diff view)
   │ varejista fecha negócio ou envia R4
   ▼ ciclo até status = "Acordo" ou "Recusado"

A.9 Negociações salvas (lista geral, acessível pelo menu lateral)
   │ qualquer linha leva para A.8.7

T.1 Tabelas enviadas (lista global do fornecedor)
   │ qualquer linha leva para a negociação correspondente
```

**Estados do painel A.6:**
- `A.6.empty` → fornecedor nunca enviou tabela
- `A.6.1` → estado inicial, sem filtros
- `A.6.2` → chip Status aberto (popover)
- `A.6.3` → filtros aplicados (contadores ativos)
- `A.6.4` → sem resultados após filtro (estado vazio de busca)
- `A.6.alt` → muitos varejistas vinculados (padrão de overflow no header)

---

## Fluxo B — Varejista inicia

```
[Tela existente do IPA: Negociação salva — rascunho]
   │ clica "Enviar para fornecedor"
   ▼
B.12 Confirmar Envio (modal)
   │ confirma destinatário + itens + clica "Confirmar envio"
   ▼
B.13 Preços-alvo (R1 rascunho)
   │ varejista define custos-alvo · clica "Enviar proposta"
   ▼ (notificação ao fornecedor)
B.14 Fornecedor recebe proposta (R1)
   │ fornecedor preenche "Seu novo custo" e clica "Enviar contraproposta"
   ▼
B.15 Contraproposta enviada (R2)
   │
   ▼ (notificação ao varejista)
B.16 Varejista recebe contraproposta (R3 · diff view)
   │ varejista fecha negócio ou envia R4
   ▼ ciclo até "Acordo" ou "Recusado"
```

---

## Pontos de entrada externos

Telas alcançadas via **e-mail** (link único):

| Tela | URL pattern | Quando |
|---|---|---|
| `0.3` | `ipa.app/convite/{token}` | varejista convidou |
| `0.4.7` | `ipa.app/convite/{token}` | varejista convidou fornecedor já cadastrado |
| `A.8.6` | `ipa.app/triagem/{id}` | fornecedor enviou tabela |
| `B.14` | `ipa.app/negociacoes/{id}` | varejista enviou proposta |
| `A.10` / `A.11` | `ipa.app/negociacoes/{id}` | contraparte respondeu |

Telas alcançadas via **menu lateral**:

| Sidebar (Varejista) | Tela ativa |
|---|---|
| Negociação fornecedores | dashboard de negociações ativas |
| Negociações salvas | `A.9` |
| Fornecedores | `0.1` |

| Sidebar (Fornecedor) | Tela ativa |
|---|---|
| Início | `A.6.1` |
| Tabelas | `T.1` |

---

## Toasts e notificações

Mensagens flash que aparecem em transições. Copy completo em `COPY.md`.

| Origem → Destino | Toast |
|---|---|
| 0.2 → 0.1 | "Convite enviado para {empresa}" |
| 0.2 (CNPJ inválido) | "CNPJ não encontrado. Verifique o número." |
| A.8 → A.8.5 | (sem toast, A.8.5 é a confirmação) |
| A.8.6 (aceitar) | "Negociação iniciada com {fornecedor}" |
| A.8.6 (recusar) | "Tabela recusada. {fornecedor} foi notificado." |
| B.12 → B.13 | "Proposta enviada para {fornecedor}" |
| Qualquer "Salvar rascunho" | "Rascunho salvo às HH:MM" |

---

## Regras de redirect pós-ação

- **Após enviar tabela** (A.8 → A.8.5): mostrar tela de confirmação por ~6s, depois redirecionar para A.6.1 com a tabela já listada no topo.
- **Após aceitar triagem** (A.8.6 → A.8.7): redirecionamento imediato, sem toast.
- **Após fechar acordo** (A.8.7 / A.10): mostrar modal "Acordo fechado" e redirecionar para A.9.
- **Após recusar negociação:** mostrar confirmação ("Tem certeza?"), fechar, redirecionar para A.9.
