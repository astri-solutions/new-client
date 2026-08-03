// =============================================================================
// APRESENTAÇÕES E TELECONFERÊNCIAS
// =============================================================================
import './topbar.js';
import './nav.js';
import './reveal.js';
import { initAccordion } from './accordion.js';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

const TYPE_ORDER = ['apresentacao', 'teleconferencia'];

const TYPE_LABELS = {
  apresentacao:   'Apresentações',
  teleconferencia: 'Teleconferências',
};

// ---------------------------------------------------------------------------
// Document data
// ---------------------------------------------------------------------------

const DOCS = [
  // 2026
  { year: 2026, type: 'apresentacao',   title: 'Apresentação de Resultados 1T26',                 date: '14 Mai 2026', size: '3,2 MB' },
  { year: 2026, type: 'apresentacao',   title: 'Investor Day 2026 — Estratégia e Perspectivas',   date: '18 Mar 2026', size: '8,5 MB' },
  { year: 2026, type: 'teleconferencia', title: 'Teleconferência de Resultados 1T26',              date: '14 Mai 2026', size: '0,8 MB' },

  // 2025
  { year: 2025, type: 'apresentacao',   title: 'Apresentação de Resultados 4T25 e 2025',          date: '12 Fev 2026', size: '4,1 MB' },
  { year: 2025, type: 'apresentacao',   title: 'Apresentação de Resultados 3T25',                 date: '13 Nov 2025', size: '3,7 MB' },
  { year: 2025, type: 'apresentacao',   title: 'Apresentação de Resultados 2T25',                 date: '14 Ago 2025', size: '3,5 MB' },
  { year: 2025, type: 'apresentacao',   title: 'Apresentação de Resultados 1T25',                 date: '14 Mai 2025', size: '3,3 MB' },
  { year: 2025, type: 'apresentacao',   title: 'Apresentação Institucional — XP Expert 2025',     date: '22 Set 2025', size: '5,6 MB' },
  { year: 2025, type: 'apresentacao',   title: 'Apresentação Institucional — BTG CEO Conference', date: '10 Jun 2025', size: '4,8 MB' },
  { year: 2025, type: 'apresentacao',   title: 'Apresentação Institucional — Itaú BBA LatAm',     date: '04 Mar 2025', size: '4,2 MB' },
  { year: 2025, type: 'teleconferencia', title: 'Teleconferência de Resultados 4T25 e 2025',      date: '12 Fev 2026', size: '0,9 MB' },
  { year: 2025, type: 'teleconferencia', title: 'Teleconferência de Resultados 3T25',             date: '13 Nov 2025', size: '0,8 MB' },
  { year: 2025, type: 'teleconferencia', title: 'Teleconferência de Resultados 2T25',             date: '14 Ago 2025', size: '0,8 MB' },
  { year: 2025, type: 'teleconferencia', title: 'Teleconferência de Resultados 1T25',             date: '14 Mai 2025', size: '0,7 MB' },

  // 2024
  { year: 2024, type: 'apresentacao',   title: 'Apresentação de Resultados 4T24 e 2024',          date: '13 Fev 2025', size: '4,0 MB' },
  { year: 2024, type: 'apresentacao',   title: 'Apresentação de Resultados 3T24',                 date: '14 Nov 2024', size: '3,6 MB' },
  { year: 2024, type: 'apresentacao',   title: 'Apresentação de Resultados 2T24',                 date: '14 Ago 2024', size: '3,4 MB' },
  { year: 2024, type: 'apresentacao',   title: 'Apresentação de Resultados 1T24',                 date: '15 Mai 2024', size: '3,1 MB' },
  { year: 2024, type: 'apresentacao',   title: 'Investor Day 2024 — Plano Estratégico 2024–2027', date: '20 Mar 2024', size: '9,2 MB' },
  { year: 2024, type: 'apresentacao',   title: 'Apresentação Institucional — Bank of America',    date: '05 Nov 2024', size: '4,7 MB' },
  { year: 2024, type: 'teleconferencia', title: 'Teleconferência de Resultados 4T24 e 2024',      date: '13 Fev 2025', size: '0,9 MB' },
  { year: 2024, type: 'teleconferencia', title: 'Teleconferência de Resultados 3T24',             date: '14 Nov 2024', size: '0,8 MB' },
  { year: 2024, type: 'teleconferencia', title: 'Teleconferência de Resultados 2T24',             date: '14 Ago 2024', size: '0,8 MB' },
  { year: 2024, type: 'teleconferencia', title: 'Teleconferência de Resultados 1T24',             date: '15 Mai 2024', size: '0,7 MB' },

  // 2023
  { year: 2023, type: 'apresentacao',   title: 'Apresentação de Resultados 4T23 e 2023',          date: '14 Fev 2024', size: '3,8 MB' },
  { year: 2023, type: 'apresentacao',   title: 'Apresentação de Resultados 3T23',                 date: '14 Nov 2023', size: '3,4 MB' },
  { year: 2023, type: 'apresentacao',   title: 'Apresentação de Resultados 2T23',                 date: '15 Ago 2023', size: '3,2 MB' },
  { year: 2023, type: 'apresentacao',   title: 'Apresentação de Resultados 1T23',                 date: '15 Mai 2023', size: '3,0 MB' },
  { year: 2023, type: 'apresentacao',   title: 'Apresentação Institucional — JPMorgan EM Summit', date: '08 Nov 2023', size: '5,1 MB' },
  { year: 2023, type: 'apresentacao',   title: 'Apresentação Institucional — Goldman Sachs Brasil', date: '22 Jun 2023', size: '4,5 MB' },
  { year: 2023, type: 'teleconferencia', title: 'Teleconferência de Resultados 4T23 e 2023',      date: '14 Fev 2024', size: '0,8 MB' },
  { year: 2023, type: 'teleconferencia', title: 'Teleconferência de Resultados 3T23',             date: '14 Nov 2023', size: '0,7 MB' },
  { year: 2023, type: 'teleconferencia', title: 'Teleconferência de Resultados 2T23',             date: '15 Ago 2023', size: '0,7 MB' },
  { year: 2023, type: 'teleconferencia', title: 'Teleconferência de Resultados 1T23',             date: '15 Mai 2023', size: '0,7 MB' },
];

// ---------------------------------------------------------------------------
// Render
// ---------------------------------------------------------------------------

const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

let _uid = 0;
function uid() { return `acc-ap-${++_uid}`; }

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
  const container = document.querySelector('[data-ap-list]');
  if (!container) return;

  const yearDocs = DOCS.filter(d => d.year === year);

  if (!yearDocs.length) {
    container.innerHTML = `<p style="text-align:center;color:var(--color-text-muted);padding:3rem 0">Nenhum documento disponível para ${year}.</p>`;
    return;
  }

  const groups = TYPE_ORDER
    .map(type => ({ type, docs: yearDocs.filter(d => d.type === type) }))
    .filter(g => g.docs.length > 0);

  const accId = uid();
  container.innerHTML = `<div class="accordion" data-accordion id="${accId}">
    ${groups.map(({ type, docs }) => {
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

  const accEl = container.querySelector('[data-accordion]');
  if (accEl) {
    accEl.dataset.accordionOpen = '0';
    initAccordion(accEl);
  }
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const sel = document.querySelector('[data-ap-year]');
  const currentYear = new Date().getFullYear();

  if (sel) {
    sel.value = String(currentYear);
    sel.addEventListener('change', e => renderList(Number(e.target.value)));
  }

  renderList(currentYear);
});
