# CLAUDE.md — Negociação com Fornecedor

Instruções persistentes deste briefing. Leia antes de gerar qualquer tela.

## Regras invioláveis

1. **Design System é a única fonte de tokens.** Cores, tipografia, espaçamento, sombras, radius e ícones vêm exclusivamente de `DSBridge/tokens.css` + `DSBridge/design-system.html`. Não invente valor, se faltar token, pare e pergunte.
2. **`DSBridge/design-system.html` é a referência de markup.** Antes de escrever HTML novo para um padrão recorrente (botão, dropdown, chip, status pill, tabela, modal), localize o componente equivalente e reproduza a estrutura.
3. **Copy é o que está em `COPY.md`.** Não reescreva títulos, labels, mensagens vazias, mensagens de erro ou textos de botão. Se faltar copy, pergunte.
4. **Wireframe é a fonte da estrutura.** O PNG anexado em cada SPEC define a hierarquia visual e a presença de elementos. Não adicione seções, KPIs, gráficos, ilustrações ou "melhorias" que não estejam no PNG.
5. **Dois contextos visuais distintos.** Toda tela tem `context: 'varejista' | 'fornecedor'` declarado no SPEC. Use as classes/tokens correspondentes — o header e a sidebar mudam entre os dois.
6. **Estados são parte do escopo.** Cada SPEC lista os estados obrigatórios (default, hover, vazio, loading, erro). Implemente todos. Não deixe estado faltando "para depois".
7. **Não invente comportamento.** Se uma interação não está descrita no SPEC, pare e pergunte. Não decida por conta própria o que um botão faz.

## Ordem de leitura por tela

1. `negociacao fornecedores/README.md` — índice e mapa do projeto
2. `negociacao fornecedores/FLOWS.md` — navegação entre telas
3. `negociacao fornecedores/COPY.md` — banco de copy
4. `negociacao fornecedores/<id>.md` (+ PNG do wireframe quando o user enviar) — spec + wireframe da tela alvo
5. `DSBridge/tokens.css` e `DSBridge/design-system.html` — DS (source of truth)

## Glossário

| Termo | Significado |
|---|---|
| **Varejista** | Cliente IPA tradicional. Inicia negociações ou recebe propostas. Contexto visual: graphite/cinza. |
| **Fornecedor** | Empresa convidada pelo varejista. Envia tabelas e contrapropostas. Contexto visual: azul claro. |
| **Vínculo** | Relação ativa entre um varejista e um fornecedor. Não confundir com "negociação". |
| **Tabela** | Lista de produtos com preços que o fornecedor envia a um varejista. Vira uma negociação ao ser aceita na triagem. |
| **Triagem** | Etapa em que o varejista decide se uma tabela recebida vira negociação oficial. |
| **Round** | Cada ida-e-volta de proposta/contraproposta dentro de uma negociação. R1 = primeira proposta. |
| **Custo-alvo** | Preço que o varejista quer pagar. Fornecedor responde com seu novo custo (contraproposta). |

## O que NÃO está no escopo desta fase

- Integração com APIs reais — usar dados fictícios já presentes nos SPECs.
- Login real, 2FA real — apenas a interface.
- Responsividade mobile — telas são desktop, largura 1280.
- Internacionalização — pt-BR fixo.
- Acessibilidade além do mínimo do DS — não adicionar ARIA inventado.

## Quando pedir ajuda em vez de assumir

- Token de DS não cobre o caso → parar, perguntar.
- Copy não está no `COPY.md` → parar, perguntar.
- Estado mencionado no SPEC mas sem mockup → parar, perguntar.
- Interação cruza para tela fora do `FLOWS.md` → parar, perguntar.
