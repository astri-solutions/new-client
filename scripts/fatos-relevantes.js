// =============================================================================
// DOCUMENTOS CVM
// =============================================================================
import './topbar.js';
import './nav.js';
import './reveal.js';
import { initAccordion } from './accordion.js';

// ---------------------------------------------------------------------------
// Document data
// ---------------------------------------------------------------------------

const TYPE_ORDER = ['cm', 'ftr'];

const TYPE_LABELS = {
  cm:        'Comunicados ao Mercado',
  ftr:        'Fatos Relevantes',
};

const DOCS = [
  // 2026
  { year: 2026, type: 'cm',        title: 'Comunicado ao Mercado - 9ª Emissão de Debêntures Simples', date: '14 Mai 2026', size: '2,1 MB' },
  { year: 2026, type: 'ftr',         title: 'Fato Relevante - Guidance de Produção e Capex para Safra 2026/27', date: '29 Mai 2026', size: '4,8 MB' },
  { year: 2026, type: 'ftr',         title: 'Fato Relevante - São Martinho anuncia emissão de Debêntures',  date: '15 Jan 2026', size: '0,4 MB' },
  // 2025
  { year: 2025, type: 'cm',        title: 'Participação de Executivo em evento com Transmissão ao vivo – Kepler Day',                                                         date: '12 Mai 2025', size: '1,8 MB' },
  { year: 2025, type: 'cm',        title: 'Comunicado ao Mercado - Negociações atípicas de valores mobiliários',                                                         date: '11 Ago 2025', size: '1,9 MB' },
  { year: 2025, type: 'ftr',        title: 'Fato relevante - Encerramento do Período de Moagem da Safra 2025/26',                                                         date: '10 Nov 2025', size: '2,0 MB' },
  { year: 2025, type: 'ftr',        title: 'Fato Relevante - Atualização do Guidance de Produção e Capex para Safra 2025/26',                   date: '12 Fev 2025', size: '3,5 MB' },
];

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

let _uid = 0;
function uid() { return `acc-frc-${++_uid}`; }

function docListHtml(docs) {
  return `<ul class="doc-list">
    ${docs.map(doc => `
      <li class="doc-list__item">
        <span class="doc-list__badge doc-list__badge--pdf">PDF</span>
        <div class="doc-list__info">
          <span class="doc-list__name">${doc.title}</span>
          <span class="doc-list__meta">${doc.date} · ${doc.size}</span>
        </div>
        <a class="doc-list__btn" href="#" download aria-label="Baixar ${doc.title}">
          ${ICON_DOWNLOAD}
        </a>
      </li>
    `).join('')}
  </ul>`;
}

function renderList(year) {
  const container = document.querySelector('[data-frc-list]');
  if (!container) return;

  const yearDocs = DOCS.filter(d => d.year === year);

  if (!yearDocs.length) {
    container.innerHTML = `<p style="text-align:center;color:var(--color-text-muted);padding:3rem 0">Nenhum documento disponível para ${year}.</p>`;
    return;
  }

  // Group by type in display order
  const groups = TYPE_ORDER
    .map(type => ({ type, docs: yearDocs.filter(d => d.type === type) }))
    .filter(g => g.docs.length > 0);

  // Render accordion — first group opens by default
  const accId = uid();
  container.innerHTML = `<div class="accordion" data-accordion id="${accId}">
    ${groups.map(({ type, docs }, i) => {
      const contentId = uid();
      return `<div class="accordion__item" data-accordion-item>
        <button class="accordion__trigger" data-accordion-trigger aria-expanded="false" aria-controls="${contentId}">
          <span class="accordion__label">${TYPE_LABELS[type]}</span>
        </button>
        <div class="accordion__content" id="${contentId}" role="region">
          <div class="accordion__body">
            ${docListHtml(docs)}
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>`;

  // Initialize accordion JS on the freshly rendered element
  const accEl = container.querySelector('[data-accordion]');
  if (accEl) {
    // Open first item
    accEl.dataset.accordionOpen = '0';
    initAccordion(accEl);
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const sel = document.querySelector('[data-frc-year]');
  const currentYear = new Date().getFullYear();

  if (sel) {
    sel.value = String(currentYear);
    sel.addEventListener('change', e => renderList(Number(e.target.value)));
  }

  renderList(currentYear);
});
