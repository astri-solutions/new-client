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

// const TYPE_ORDER = ['codigo', 'politicas', 'regimentos'];

// const TYPE_LABELS = {
//   codigo:    'Código de Ética e Conduta Profissional',
//   politicas:  'Políticas',
//   regimentos: 'Regimentos',
// };

const DOCS = [
  // 2026
  { year: 2026, title: 'Estatuto Social', date: '14 Mai 2026', size: '2,1 MB' },
];

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

let _uid = 0;
function uid() { return `acc-cvm-${++_uid}`; }

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
  const container = document.querySelector('[data-estatuto-social-list]');
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
  const sel = document.querySelector('[data-estatuto-social-year]');
  const currentYear = new Date().getFullYear();

  if (sel) {
    sel.value = String(currentYear);
    sel.addEventListener('change', e => renderList(Number(e.target.value)));
  }

  renderList(currentYear);
});
