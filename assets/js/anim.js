/* =====================================================================
   Nube Nácar · animaciones de interfaz
   Clic en botones, transición entre páginas y revelado al hacer scroll.
   Todo respeta "reducir movimiento".
   ===================================================================== */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---- Onda y presión al hacer clic en los botones ---- */
  if (!reduce) document.addEventListener('pointerdown', (ev) => {
    const btn = ev.target.closest('.btn');
    if (!btn || btn.hasAttribute('disabled')) return;
    const r = btn.getBoundingClientRect();
    const d = Math.max(r.width, r.height);
    const sp = document.createElement('span');
    sp.className = 'ripple';
    sp.style.cssText = `width:${d}px;height:${d}px;left:${ev.clientX - r.left - d / 2}px;top:${ev.clientY - r.top - d / 2}px`;
    sp.addEventListener('animationend', () => sp.remove());
    btn.appendChild(sp);
    btn.classList.remove('press'); void btn.offsetWidth; btn.classList.add('press');
  }, { passive: true });

  /* ---- Pulso al elegir color o tono ---- */
  if (!reduce) document.addEventListener('click', (ev) => {
    const el = ev.target.closest('.swatch, .tone-dots button');
    if (!el) return;
    el.classList.remove('chosen'); void el.offsetWidth; el.classList.add('chosen');
  });

  /* ---- Transición al salir hacia otra página ---- */
  if (!reduce) {
    const sameDoc = (a) => {
      try { const u = new URL(a.href); return u.origin === location.origin && u.pathname.endsWith('.html'); } catch (e) { return false; }
    };
    document.addEventListener('click', (ev) => {
      if (ev.defaultPrevented || ev.button || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      const a = ev.target.closest('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download') || !sameDoc(a)) return;
      const here = location.pathname.split('/').pop() || 'index.html';
      const there = new URL(a.href).pathname.split('/').pop();
      if (there === here) return; // misma página (ancla): deja el salto normal
      ev.preventDefault();
      document.documentElement.classList.add('nav-away');
      setTimeout(() => { location.href = a.href; }, 460);
    });
    // Al volver con el botón "atrás" (bfcache), quita el velo de salida
    addEventListener('pageshow', (e) => { if (e.persisted) document.documentElement.classList.remove('nav-away'); });
  }

  /* ---- Revelado al hacer scroll (respaldo donde no hay animation-timeline) ---- */
  const supportsTimeline = CSS.supports && CSS.supports('animation-timeline: view()');
  if (!reduce && !supportsTimeline && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('seen'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    $$('.reveal').forEach((el) => io.observe(el));
  }
})();
