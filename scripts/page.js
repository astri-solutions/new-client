// Entrada consolidada para todas as páginas internas
import './topbar.js';
import './nav.js';
import './reveal.js';
import './accordion.js';

// =============================================================================
// INVEST TABS — Por que investir na São Martinho
// =============================================================================

const investTabsEl = document.querySelector('[data-invest-tabs]');
if (investTabsEl) {
  const tabs = Array.from(investTabsEl.querySelectorAll('[data-invest-tab]'));
  const panels = Array.from(investTabsEl.querySelectorAll('[role="tabpanel"]'));

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.investTab;
      tabs.forEach((t) => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach((p) => { p.hidden = true; });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      const panel = investTabsEl.querySelector(`#tab-panel-${target}`);
      if (panel) panel.hidden = false;
    });
  });
}

// =============================================================================
// FORMULÁRIO — Fale com RI
// =============================================================================

const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm).entries());
    console.log('[Fale com RI] Dados enviados:', data);

    const successEl = contactForm.querySelector('[data-form-success]');
    if (successEl) {
      successEl.classList.add('is-visible');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    contactForm.reset();
  });
}

// =============================================================================
// FORMULÁRIO — Mailing
// =============================================================================

const mailingForm = document.querySelector('[data-mailing-form]');
if (mailingForm) {
  mailingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(mailingForm);
    const comunicados = formData.getAll('comunicados');
    const data = {
      ...Object.fromEntries(formData.entries()),
      comunicados,
    };
    console.log('[Mailing] Dados enviados:', data);

    const successEl = mailingForm.querySelector('[data-form-success]');
    if (successEl) {
      successEl.classList.add('is-visible');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    mailingForm.reset();
  });
}
