import './topbar.js';
import './nav.js';
import './reveal.js';

// ─── Dados ───────────────────────────────────────────────────────────────────

const DOCS = [
  // 2026
  { year: '2026', formato: 'pdf', title: 'Boletim de voto à distância - Assembleia Geral Ordinária - Reapresentação', date: '14 Mai 2026', size: '3,2 MB' },
  { year: '2026', formato: 'pdf', title: 'Boletim de voto à distância - Assembleia Geral Ordinária', date: '18 Mar 2026', size: '8,5 MB' },

  // 2025
  { year: '2025', formato: 'pdf', title: 'Boletim de voto à distância - Assembleia Geral Ordinária', date: '12 Fev 2026', size: '4,1 MB' },
];

// ─── Estado ──────────────────────────────────────────────────────────────────

let activeYear = 'todos';
// let activeTipo = 'todos';

// ─── Utilitários ─────────────────────────────────────────────────────────────

const ICON_DOWNLOAD = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

// ─── Render ──────────────────────────────────────────────────────────────────

function render() {
  const list = document.querySelector('[data-bvd-list]');
  if (!list) return;

  let docs = DOCS;
  if (activeYear !== 'todos') docs = docs.filter(d => d.year === activeYear);
  // if (activeTipo !== 'todos') docs = docs.filter(d => d.tipo === activeTipo);

  // if (count) count.textContent = `${docs.length} documento${docs.length !== 1 ? 's' : ''}`;

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

document.querySelector('[data-bvd-year]')?.addEventListener('change', e => {
  activeYear = e.target.value;
  render();
});

// document.querySelector('[data-bvd-tipo]')?.addEventListener('change', e => {
//   activeTipo = e.target.value;
//   render();
// });

render();
