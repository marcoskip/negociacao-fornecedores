# COPY.md — Banco de copy

Textos finais de todas as telas. **Use exatamente como está aqui** — não reescreva.

> Convenção: `{placeholder}` é variável dinâmica.

---

## Globais

### Header

| Elemento | Copy |
|---|---|
| Tooltip logo | "Início" |
| Menu do usuário | "Olá, {primeiro nome}" |
| Item menu — Configurações | "Configurações" |
| Item menu — Convidar | "Convidar pessoa" |
| Item menu — Base de conhecimento | "Base de conhecimento" |
| Item menu — Termos | "Termos de uso" |
| Item menu — Sair | "Sair" |

### Sidebar — Varejista

- Negociação fornecedores
- Negociações salvas
- Fornecedores

### Sidebar — Fornecedor

- Início
- Tabelas

### Status pill — Vínculo (entre empresas)

- "Ativo"
- "Convite pendente"
- "Inativo"

### Status pill — Negociação

- "Em análise"
- "Proposta enviada"
- "Em tratativa"
- "Acordo"
- "Fechado"
- "Recusado"

### Botões recorrentes

| Ação | Label |
|---|---|
| Confirmação primária | "Confirmar" |
| Cancelar | "Cancelar" |
| Voltar | "← Voltar" |
| Salvar rascunho | "Salvar rascunho" |
| Tentar novamente | "Tentar novamente" |
| Limpar filtros | "Limpar filtros" |
| Aplicar | "Aplicar" |

### Estados vazios genéricos

| Caso | Título | Subtítulo |
|---|---|---|
| Sem dados ainda | "Nada por aqui ainda" | "Quando houver atividade, aparece aqui." |
| Filtro sem resultado | "Nenhum resultado para os filtros" | "Tente ajustar ou {ação: limpar filtros}." |
| Erro de carregamento | "Não conseguimos carregar" | "Verifique sua conexão e tente novamente." |

---

## Tela 0.1 — Gestão de Fornecedores

| Elemento | Copy |
|---|---|
| Título | "Fornecedores" |
| Subtítulo dinâmico | "{n} fornecedores · {ativos} ativos · {pendentes} convites pendentes" |
| CTA primário | "Convidar fornecedor" |
| Busca placeholder | "Buscar por nome ou CNPJ..." |
| Filtro Status | "Status: Todos ▾" |
| Filtro Última negociação | "Última negociação ▾" |
| Cols tabela | EMPRESA · CNPJ · REPRESENTANTE · STATUS · NEGOCIAÇÕES · ÚLTIMA ATIV. · AÇÕES |
| Menu ⋯ (ativo) | "Ver negociações" · "Editar contato" · "Inativar vínculo" |
| Menu ⋯ (convite pendente) | "Reenviar convite" · "Copiar link" · "Cancelar convite" |
| Menu ⋯ (inativo) | "Reativar vínculo" · "Remover" |

---

## Tela 0.2 — Formulário de Convite

| Elemento | Copy |
|---|---|
| Breadcrumb | "← Fornecedores" |
| Título | "Convidar fornecedor" |
| Subtítulo | "Um e-mail será enviado ao representante com um link para criar a conta. O vínculo com o {varejista} será criado automaticamente." |
| Seção 1 (label mono) | "DADOS DA EMPRESA" |
| Campo Nome | label "Nome da empresa" · placeholder "Ex: Unilever Brasil Ltda." · obrigatório |
| Campo CNPJ | label "CNPJ" · placeholder "00.000.000/0000-00" · obrigatório |
| Campo Razão social | label "Razão social" · placeholder "(opcional)" |
| Seção 2 (label mono) | "REPRESENTANTE COMERCIAL" |
| Campo Nome rep | label "Nome do representante" · placeholder "Nome completo" · obrigatório |
| Campo E-mail | label "E-mail" · placeholder "nome@empresa.com.br" · obrigatório |
| Campo Telefone | label "Telefone" · placeholder "(11) 99999-9999" |
| Seção 3 (label mono) | "COMPRADORES RESPONSÁVEIS (do seu lado) *" |
| Subtítulo seção 3 | "Quem recebe notificação quando esse fornecedor enviar uma proposta. Pelo menos 1." |
| Busca compradores | "Buscar comprador já cadastrado por nome ou e-mail…" |
| Botão adicionar | "+ adicionar comprador" |
| Checkbox notificar | "Notificar compradores responsáveis por e-mail" |
| Bloco post-it | "Mensagem do convite (opcional, aparece no e-mail):" · placeholder "Ex: \"Olá Ricardo, estamos centralizando as negociações no IPA...\"" |
| CTA primário | "Enviar convite" |
| CTA secundário | "Cancelar" |
| Toast sucesso | "Convite enviado para {empresa}" |
| Erro CNPJ | "CNPJ inválido. Verifique o número e tente novamente." |
| Erro e-mail | "E-mail inválido." |
| Erro comprador vazio | "Selecione pelo menos um comprador responsável." |

---

## Tela A.6 — Painel do Fornecedor (todos os estados)

| Elemento | Copy |
|---|---|
| Header do contexto | "Você está vendo: {varejista ativo}" |
| Linha "Acessados recentemente" | "ACESSADOS RECENTEMENTE" |
| Contagem total | "{n} varejistas vinculados" |
| Botão "Ver todos" | "Ver todos ({n})" |
| Título | "Negociações com {varejista ativo}" |
| CTA primário | "+ Nova tabela" |
| Busca | "Buscar por título ou SKU..." |
| Chip Status | "Status" (+ contador quando aplicado) |
| Chip Aguarda | "Aguarda" |
| Chip Última ação | "Última ação" |
| Botão limpar filtros | "Limpar filtros" |
| Header tabela | ID · NEGOCIAÇÃO · ITENS · STATUS · ROUND · ÚLTIMA AÇÃO · AGUARDA |
| Vazio (primeiro acesso) | "Você ainda não enviou nenhuma tabela para {varejista}" · "Envie uma tabela de preços para começar a negociar." · CTA "Enviar nova tabela" |
| Vazio (filtro sem resultado) | "Nenhuma negociação para os filtros aplicados" · CTA "Limpar filtros" |

---

## Padrões de copy

### Mensagens de validação

- Campo obrigatório vazio: "Este campo é obrigatório."
- Formato inválido: "Formato inválido. Exemplo: {exemplo}."
- Limite de caracteres: "Máximo de {n} caracteres."

### Datas relativas (último acesso, última atividade)

- "agora há pouco" — < 5 min
- "há {n} min" — < 1h
- "há {n}h" — < 24h
- "ontem" — 24–48h
- "há {n} dias" — < 7 dias
- "há {n} semana(s)" — < 30 dias
- "há {n} meses" — < 365 dias

### Datas absolutas

- Curtas: "01/07/2023"
- Longas: "01 de julho de 2023, 13:42"

### Plurais

Sempre incluir os dois: "1 fornecedor", "5 fornecedores". Nunca abreviar como "1+ fornecedor(es)".

---

## A preencher (não usar até confirmado)

Os textos abaixo ainda estão como `[a definir]` — pergunte antes de gerar essas telas:

- Mensagens completas de e-mail transacional (assunto, corpo, rodapé)
- Mensagens de erro de upload de tabela (formato inválido, SKU não encontrado, etc.)
- Textos do termo de uso na criação de conta
- Mensagem do modal "Acordo fechado"
- Textos dos toasts B.* e A.10 / A.11
