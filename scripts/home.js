// =============================================================================
// HOME — Slider do banner + handlers dos formulários
// =============================================================================

import './topbar.js';
import './nav.js';
import './reveal.js';
import './counter.js';
import './accordion.js';
import './splash.js';

/* -----------------------------------------------------------------------------
 * SLIDER do banner
 *
 * - Troca automática a cada 4s (definido em INTERVAL_MS).
 * - Animação slide-left: o slide ativo sai para a esquerda enquanto o próximo
 *   entra pela direita (transition em transform/opacity nas classes
 *   .is-active / .is-leaving — definidas no SCSS).
 * - Setas de navegação e bullets clicáveis.
 * - Pausa o autoplay quando o mouse está sobre o banner ou quando o usuário
 *   está focado em um controle (acessibilidade).
 * - Respeita prefers-reduced-motion.
 * --------------------------------------------------------------------------- */

const INTERVAL_MS = 4000;

/* -----------------------------------------------------------------------------
 * SLIDER do banner
 *
 * - Troca automática a cada INTERVAL_MS.
 * - Setas de navegação, contador "X/total" e barra de progresso animada.
 * - Pausa ao hover/focus; respeita prefers-reduced-motion.
 * --------------------------------------------------------------------------- */

function initHeroSlider() {
  const track = document.querySelector('[data-hero-track]');
  if (!track) return;

  const slides    = Array.from(track.querySelectorAll('[data-hero-slide]'));
  const prevBtn   = document.querySelector('[data-hero-prev]');
  const nextBtn   = document.querySelector('[data-hero-next]');
  const currentEl = document.querySelector('[data-hero-current]');
  const totalEl   = document.querySelector('[data-hero-total]');
  const progress  = document.querySelector('[data-hero-progress]');
  const hero      = track.closest('.hero');

  if (slides.length <= 1) return;

  const total       = slides.length;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current  = 0;
  let timerId  = null;
  let isPaused = false;

  // Popula contador total
  if (totalEl) totalEl.textContent = total;

  // ---- Contador
  function updateCounter() {
    if (currentEl) currentEl.textContent = current + 1;
  }

  // ---- Barra de progresso
  function restartProgress() {
    if (!progress || reduceMotion) return;
    progress.classList.remove('is-animating', 'is-paused');
    void progress.offsetWidth; // reflow para reiniciar animação
    progress.style.animationDuration = `${INTERVAL_MS}ms`;
    progress.classList.add('is-animating');
  }

  function pauseProgress()  { progress?.classList.add('is-paused'); }
  function resumeProgress() { progress?.classList.remove('is-paused'); }

  // ---- Transição de slides (fade-in + subida)
  function goTo(nextIndex) {
    if (nextIndex === current) return;

    nextIndex = ((nextIndex % total) + total) % total;

    const outgoing = slides[current];
    const incoming = slides[nextIndex];

    // Garante estado limpo no incoming (caso venha de transição interrompida)
    incoming.style.transition = 'none';
    incoming.classList.remove('is-leaving');
    void incoming.offsetWidth; // reflow
    incoming.style.transition = '';

    // Dispara a transição via classes — o CSS cuida do fade + translateY
    outgoing.classList.remove('is-active');
    outgoing.classList.add('is-leaving');
    incoming.classList.add('is-active');

    // Limpeza: remove is-leaving sem acionar nova transição (evita translateY fantasma)
    let cleanupDone = false;
    const doCleanup = () => {
      if (cleanupDone) return;
      cleanupDone = true;
      outgoing.style.transition = 'none';
      void outgoing.offsetWidth;
      outgoing.classList.remove('is-leaving');
      requestAnimationFrame(() => { outgoing.style.transition = ''; });
      outgoing.removeEventListener('transitionend', onTransitionEnd);
    };
    const onTransitionEnd = (e) => { if (e.propertyName === 'opacity') doCleanup(); };
    outgoing.addEventListener('transitionend', onTransitionEnd);
    setTimeout(doCleanup, 900); // fallback

    current = nextIndex;
    updateCounter();
    if (!isPaused) restartProgress();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  // ---- Autoplay
  function startAutoplay() {
    if (reduceMotion || isPaused) return;
    stopAutoplay();
    timerId = window.setInterval(next, INTERVAL_MS);
  }

  function stopAutoplay() {
    if (timerId) { clearInterval(timerId); timerId = null; }
  }

  function pause() {
    isPaused = true;
    stopAutoplay();
    pauseProgress();
  }

  function resume() {
    isPaused = false;
    resumeProgress();
    startAutoplay();
    restartProgress();
  }

  // ---- Wiring
  prevBtn?.addEventListener('click', () => { prev(); startAutoplay(); });
  nextBtn?.addEventListener('click', () => { next(); startAutoplay(); });

  if (hero) {
    hero.addEventListener('mouseenter', pause);
    hero.addEventListener('mouseleave', resume);
    hero.addEventListener('focusin',    pause);
    hero.addEventListener('focusout',   (e) => {
      if (!hero.contains(e.relatedTarget)) resume();
    });
  }

  // Pausa quando a aba sai do foco (economiza CPU)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else if (!isPaused)  { startAutoplay(); restartProgress(); }
  });

  // Inicializa
  updateCounter();
  startAutoplay();
  restartProgress();
}

/* -----------------------------------------------------------------------------
 * HEADER TRANSPARENTE — só na home, vira sólido ao fazer scroll
 * --------------------------------------------------------------------------- */

function initTransparentHeader() {
  const header = document.querySelector('.site-header');
  const hero   = document.querySelector('.hero');
  if (!header || !hero) return;

  const THRESHOLD = 80; // px scrollados antes de solidificar o header

  function update() {
    const isAtTop = window.scrollY < THRESHOLD;
    header.classList.toggle('site-header--transparent', isAtTop);
  }

  window.addEventListener('scroll', update, { passive: true });
  update(); // estado inicial
}

/* -----------------------------------------------------------------------------
 * FORMULÁRIOS — handlers placeholder.
 * Substituir pelas integrações reais (back-end, mailchimp, etc.) no futuro.
 * --------------------------------------------------------------------------- */

function initForms() {
  const mailingForm = document.querySelector('[data-mailing-form]');
  const contactForm = document.querySelector('[data-contact-form]');

  function showSuccess(form, message) {
    let banner = form.querySelector('[data-form-feedback]');
    if (!banner) {
      banner = document.createElement('div');
      banner.dataset.formFeedback = 'true';
      banner.style.cssText = `
        padding: 12px 16px; border-radius: 8px;
        background-color: rgba(46, 162, 79, 0.12);
        color: var(--color-primary-700);
        font-size: 14px; font-weight: 600;
        margin-top: 12px;
      `;
      form.appendChild(banner);
    }
    banner.textContent = message;
  }

  if (mailingForm) {
    mailingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(mailingForm));
      console.info('[mailing]', data);
      mailingForm.reset();
      showSuccess(mailingForm, '✓ Cadastro recebido! Em breve você receberá nossos comunicados.');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(contactForm));
      console.info('[contact]', data);
      contactForm.reset();
      showSuccess(contactForm, '✓ Mensagem enviada. Retornaremos em até 2 dias úteis.');
    });
  }
}

// ---- Init
document.addEventListener('DOMContentLoaded', () => {
  initTransparentHeader();
  initHeroSlider();
  initForms();
});
