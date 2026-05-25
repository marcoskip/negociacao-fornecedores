/*
  tutorial.js — Tour guiado do protótipo "Negociação com Fornecedor"
  Injeta um widget flutuante (bottom-left) em qualquer tela que inclua este script.
  Estado persistido em localStorage para atravessar a navegação entre HTMLs.

  Como incluir em uma tela:
    <script src="tutorial.js"></script>     // antes de </body>

  Atalhos:
    botão flutuante "Tutorial" sempre visível (bottom-left)
    "T" no teclado também alterna a visibilidade (quando não em input)
    ESC fecha o card mas mantém o tutorial ativo (re-abre pelo botão)
*/

(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════════════
  // STEPS — definição dos passos. screen é o arquivo HTML; title/body
  // o conteúdo. highlight é um seletor CSS opcional pra ringar um elemento.
  // ════════════════════════════════════════════════════════════════════
  const STEPS = [
    // ── A. Onboarding do fornecedor ──────────────────────
    {
      screen: '0.3.html',
      title: 'Email de convite ao fornecedor',
      body: 'Este é o e-mail que o fornecedor recebe quando o varejista o convida pra negociar no IPA. Note o padrão visual: card centralizado, header com logo InfoPrice, body em cinza claro. Clique em <b>ACEITAR E CRIAR CONTA</b> pra seguir o fluxo.',
    },
    {
      screen: '0.4.html',
      title: 'Criação de conta',
      body: 'Aqui o fornecedor cria sua senha. Há um <b>dev menu</b> com o atalho "Preencher formulário" pra acelerar a demo. Note que esta é uma variante — quando o e-mail já existe no IPA, o fluxo vai pra <b>0.4.6</b>; quando o fornecedor já é cliente IPA, vai pra <b>0.4.7</b> (com 2FA).',
      highlight: '[data-demo-only]',
    },
    // ── B. Painel do fornecedor ─────────────────────────
    {
      screen: 'A.6.empty.html',
      title: 'Painel do fornecedor (primeiro acesso)',
      body: 'Logo após criar conta, o fornecedor entra no painel vazio. O CTA principal é <b>Enviar nova tabela</b>. Clique nele pra abrir o modal de envio.',
      highlight: '#emptyCtaBtn',
    },
    {
      screen: 'A.6.empty.html',
      title: 'Modal "Nova tabela de preços"',
      body: 'Modal em 2 etapas. Etapa 1: nome, varejista destino, vigência, abrangência (lojas ou cluster) e produtos. Os produtos podem ser inseridos via <b>busca no catálogo</b>, <b>inseridos manualmente</b> ou via <b>upload CSV/XLSX</b>. Use o atalho "Preencher modal" no dev menu pra ver o modal preenchido.',
    },
    {
      screen: 'A.6.empty.html',
      title: 'Envio + salvar rascunho',
      body: 'O botão <b>Salvar rascunho</b> preserva o trabalho mesmo se o fornecedor sair. <b>Próximo → Enviar</b> dispara o email para o varejista. Click no fundo do modal NÃO fecha (decisão de UX — evita perda acidental).',
    },
    // ── C. Email recebido pelo varejista ────────────────
    {
      screen: '0.5.html',
      title: 'Email recebido pelo varejista',
      body: 'Esta é a notificação que o varejista recebe quando o fornecedor envia uma tabela. Inclui metadados (vigência, abrangência), preview dos produtos com custo proposto, e CTA para abrir a triagem. Mesma família visual dos outros emails.',
    },
    // ── D. Triagem (lado varejista) ─────────────────────
    {
      screen: 'A.8.6.html',
      title: 'Triagem de tabelas',
      body: 'Esta é a fila de tabelas pendentes do varejista. Cada linha é uma tabela enviada por um fornecedor aguardando decisão. As linhas <b>pendentes</b> ficam destacadas em laranja claro.',
    },
    {
      screen: 'A.8.6.html',
      title: 'Filtros e busca',
      body: 'Filtre por Fornecedor, Status (pendente/visualizada) e Recebida em. Use a barra de busca no topo pra pesquisar por título ou nome do fornecedor.',
      highlight: '.filtros',
    },
    {
      screen: 'A.8.6.html',
      title: 'Abrir tabela',
      body: 'Clique no <b>título de uma tabela</b> pra abrir o modal de preview. Você verá os produtos propostos e os 2 CTAs: <b>Aceitar e iniciar negociação</b> ou <b>Recusar tabela</b> (com confirmação).',
    },
    // ── E. Negociação vigente ───────────────────────────
    {
      screen: 'A.8.7.html',
      title: 'Negociação vigente — Round 2',
      body: 'Aceitar a tabela cria a negociação ativa. Cada linha é um produto: você vê <b>Custo atual</b>, <b>Proposta do fornecedor</b>, <b>Ideal de compra</b>, <b>Preço concorrente</b> (PMZ), e os campos editáveis <b>Novo custo</b> + <b>Novo preço</b>.',
    },
    {
      screen: 'A.8.7.html',
      title: 'Timeline + dev nav',
      body: 'A timeline acima do grid acumula o histórico de rounds. Use as <b>setas ← →</b> no dev menu pra simular o avanço da negociação. Clicar em rounds antigos mostra o snapshot histórico (linhas ficam translúcidas, indicando read-only).',
      highlight: '.a87-timeline, .dev-menu',
    },
    {
      screen: 'A.8.7.html',
      title: 'Status por item',
      body: 'Cada linha pode ter status <b>Aceitou</b> (BG verde claro), <b>Cancelado</b> (BG vermelho claro) ou em aberto. Mesmo com status decidido, a linha continua editável — o destaque é só visual.',
    },
    {
      screen: 'A.18.html',
      title: 'Rounds posteriores (R3+)',
      body: 'A partir do Round 3, aparecem mais colunas: <b>Sua proposta</b> e <b>Preço Concorrente</b>. O comportamento de timeline + status é o mesmo da A.8.7.',
    },
    // ── E2. Negociação vigente — VISÃO FORNECEDOR ────────
    {
      screen: 'A.11.html',
      title: 'Negociação vigente — visão fornecedor',
      body: 'Quando o varejista envia a contraproposta, o fornecedor vê esta tela espelho. <b>Schema enxuto</b>: oculta colunas sensíveis ao varejista (PMC, Preço Concor., Ideal compra, Margem obj., Indicador, Estoque). O fornecedor vê só o que faz sentido pro lado dele: <b>Meu custo</b> e <b>Minha margem</b> (privados dele), <b>Preço que enviei</b>, <b>Contraproposta varejista</b> (destacada em azul) e <b>Meu novo preço</b> pra responder.',
    },
    // ── F. Negociações salvas (varejista) ────────────────
    {
      screen: 'A.9.html',
      title: 'Negociações salvas',
      body: 'Lista geral de todas as negociações em andamento ou fechadas do varejista. Cada linha leva à negociação. A linha pode ter <b>Aguarda Você</b> (BG laranja claro) indicando que o varejista precisa agir.',
    },
    {
      screen: 'A.9.html',
      title: 'Filtros multi-select',
      body: 'Os filtros são multi-select com busca interna. Marque vários itens em <b>Produto</b>, <b>Loja</b>, <b>Cluster</b> etc. Quando 2+ estão marcados, o chip mostra contagem (N). Use o botão <b>Limpar Filtros</b> à direita pra resetar tudo.',
      highlight: '.filtros',
    },
    {
      screen: 'A.9.html',
      title: 'Badges de status',
      body: 'A coluna <b>Status</b> usa duas badges principais: <b>EM NEGOCIAÇÃO</b> (cinza, ícone de duas setas) e <b>NEGÓCIO FECHADO</b> (verde escuro, ícone do módulo). Aparecem em caixa alta, bold.',
    },
    {
      screen: 'A.9.html',
      title: 'Nova negociação iniciada pelo varejista',
      body: 'Clique em <b>NOVA NEGOCIAÇÃO</b> pra abrir o modal de criação. É o mesmo modal do fornecedor, mas no contexto varejista: o campo "Varejista" vira "Fornecedor", a coluna "Proposta preço" vira "Custo-alvo", e o CTA fica "Enviar ao fornecedor".',
      highlight: '#novaNegBtn',
    },
    // ── G. Gestão de fornecedores ───────────────────────
    {
      screen: '0.1.html',
      title: 'Gestão de Fornecedores',
      body: 'Tela inicial do contexto varejista. Lista todos os fornecedores vinculados, com status do convite. Ações da linha: <b>Reenviar convite</b>, <b>Cancelar convite</b>, <b>Inativar vínculo</b>, <b>Remover vínculo</b>. Todas as destrutivas pedem confirmação.',
    },
    {
      screen: '0.1.html',
      title: 'Sidebar do módulo',
      body: 'O grupo <b>Negociações Fornecedor</b> na sidebar é o ponto central. Subitens: <b>Triagem</b> (A.8.6), <b>Negociações salvas</b> (A.9), <b>Fornecedores</b> (0.1). A sidebar pode ser recolhida — quando recolhida, hover abre o pop-up flutuante com os mesmos subitens.',
      highlight: '.sidebar',
    },
    {
      screen: '__final__',
      title: 'Fim do tour 🎉',
      body: 'Você viu o fluxo end-to-end: <b>convite → criação de conta → envio de tabela → email pro varejista → triagem → negociação ativa (rounds) → fechamento ou nova negociação iniciada pelo varejista</b>.<br/><br/>O tutorial ficou disponível pelo botão <b>Tutorial</b> no canto inferior esquerdo de cada tela. Clique em <b>Encerrar</b> pra resetar, ou navegue livre.',
    },
  ];

  // ════════════════════════════════════════════════════════════════════
  // Storage
  // ════════════════════════════════════════════════════════════════════
  const KEY = 'ipa_tutorial';
  function getState() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch (e) { return null; }
  }
  function setState(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }
  function clearState() {
    localStorage.removeItem(KEY);
  }
  function currentScreen() {
    const p = location.pathname.split('/').pop();
    return decodeURIComponent(p || '').toLowerCase();
  }

  // ════════════════════════════════════════════════════════════════════
  // CSS injetado uma única vez
  // ════════════════════════════════════════════════════════════════════
  const CSS = `
    .ipa-tut-fab {
      position: fixed;
      bottom: 16px;
      left: 16px;
      z-index: 9600;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 16px;
      background: #0e9ce3;
      color: #ffffff;
      border: none;
      border-radius: 999px;
      font-family: 'Open Sans', Arial, Helvetica, sans-serif;
      font-size: 13px;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(14, 156, 227, 0.35), 0 1px 3px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
    }
    .ipa-tut-fab:hover {
      background: #0a89c8;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(14, 156, 227, 0.45), 0 2px 4px rgba(0,0,0,0.12);
    }
    .ipa-tut-fab .ipa-tut-fab__icon {
      width: 18px; height: 18px;
      display: inline-flex; align-items: center; justify-content: center;
      font-size: 18px;
      font-weight: 700;
    }
    .ipa-tut-fab.is-active { background: #323232; }
    .ipa-tut-fab.is-active:hover { background: #1f1f1f; }

    .ipa-tut-card {
      position: fixed;
      bottom: 16px;
      left: 16px;
      z-index: 9700;
      width: 360px;
      max-width: calc(100vw - 32px);
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.18), 0 2px 6px rgba(0,0,0,0.08);
      overflow: hidden;
      font-family: 'Open Sans', Arial, Helvetica, sans-serif;
      animation: ipaTutIn 200ms ease;
    }
    @keyframes ipaTutIn {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .ipa-tut-card[hidden] { display: none; }

    .ipa-tut-card__header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 14px;
      background: #FAFAFA;
      border-bottom: 1px solid #ebebeb;
    }
    .ipa-tut-card__eyebrow {
      font-size: 11px;
      line-height: 14px;
      font-weight: 700;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      color: #747474;
    }
    .ipa-tut-card__eyebrow b { color: #0e9ce3; font-weight: 700; }
    .ipa-tut-card__ctrls { display: inline-flex; align-items: center; gap: 4px; }
    .ipa-tut-card__iconbtn {
      width: 24px; height: 24px;
      border: none; background: transparent; color: #747474;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center;
      font-family: inherit;
      font-size: 16px;
      line-height: 1;
      transition: background 100ms ease, color 100ms ease;
    }
    .ipa-tut-card__iconbtn:hover { background: #ebebeb; color: #323232; }
    .ipa-tut-card__iconbtn[title]:hover::after {
      /* tooltip simples (sem JS adicional) */
      content: attr(title);
      position: absolute;
      bottom: calc(100% + 4px);
      right: 0;
      background: #323232;
      color: #ffffff;
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 4px;
      white-space: nowrap;
      pointer-events: none;
    }
    .ipa-tut-card__iconbtn { position: relative; }

    .ipa-tut-card__body {
      padding: 16px 18px 14px;
    }
    .ipa-tut-card__title {
      font-size: 15px;
      line-height: 20px;
      font-weight: 700;
      color: #323232;
      margin: 0 0 8px 0;
    }
    .ipa-tut-card__text {
      font-size: 13px;
      line-height: 20px;
      color: #505050;
      margin: 0;
    }
    .ipa-tut-card__text b { color: #323232; font-weight: 700; }

    .ipa-tut-card__footer {
      display: flex; align-items: center; justify-content: space-between;
      gap: 8px;
      padding: 10px 14px 14px;
    }
    .ipa-tut-btn {
      display: inline-flex; align-items: center; gap: 4px;
      padding: 7px 12px;
      border-radius: 6px;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      line-height: 18px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: background 120ms ease, color 120ms ease, border-color 120ms ease;
    }
    .ipa-tut-btn--ghost {
      background: transparent;
      color: #505050;
      border-color: #ebebeb;
    }
    .ipa-tut-btn--ghost:hover { background: #FAFAFA; color: #323232; }
    .ipa-tut-btn--ghost[disabled] { opacity: 0.4; cursor: not-allowed; }
    .ipa-tut-btn--primary {
      background: #0e9ce3;
      color: #ffffff;
      border-color: #0e9ce3;
    }
    .ipa-tut-btn--primary:hover { background: #0a89c8; border-color: #0a89c8; }

    /* Ring de destaque do elemento alvo */
    .ipa-tut-highlight {
      position: relative;
      z-index: 9500;
      box-shadow: 0 0 0 3px rgba(14, 156, 227, 0.45),
                  0 0 0 6px rgba(14, 156, 227, 0.18) !important;
      border-radius: 6px;
      transition: box-shadow 200ms ease;
    }

    /* Banner "passo não encontrado nesta tela" */
    .ipa-tut-card__hint {
      margin-top: 10px;
      padding: 8px 10px;
      background: #fef6e7;
      border: 1px solid #fbe3b6;
      border-radius: 6px;
      font-size: 12px;
      color: #8a6a18;
      line-height: 16px;
    }
    .ipa-tut-card__hint a {
      color: #0e9ce3;
      font-weight: 600;
      cursor: pointer;
      text-decoration: underline;
    }
  `;

  // ════════════════════════════════════════════════════════════════════
  // Renderização
  // ════════════════════════════════════════════════════════════════════
  let fabEl, cardEl, highlightEl;

  function ensureStyle() {
    if (document.getElementById('ipa-tut-style')) return;
    const s = document.createElement('style');
    s.id = 'ipa-tut-style';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function ensureFab() {
    if (fabEl) return;
    fabEl = document.createElement('button');
    fabEl.type = 'button';
    fabEl.className = 'ipa-tut-fab';
    fabEl.innerHTML = '<span class="ipa-tut-fab__icon">?</span><span>Tutorial</span>';
    fabEl.addEventListener('click', toggleCard);
    document.body.appendChild(fabEl);
  }

  function clearHighlight() {
    if (highlightEl) {
      highlightEl.classList.remove('ipa-tut-highlight');
      highlightEl = null;
    }
  }

  function applyHighlight(selector) {
    clearHighlight();
    if (!selector) return;
    try {
      const el = document.querySelector(selector);
      if (!el) return;
      el.classList.add('ipa-tut-highlight');
      highlightEl = el;
    } catch (e) { /* seletor inválido — ignora */ }
  }

  function renderCard() {
    const state = getState();
    if (!state || !state.active) { hideCard(); return; }
    const step = STEPS[state.index];
    if (!step) { hideCard(); return; }

    // O step pertence a esta tela?
    const screen = currentScreen();
    const stepScreen = (step.screen || '').toLowerCase();
    const isFinal = stepScreen === '__final__';
    const onScreen = isFinal || stepScreen === screen;

    if (!cardEl) {
      cardEl = document.createElement('div');
      cardEl.className = 'ipa-tut-card';
      cardEl.setAttribute('role', 'dialog');
      cardEl.setAttribute('aria-label', 'Tutorial guiado');
      document.body.appendChild(cardEl);
    }

    const total = STEPS.length;
    const idx = state.index + 1;
    const isFirst = state.index === 0;
    const isLast = state.index === total - 1;

    let hint = '';
    if (!onScreen) {
      hint = `
        <div class="ipa-tut-card__hint">
          Este passo é da tela <b>${escapeHtml(step.screen)}</b>. <a data-tut-goto>Ir pra essa tela</a>.
        </div>`;
    }

    cardEl.innerHTML = `
      <div class="ipa-tut-card__header">
        <span class="ipa-tut-card__eyebrow">Tutorial · Passo <b>${idx}</b>/${total}</span>
        <div class="ipa-tut-card__ctrls">
          <button class="ipa-tut-card__iconbtn" type="button" data-tut-hide title="Esconder">_</button>
          <button class="ipa-tut-card__iconbtn" type="button" data-tut-close title="Encerrar">×</button>
        </div>
      </div>
      <div class="ipa-tut-card__body">
        <h3 class="ipa-tut-card__title">${escapeHtml(step.title)}</h3>
        <p class="ipa-tut-card__text">${step.body}</p>
        ${hint}
      </div>
      <div class="ipa-tut-card__footer">
        <button class="ipa-tut-btn ipa-tut-btn--ghost" type="button" data-tut-prev ${isFirst ? 'disabled' : ''}>← Voltar</button>
        <button class="ipa-tut-btn ipa-tut-btn--primary" type="button" data-tut-next>
          ${isLast ? 'Finalizar' : 'Avançar →'}
        </button>
      </div>
    `;

    // Bindings
    cardEl.querySelector('[data-tut-hide]').addEventListener('click', hideCard);
    cardEl.querySelector('[data-tut-close]').addEventListener('click', endTutorial);
    const prev = cardEl.querySelector('[data-tut-prev]');
    if (prev && !isFirst) prev.addEventListener('click', goPrev);
    cardEl.querySelector('[data-tut-next]').addEventListener('click', goNext);
    const goto = cardEl.querySelector('[data-tut-goto]');
    if (goto) goto.addEventListener('click', () => { location.href = step.screen; });

    cardEl.hidden = false;
    fabEl.classList.add('is-active');

    // Highlight do elemento alvo (se na tela)
    clearHighlight();
    if (onScreen && step.highlight) applyHighlight(step.highlight);
  }

  function hideCard() {
    if (cardEl) cardEl.hidden = true;
    clearHighlight();
    if (fabEl) fabEl.classList.remove('is-active');
  }

  function toggleCard() {
    const state = getState();
    if (!state || !state.active) {
      // Inicia
      startTutorial();
      return;
    }
    if (cardEl && !cardEl.hidden) {
      hideCard();
    } else {
      renderCard();
    }
  }

  // ════════════════════════════════════════════════════════════════════
  // Comandos
  // ════════════════════════════════════════════════════════════════════
  function startTutorial() {
    setState({ active: true, index: 0 });
    // Se o primeiro step não é desta tela, vai pra lá.
    const first = STEPS[0];
    if (first && first.screen && first.screen !== '__final__' && first.screen.toLowerCase() !== currentScreen()) {
      location.href = first.screen;
      return;
    }
    renderCard();
  }
  function endTutorial() {
    clearState();
    hideCard();
  }
  function goNext() {
    const s = getState();
    if (!s) return;
    if (s.index >= STEPS.length - 1) { endTutorial(); return; }
    const nextIdx = s.index + 1;
    const next = STEPS[nextIdx];
    setState({ active: true, index: nextIdx });
    if (next.screen && next.screen !== '__final__' && next.screen.toLowerCase() !== currentScreen()) {
      location.href = next.screen;
      return;
    }
    renderCard();
  }
  function goPrev() {
    const s = getState();
    if (!s || s.index === 0) return;
    const prevIdx = s.index - 1;
    const prev = STEPS[prevIdx];
    setState({ active: true, index: prevIdx });
    if (prev.screen && prev.screen !== '__final__' && prev.screen.toLowerCase() !== currentScreen()) {
      location.href = prev.screen;
      return;
    }
    renderCard();
  }

  // ════════════════════════════════════════════════════════════════════
  // Helpers
  // ════════════════════════════════════════════════════════════════════
  function escapeHtml(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ════════════════════════════════════════════════════════════════════
  // Init
  // ════════════════════════════════════════════════════════════════════
  function init() {
    ensureStyle();
    ensureFab();
    const state = getState();
    if (state && state.active) renderCard();
  }

  // "T" alterna visibilidade quando fora de inputs
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() !== 't') return;
    const tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
    toggleCard();
  });
  // ESC esconde card (não encerra)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cardEl && !cardEl.hidden) hideCard();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
