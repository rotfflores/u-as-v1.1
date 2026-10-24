/* =====================================================================
   Nube Nácar · comportamiento común a todas las páginas
   Fondo en video, menú, botón flotante, avisos, horario y adornos.
   ===================================================================== */
(() => {
  const NN = window.NN;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  NN.$ = $; NN.$$ = $$;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  NN.reduce = reduce;

  /* ---- Fondo en video: se pausa con "reducir movimiento", ahorro de datos o si la visitante lo pide ---- */
  (() => {
    const v = $('#bg-video'), btn = $('#bg-toggle');
    if (!v) return;
    const saveData = !!(navigator.connection && navigator.connection.saveData);
    let pref = null;
    try { pref = localStorage.getItem('nn-fondo'); } catch (e) { /* almacenamiento bloqueado */ }
    let on = pref ? pref === 'on' : !(reduce || saveData);
    if (!on) v.preload = 'none';
    const sync = () => {
      if (!btn) return;
      btn.setAttribute('aria-pressed', String(on));
      $('.txt', btn).textContent = on ? 'Pausar fondo' : 'Animar fondo';
      btn.setAttribute('aria-label', on ? 'Pausar el video de fondo' : 'Reproducir el video de fondo');
    };
    const play = () => { const p = v.play(); if (p) p.catch(() => { on = false; sync(); }); };
    const apply = () => { if (on && !document.hidden) play(); else v.pause(); sync(); };
    btn && btn.addEventListener('click', () => {
      on = !on;
      try { localStorage.setItem('nn-fondo', on ? 'on' : 'off'); } catch (e) { /* sin almacenamiento */ }
      apply();
    });
    document.addEventListener('visibilitychange', apply);
    apply();
  })();

  /* ---- Encabezado, menú móvil y botón flotante ---- */
  const topbar = $('#topbar'), menuBtn = $('#menu-btn'), nav = $('#nav'), fab = $('#fab');
  const closeMenu = () => { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.setAttribute('aria-label', 'Abrir menú'); };
  menuBtn.addEventListener('click', () => {
    const open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  nav.addEventListener('click', (ev) => { if (ev.target.closest('a')) closeMenu(); });
  addEventListener('keydown', (ev) => { if (ev.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (ev) => { if (nav.classList.contains('open') && !ev.target.closest('.topbar')) closeMenu(); });

  let ticking = false;
  const onScroll = () => {
    ticking = false;
    if (fab) fab.classList.toggle('show', scrollY > innerHeight * 0.6);
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---- Aviso breve ---- */
  const toast = $('#toast'); let tt;
  NN.say = (msg) => { toast.textContent = msg; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 2400); };

  /* ---- Botones de copiar ---- */
  $$('[data-copy]').forEach((btn) => btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.copy);
    const text = el.textContent.trim();
    const fallback = () => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); NN.say('Texto seleccionado, cópialo con tu teclado'); };
    try { navigator.clipboard.writeText(text).then(() => NN.say('Copiado: ' + text), fallback); } catch (e) { fallback(); }
  }));

  /* ---- Abierto / cerrado y próximo horario libre ---- */
  const now = new Date();
  const status = $('#status');
  if (status) {
    const d = now.getDay(), h = now.getHours() + now.getMinutes() / 60, [o, c] = NN.HOURS[d];
    let txt;
    if (h >= o && h < c) txt = `Abierto ahora · cierra a las ${NN.hh(c)}`;
    else {
      status.classList.add('closed');
      txt = h < o ? `Cerrado · abre hoy a las ${NN.hh(o)}` : `Cerrado · abre mañana a las ${NN.hh(NN.HOURS[(d + 1) % 7][0])}`;
    }
    $('.status-text', status).textContent = txt;
  }
  const nf = NN.nextFree();
  NN.next = nf;
  if (nf) $$('[data-next-slot]').forEach((el) => { el.textContent = `${NN.dayLabel(nf)} · ${nf.time}`; });

  /* ---- Puntas de uña decorativas ---- */
  // data-nails="forma largo color acabado [deco] [color2]"
  $$('[data-nails]').forEach((el) => {
    const [shape, length, color, finish, deco, color2] = el.dataset.nails.split(' ');
    el.innerHTML = NN.setHTML({ shape, length, color, finish, deco: deco && deco !== '-' ? deco : null, color2 });
  });
  const SVC_ART = {
    manicura: { shape: 'squoval', length: 'corta', color: 'nude', finish: 'brillo' },
    extensiones: { shape: 'stiletto', length: 'larga', color: 'lila', finish: 'cromo' },
    pedicura: { shape: 'ovalada', length: 'corta', color: 'coral', finish: 'brillo' },
    arte: { shape: 'almendra', length: 'media', color: 'nude', finish: 'brillo', deco: 'hearts', color2: '#a3133b' },
  };
  $$('[data-art]').forEach((el) => {
    const o = SVC_ART[el.dataset.art];
    el.innerHTML = [0, 1, 2].map((i) => `<div class="tip" style="--dy:${[6, 0, 6][i]}px;--r:${[-6, 0, 6][i]}deg">${NN.nailSVG({ ...o, idx: i === 1 ? 1 : 0 })}</div>`).join('');
  });

  /* ---- Corazones de burbuja al tocar el cielo ---- */
  const HEART_SVG = (n) => `<svg viewBox="0 0 40 40"><defs><linearGradient id="hp${n}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8fd0"/><stop offset=".35" stop-color="#9ff0ff"/><stop offset=".65" stop-color="#fff2a1"/><stop offset="1" stop-color="#b49bff"/></linearGradient></defs><path d="M20 35C8 27 3.5 21 3.5 14.2 3.5 9 7.4 5 12.3 5c3.3 0 5.9 1.8 7.7 4.4C21.8 6.8 24.4 5 27.7 5c4.9 0 8.8 4 8.8 9.2C36.5 21 32 27 20 35Z" fill="rgba(255,255,255,.35)" stroke="url(#hp${n})" stroke-width="2.4"/><path d="M10 12c1-2 2.6-3 4.6-3" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/></svg>`;
  let hn = 0;
  $$('[data-sky]').forEach((zone) => {
    if (reduce) return;
    zone.addEventListener('pointerdown', (ev) => {
      if (ev.target.closest('a,button,input,label,select,textarea,.hero-card,.page-hero-card')) return;
      if (zone.querySelectorAll('.pop-heart').length > 14) return;
      const r = zone.getBoundingClientRect();
      for (let i = 0; i < 3; i++) {
        const el = document.createElement('span');
        el.className = 'pop-heart';
        el.style.cssText = `--s:${26 + Math.random() * 34}px;--x:${ev.clientX - r.left + (Math.random() - .5) * 40}px;--y:${ev.clientY - r.top}px;--dx:${(Math.random() - .5) * 120}px;--rot:${(Math.random() - .5) * 50}deg;animation-delay:${i * 90}ms`;
        el.innerHTML = HEART_SVG(++hn);
        el.addEventListener('animationend', () => el.remove());
        zone.appendChild(el);
      }
    });
  });

  /* ---- Año del pie de página ---- */
  $$('[data-year]').forEach((el) => { el.textContent = now.getFullYear(); });
})();
