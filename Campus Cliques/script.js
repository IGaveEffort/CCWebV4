// ============================================================
// Campus Cliques — script.js
// Replace YOUR_APPS_SCRIPT_URL_HERE with your deployed URL
// ============================================================

const APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_URL_HERE";

// ── Parallax on hero ────────────────────────────────────────
(function initParallax() {
  const hbg  = document.querySelector('.hbg');
  const hbg2 = document.querySelector('.hbg2');
  const heroLogo = document.querySelector('.hero-logo');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (hbg)      hbg.style.transform      = `translateY(${y * 0.18}px)`;
    if (hbg2)     hbg2.style.transform     = `translateY(${y * 0.10}px)`;
    if (heroLogo) heroLogo.style.transform = `translateY(${y * 0.08}px)`;
  }, { passive: true });
})();

// ── Animated stat counters ──────────────────────────────────
function animateCounter(el) {
  const target   = el.dataset.target;
  const suffix   = el.dataset.suffix || '';
  const isFloat  = target.includes('.');
  const num      = parseFloat(target);
  const duration = 1800;
  const start    = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = num * eased;
    el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── Scroll-triggered fade-ins & staggered cards ─────────────
(function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.classList.contains('sn') && el.dataset.target) animateCounter(el);
      el.classList.add('visible');
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in, .hc2, .si, .sl2, .sr, .fc').forEach(el => observer.observe(el));

  // Stagger how-it-works cards
  document.querySelectorAll('.hg .hc2').forEach((card, i) => {
    card.style.transitionDelay = `${i * 120}ms`;
  });

  // Stagger form cards
  document.querySelectorAll('.fg .fc').forEach((card, i) => {
    card.style.transitionDelay = `${i * 150}ms`;
  });
})();

// ── Nav scroll state ─────────────────────────────────────────
(function initNav() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
})();

// ── Form helpers ─────────────────────────────────────────────
function setFormState(form, state) {
  const btn    = form.querySelector('button[type="submit"]');
  const okEl   = form.querySelector('.ok');
  const errEl  = form.querySelector('.err');

  okEl.style.display  = 'none';
  errEl.style.display = 'none';
  btn.disabled = false;
  btn.classList.remove('loading');

  if (state === 'loading') {
    btn.disabled = true;
    btn.classList.add('loading');
  } else if (state === 'success') {
    okEl.style.display = 'block';
    form.reset();
  } else if (state === 'error') {
    errEl.style.display = 'block';
  }
}

async function submitToSheets(payload) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
    console.log('[Dev] Form payload:', payload);
    await new Promise(r => setTimeout(r, 900));
    return;
  }
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode:   'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

// ── Ambassador form ──────────────────────────────────────────
document.getElementById('aForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  setFormState(this, 'loading');
  const f = this;
  try {
    await submitToSheets({
      type:       'ambassador',
      firstName:  f.querySelector('[name="firstName"]').value,
      lastName:   f.querySelector('[name="lastName"]').value,
      email:      f.querySelector('[name="email"]').value,
      university: f.querySelector('[name="university"]').value,
      year:       f.querySelector('[name="year"]').value,
      platform:   f.querySelector('[name="platform"]').value,
      followers:  f.querySelector('[name="followers"]').value,
      major:      f.querySelector('[name="major"]').value,
      vibe:       f.querySelector('[name="vibe"]').value,
    });
    setFormState(f, 'success');
  } catch (err) {
    console.error(err);
    setFormState(f, 'error');
  }
});

// ── Brand form ───────────────────────────────────────────────
document.getElementById('bForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  setFormState(this, 'loading');
  const f = this;
  try {
    await submitToSheets({
      type:      'brand',
      firstName: f.querySelector('[name="firstName"]').value,
      lastName:  f.querySelector('[name="lastName"]').value,
      email:     f.querySelector('[name="email"]').value,
      brand:     f.querySelector('[name="brand"]').value,
      industry:  f.querySelector('[name="industry"]').value,
      goal:      f.querySelector('[name="goal"]').value,
      budget:    f.querySelector('[name="budget"]').value,
      campuses:  f.querySelector('[name="campuses"]').value,
      about:     f.querySelector('[name="about"]').value,
    });
    setFormState(f, 'success');
  } catch (err) {
    console.error(err);
    setFormState(f, 'error');
  }
});
