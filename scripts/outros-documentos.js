import './topbar.js';
import './nav.js';
import './reveal.js';

// ─── Dados ───────────────────────────────────────────────────────────────────

const DOCS = [
  // 2026
  { year: '2026', formato: 'pdf', title: 'Formulário de Referência 2026', date: '30 Jun 2026', size: '5,8 MB' },
  { year: '2026', formato: 'pdf', title: 'Relatório Anual 2025/2026', date: '15 Mai 2026', size: '7,2 MB' },

  // 2025
  { year: '2025', formato: 'pdf', title: 'Formulário de Referência 2025', date: '30 Jun 2025', size: '5,5 MB' },
  { year: '2025', formato: 'pdf', title: 'Relatório Anual 2024/2025', date: '14 Mai 2025', size: '6,9 MB' },
  { year: '2025', formato: 'pdf', title: 'Prospecto de Debêntures — 5ª Emissão', date: '10 Mar 2025', size: '4,1 MB' },

  // 2024
  { year: '2024', formato: 'pdf', title: 'Formulário de Referência 2024', date: '28 Jun 2024', size: '5,3 MB' },
  { year: '2024', formato: 'pdf', title: 'Relatório Anual 2023/2024', date: '15 Mai 2024', size: '6,7 MB' },

  // 2023
  { year: '2023', formato: 'pdf', title: 'Formulário de Referência 2023', date: '30 Jun 2023', size: '5,1 MB' },
  { year: '2023', formato: 'pdf', title: 'Relatório Anual 2022/2023', date: '16 Mai 2023', size: '6,4 MB' },
  { year: '2023', formato: 'pdf', title: 'Prospecto de Debêntures — 4ª Emissão', date: '08 Fev 2023', size: '3,8 MB' },
];

// ─── Estado ──────────────────────────────────────────────────────────────────

let activeYear = '2026';

// ─── Utilitários ─────────────────────────────────────────────────────────────

const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

// ─── Render ──────────────────────────────────────────────────────────────────

function render() {
  const list = document.querySelector('[data-od-list]');
  if (!list) return;

  let docs = DOCS;
  if (activeYear !== 'todos') docs = docs.filter(d => d.year === activeYear);

  if (docs.length === 0) {
    list.innerHTML = `<p class="doc-list__empty">Nenhum documento encontrado para os filtros selecionados.</p>`;
    return;
  }

  list.innerHTML = `<ul class="doc-list">
    ${docs.map(doc => `
      <li class="doc-list__item">
        <span class="doc-list__badge doc-list__badge--${doc.formato}">${doc.formato.toUpperCase()}</span>
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

// ─── Filtros ─────────────────────────────────────────────────────────────────

document.querySelector('[data-od-year]')?.addEventListener('change', e => {
  activeYear = e.target.value;
  render();
});

render();
