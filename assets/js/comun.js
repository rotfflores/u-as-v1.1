/* =====================================================================
   Nube Nácar · comportamiento común a todas las páginas
   ===================================================================== */
(() => {
  const NN = window.NN;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  NN.$ = $; NN.$$ = $$;
  NN.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } },
  };

  /* ---- Videos: solo se reproducen cuando se ven y si la visitante no pidió pausa ---- */
  (() => {
    const vids = $$('video[data-auto]');
    const btn = $('#motion-btn');
    const saveData = !!(navigator.connection && navigator.connection.saveData);
    const pref = store.get('nn-movimiento');
    let on = pref ? pref === 'on' : !(NN.reduce || saveData);
    const visible = new Map();
    const sync = () => {
      vids.forEach((v) => {
        if (on && visible.get(v) && !document.hidden) { const p = v.play(); if (p) p.catch(() => {}); } else v.pause();
      });
      if (btn) {
        btn.setAttribute('aria-pressed', String(on));
        $('.txt', btn).textContent = on ? 'Pausar video' : 'Ver video';
      }
    };
    if (!on) vids.forEach((v) => { v.preload = 'none'; });
    const io = new IntersectionObserver((entries) => { entries.forEach((e) => visible.set(e.target, e.isIntersecting)); sync(); }, { rootMargin: '120px' });
    vids.forEach((v) => io.observe(v));
    document.addEventListener('visibilitychange', sync);
    if (btn) {
      if (!vids.length) btn.hidden = true;
      btn.addEventListener('click', () => { on = !on; store.set('nn-movimiento', on ? 'on' : 'off'); vids.forEach((v) => { v.preload = 'auto'; }); sync(); });
    }
  })();

  /* ---- Encabezado y menú de pantalla completa ---- */
  const header = $('#header'), menuBtn = $('#menu-btn'), overlay = $('#overlay'), fab = $('#book-fab');
  let closeT;
  const setMenu = (open) => {
    clearTimeout(closeT);
    if (!open && overlay.classList.contains('open') && !NN.reduce) {
      overlay.classList.add('closing');
      closeT = setTimeout(() => overlay.classList.remove('closing'), 320);
    }
    overlay.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    $('.txt', menuBtn).textContent = open ? 'Cerrar' : 'Menú';
    document.body.style.overflow = open ? 'hidden' : '';
    document.body.classList.toggle('menu-open', open);
    if (open) overlay.removeAttribute('inert'); else overlay.setAttribute('inert', '');
  };
  menuBtn.addEventListener('click', () => setMenu(!overlay.classList.contains('open')));
  overlay.addEventListener('click', (ev) => { if (ev.target.closest('a')) setMenu(false); });
  addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && overlay.classList.contains('open')) { setMenu(false); menuBtn.focus(); } });
  matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  let ticking = false;
  const onScroll = () => {
    ticking = false;
    header.classList.toggle('scrolled', scrollY > 40);
    if (fab) fab.classList.toggle('show', scrollY > innerHeight * 0.7);
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---- Aviso breve y botones de copiar ---- */
  const toast = $('#toast'); let tt;
  NN.say = (msg) => { toast.textContent = msg; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 2600); };
  $$('[data-copy]').forEach((b) => b.addEventListener('click', () => {
    const el = document.getElementById(b.dataset.copy), text = el.textContent.trim();
    const fallback = () => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); NN.say('Texto seleccionado: cópialo con tu teclado'); };
    try { navigator.clipboard.writeText(text).then(() => NN.say('Copiado: ' + text), fallback); } catch (e) { fallback(); }
  }));

  /* ---- Tono del día: colorea las palabras en cursiva ---- */
  const applyAccent = (a) => {
    document.documentElement.style.setProperty('--accent', a.hex);
    $$('.tone-dots button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.accent === a.id)));
    $$('[data-tone-name]').forEach((el) => { el.textContent = a.name; });
  };
  const saved = NN.ACCENTS.find((a) => a.id === store.get('nn-tono')) || NN.ACCENTS[0];
  $$('.tone-dots').forEach((box) => {
    box.innerHTML = NN.ACCENTS.map((a) => `<button type="button" data-accent="${a.id}" style="--c:${a.hex}" aria-pressed="false" aria-label="Tono ${a.name}" title="${a.name}"></button>`).join('');
    box.addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-accent]'); if (!b) return;
      const a = NN.ACCENTS.find((x) => x.id === b.dataset.accent);
      applyAccent(a); store.set('nn-tono', a.id);
    });
  });
  applyAccent(saved);

  /* ---- Próximo horario libre y año ---- */
  NN.next = NN.nextFree();
  if (NN.next) $$('[data-next-slot]').forEach((el) => { el.textContent = `${NN.dayLabel(NN.next)}, ${NN.next.time}`; });
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---- Boletín (demostración) ---- */
  $$('[data-news]').forEach((f) => f.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const input = $('input', f);
    if (!input.checkValidity() || !input.value) { input.reportValidity(); return; }
    f.hidden = true; $('.ok', f.parentElement).hidden = false;
  }));
})();
