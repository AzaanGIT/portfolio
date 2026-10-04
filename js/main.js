/* ═══════════════════════════════════════════════════════
   AZAAN PORTFOLIO — SHARED JS
═══════════════════════════════════════════════════════ */

/* ── Scroll progress bar ── */
function initProgressBar () {
  const bar = document.querySelector('.progress-bar');
  if (!bar) return;
  function update () {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max * 100) : 0) + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Sticky header ── */
function initStickyHeader () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  function update () {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ── Menu overlay ── */
function initMenu () {
  const overlay  = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('closeMenu');
  const menuButtons = document.querySelectorAll('.menu-btn');
  if (!overlay) return;

  function open () {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    menuButtons.forEach(btn => btn.setAttribute('aria-expanded', 'true'));
    document.body.style.overflow = 'hidden';
  }
  function close () {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    menuButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    document.body.style.overflow = '';
  }

  menuButtons.forEach(btn => btn.addEventListener('click', open));
  if (closeBtn) closeBtn.addEventListener('click', close);
  
  // Close when clicking directly on the overlay backdrop
  overlay.addEventListener('click', e => {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  // Close on nav link click
  overlay.querySelectorAll('.menu-link').forEach(a => a.addEventListener('click', close));
}

/* ── Scroll reveal ── */
function initReveal () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) { items.forEach(el => el.classList.add('visible')); return; }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(el => obs.observe(el));
}

/* ── Count-up animation ── */
function initCountUp () {
  const items = document.querySelectorAll('[data-count]');
  if (!items.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const el     = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dec    = el.dataset.dec ? parseInt(el.dataset.dec) : 0;
      if (reduced) { el.textContent = (dec ? target.toFixed(dec) : target) + suffix; return; }
      const dur    = 1800;
      const start  = performance.now();
      function frame (now) {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const val = target * ease;
        el.textContent = (dec ? val.toFixed(dec) : Math.round(val)) + suffix;
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }, { threshold: 0.4 });

  items.forEach(el => obs.observe(el));
}

/* ── Active nav link ── */
function initActiveNav () {
  const path = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.site-header nav a').forEach(a => {
    const href = a.getAttribute('href').replace(/\/$/, '');
    if (href === path || (path === '' && href === '/index.html') || (path.endsWith('index.html') && href === '/index.html')) {
      a.classList.add('active');
    }
  });
}

/* ── Back to top ── */
function initBackToTop () {
  document.querySelectorAll('.back-to-top').forEach(btn => {
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });
}

/* ── Gallery lightbox ── */
function initLightbox () {
  const items = document.querySelectorAll('.gallery-item[data-src]');
  if (!items.length) return;

  const lb = document.createElement('div');
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-label', 'Image lightbox');
  lb.setAttribute('aria-modal', 'true');
  lb.style.cssText = 'position:fixed;inset:0;z-index:500;background:rgba(14,15,12,.9);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 250ms;pointer-events:none;';
  const img = document.createElement('img');
  img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:16px;box-shadow:0 24px 80px rgba(0,0,0,.5);';
  const closeX = document.createElement('button');
  closeX.textContent = '×';
  closeX.setAttribute('aria-label', 'Close lightbox');
  closeX.style.cssText = 'position:absolute;top:24px;right:24px;width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:white;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
  lb.appendChild(img);
  lb.appendChild(closeX);
  document.body.appendChild(lb);

  function open (src, alt) {
    img.src = src; img.alt = alt || '';
    lb.style.opacity = '1'; lb.style.pointerEvents = 'auto';
    document.body.style.overflow = 'hidden';
  }
  function close () {
    lb.style.opacity = '0'; lb.style.pointerEvents = 'none';
    document.body.style.overflow = '';
  }

  items.forEach(item => item.addEventListener('click', () => open(item.dataset.src, item.dataset.alt)));
  closeX.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ── Contact form ── */
function initContactForm () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn  = form.querySelector('[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Simulate (replace with real Formspree / Resend endpoint)
    setTimeout(() => {
      btn.textContent = '✓ Message sent!';
      form.reset();
      setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 3000);
    }, 1200);
  });
}

/* ── Filter chips ── */
function initFilters () {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const group = chip.closest('.filter-chips');
      group.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.dataset.filter;
      document.querySelectorAll('[data-category]').forEach(card => {
        const show = val === 'all' || card.dataset.category === val;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ── Typewriter ── */
function initTypewriter (el, roles) {
  if (!el || !roles || !roles.length) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrapper = el.closest('[aria-label]');

  if (reduced) {
    el.textContent = roles[0];
    if (wrapper) wrapper.setAttribute('aria-label', 'Role: ' + roles[0]);
    return;
  }

  const TYPE_MS   = 70;
  const DELETE_MS = 40;
  const HOLD_MS   = 1600;
  const PAUSE_MS  = 350;
  let roleIdx = 0, charIdx = 0, deleting = false;

  function tick () {
    const current = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        if (wrapper) wrapper.setAttribute('aria-label', 'Role: ' + current);
        setTimeout(() => { deleting = true; tick(); }, HOLD_MS);
        return;
      }
      setTimeout(tick, TYPE_MS);
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, PAUSE_MS);
        return;
      }
      setTimeout(tick, DELETE_MS);
    }
  }
  setTimeout(tick, 900);
}

/* ── Boot ── */
document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initStickyHeader();
  initMenu();
  initReveal();
  initCountUp();
  initActiveNav();
  initBackToTop();
  initLightbox();
  initContactForm();
  initFilters();

  // Hero typewriter
  const roleEl = document.getElementById('roleText');
  if (roleEl) {
    initTypewriter(roleEl, [
      'Physical Design Engineer',
      'VLSI Designer',
      'RTL-to-GDS Enthusiast',
      'ML for EDA Explorer',
    ]);
  }
});
