/* =====================================================================
   Nube Nácar · puntas de uña dibujadas en SVG
   nailSVG({ shape, length, color, finish, deco?, color2?, idx? })
   Las usan el abanico del inicio, las tarjetas, la galería y el diseñador.
   ===================================================================== */
window.NN = window.NN || {};
(() => {
  const NN = window.NN;

  NN.LENGTHS = { corta: { name: 'Corto', h: 120 }, media: { name: 'Medio', h: 152 }, larga: { name: 'Largo', h: 190 } };
  NN.SHAPES = {
    almendra: { name: 'Almendra', d: (H) => `M10 ${H - 22}L10 60C10 34 36 9 50 3C64 9 90 34 90 60L90 ${H - 22}Q50 ${H + 8} 10 ${H - 22}Z` },
    bailarina: { name: 'Bailarina', d: (H) => `M8 ${H - 22}L8 54L25 8Q27 4 32 4L68 4Q73 4 75 8L92 54L92 ${H - 22}Q50 ${H + 8} 8 ${H - 22}Z` },
    stiletto: { name: 'Stiletto', d: (H) => `M12 ${H - 22}L12 74C12 50 42 14 50 0C58 14 88 50 88 74L88 ${H - 22}Q50 ${H + 8} 12 ${H - 22}Z` },
    cuadrada: { name: 'Cuadrada', d: (H) => `M8 ${H - 22}L8 12Q8 4 16 4L84 4Q92 4 92 12L92 ${H - 22}Q50 ${H + 8} 8 ${H - 22}Z` },
    ovalada: { name: 'Ovalada', d: (H) => `M8 ${H - 22}L8 50C8 20 28 3 50 3C72 3 92 20 92 50L92 ${H - 22}Q50 ${H + 8} 8 ${H - 22}Z` },
    squoval: { name: 'Squoval', d: (H) => `M8 ${H - 22}L8 26Q8 4 30 4L70 4Q92 4 92 26L92 ${H - 22}Q50 ${H + 8} 8 ${H - 22}Z` },
  };
  NN.COLORS = {
    lila: { name: 'Lila nube', hex: '#b9a6ea' }, durazno: { name: 'Durazno', hex: '#f6b49a' }, nude: { name: 'Nude rosado', hex: '#e8c1b8' },
    fresa: { name: 'Fresa', hex: '#f39ac0' }, coral: { name: 'Coral', hex: '#ef7a6c' }, cereza: { name: 'Cereza', hex: '#a3133b' },
    malva: { name: 'Malva', hex: '#ad7a9b' }, cielo: { name: 'Cielo', hex: '#a7c6f0' }, leche: { name: 'Leche', hex: '#f6f0ed' },
    noche: { name: 'Noche', hex: '#2b2653' },
  };
  NN.FINISHES = {
    brillo: { name: 'Brillo', min: 0, price: 0 }, mate: { name: 'Mate', min: 5, price: 40 },
    cromo: { name: 'Cromo perla', min: 15, price: 80 }, glazed: { name: 'Glazed', min: 15, price: 80 },
    frances: { name: 'Francés', min: 20, price: 90 },
  };
  const { LENGTHS, SHAPES, COLORS } = NN;
  const NUDE = '#f0d2c8';
  const HEART = 'M0 6C-8 0-11-4-11-7.5-11-11-8-13-5.5-13-3-13-1-11.5 0-9.5 1-11.5 3-13 5.5-13 8-13 11-11 11-7.5 11-4 8 0 0 6Z';
  let gid = 0;

  NN.nailSVG = (o) => {
    const H = LENGTHS[o.length].h;
    const d = SHAPES[o.shape].d(H);
    const id = 'nl' + (++gid);
    const col = COLORS[o.color].hex;
    const nudeBase = o.finish === 'frances' || o.deco === 'micro' || o.deco === 'babyboomer';
    const base = o.deco === 'cateye' ? COLORS.noche.hex : nudeBase ? NUDE : col;
    let defs = `<clipPath id="${id}c"><path d="${d}"/></clipPath>`;
    let over = '';
    const R = () => `<rect x="-5" y="-5" width="110" height="${H + 10}" fill="url(#${id}`;

    if (o.deco === 'babyboomer') {
      defs += `<linearGradient id="${id}bb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf7"/><stop offset=".38" stop-color="#fffaf7" stop-opacity=".85"/><stop offset=".8" stop-color="#fffaf7" stop-opacity="0"/></linearGradient>`;
      over += R() + 'bb)"/>';
    }
    if (o.finish === 'frances' || o.deco === 'micro') {
      const tipY = o.deco === 'micro' ? 10 : (H > 170 ? 54 : H > 130 ? 40 : 28);
      const depth = o.deco === 'micro' ? 10 : 18;
      over += `<path d="M-5 -5H105V${tipY + depth}Q50 ${tipY - depth} -5 ${tipY + depth}Z" fill="${col}"/>`;
    }
    if (o.deco === 'aura') {
      defs += `<radialGradient id="${id}au" cx=".5" cy=".58" r=".5"><stop offset="0" stop-color="${o.color2}"/><stop offset=".45" stop-color="${o.color2}" stop-opacity=".55"/><stop offset="1" stop-color="${o.color2}" stop-opacity="0"/></radialGradient>`;
      over += R() + 'au)"/>';
    }
    if (o.deco === 'cateye') {
      defs += `<linearGradient id="${id}ce" x1="0" y1=".15" x2="1" y2=".85"><stop offset=".3" stop-color="${o.color2}" stop-opacity="0"/><stop offset=".5" stop-color="${o.color2}" stop-opacity=".9"/><stop offset=".56" stop-color="#fff" stop-opacity=".7"/><stop offset=".72" stop-color="${o.color2}" stop-opacity="0"/></linearGradient>`;
      over += R() + 'ce)"/>';
    }
    if (o.deco === 'hearts' && (o.idx === 1 || o.idx === 3 || o.idx == null)) {
      over += `<path d="${HEART}" transform="translate(50 ${H * 0.46}) scale(1.35)" fill="${o.color2}"/>`;
    }
    if (o.deco === 'nubes') {
      const y = H * ((o.idx || 0) % 2 ? 0.55 : 0.38);
      over += `<g fill="#fff" opacity=".96"><circle cx="36" cy="${y + 4}" r="11"/><circle cx="52" cy="${y - 4}" r="15"/><circle cx="68" cy="${y + 5}" r="10"/><rect x="30" y="${y + 2}" width="44" height="12" rx="6"/></g>`;
      if ((o.idx || 0) % 2 === 0) over += `<path d="${HEART}" transform="translate(68 ${H * 0.66}) scale(.55)" fill="#f39ac0"/>`;
    }
    if (o.finish === 'cromo') {
      defs += `<linearGradient id="${id}k" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".2" stop-color="#fff" stop-opacity="0"/><stop offset=".4" stop-color="#ffe2f3" stop-opacity=".6"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset=".74" stop-color="#c4f2ff" stop-opacity=".5"/><stop offset=".9" stop-color="#fff6c8" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity=".55"/></linearGradient>`;
      over += `<rect x="-5" y="-5" width="110" height="${H + 10}" fill="#fff" opacity=".16"/>` + R() + 'k)"/>';
    }
    if (o.finish === 'glazed') {
      defs += `<radialGradient id="${id}g" cx=".42" cy=".38" r=".6"><stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/></radialGradient><linearGradient id="${id}gi" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd2ef" stop-opacity=".4"/><stop offset=".5" stop-color="#d4f4ff" stop-opacity=".3"/><stop offset="1" stop-color="#fff2c4" stop-opacity=".35"/></linearGradient>`;
      over += R() + 'gi)"/>' + R() + 'g)"/>';
    }
    if (o.finish === 'mate') {
      defs += `<radialGradient id="${id}m" cx=".42" cy=".4" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".16"/><stop offset="1" stop-color="#1c0f2e" stop-opacity=".1"/></radialGradient>`;
      over += R() + 'm)"/>';
    }
    // Curvatura: lados más oscuros y brillo de luz
    defs += `<linearGradient id="${id}sd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a1236" stop-opacity=".18"/><stop offset=".22" stop-color="#2a1236" stop-opacity="0"/><stop offset=".8" stop-color="#2a1236" stop-opacity="0"/><stop offset="1" stop-color="#2a1236" stop-opacity=".2"/></linearGradient>`;
    over += R() + 'sd)"/>';
    if (o.finish !== 'mate') {
      over += `<path d="M24 ${H - 44}V42Q24 24 34 16" fill="none" stroke="#fff" stroke-opacity=".62" stroke-width="7" stroke-linecap="round"/>`;
      over += `<path d="M76 ${Math.round(H * 0.34)}V${Math.round(H * 0.5)}" fill="none" stroke="#fff" stroke-opacity=".32" stroke-width="4" stroke-linecap="round"/>`;
    }
    return `<svg class="nail" viewBox="-4 -4 108 ${H + 14}" aria-hidden="true" focusable="false"><defs>${defs}</defs><path d="${d}" fill="${base}"/><g clip-path="url(#${id}c)">${over}</g><path d="${d}" fill="none" stroke="#2a1840" stroke-opacity=".32" stroke-width="1.6"/></svg>`;
  };

  // Cinco dedos: ancho relativo, altura y giro de cada punta
  NN.FINGERS = [{ w: 1.16, dy: 16, r: -9 }, { w: 0.96, dy: 4, r: -3 }, { w: 1.02, dy: 0, r: 0 }, { w: 0.94, dy: 5, r: 3 }, { w: 0.78, dy: 18, r: 9 }];
  NN.setHTML = (o) => NN.FINGERS.map((f, i) => `<div class="tip" style="--w:${f.w};--dy:${f.dy}px;--r:${f.r}deg;--k:${i}">${NN.nailSVG({ ...o, idx: i })}</div>`).join('');

  /* ---- Estimación de tiempo y precio de un diseño ---- */
  NN.TECH = { corta: { name: 'Gel semipermanente', svc: 'gel' }, media: { name: 'Polygel', svc: 'polygel' }, larga: { name: 'Acrílico esculpido', svc: 'acrilico' } };
  NN.estimate = (s) => {
    const base = NN.SERVICE[NN.TECH[s.length].svc];
    const tipDeco = s.deco === 'babyboomer' || s.deco === 'micro';
    const art = s.deco ? (tipDeco ? { min: 20, price: 90 } : { min: 20, price: 100 }) : { min: 0, price: 0 };
    const finish = tipDeco ? { min: 0, price: 0 } : NN.FINISHES[s.finish];
    return { tech: NN.TECH[s.length].name, min: base.min + finish.min + art.min, price: base.price + finish.price + art.price };
  };
  NN.describe = (s) => {
    const fin = s.look ? s.look : NN.FINISHES[s.finish].name.toLowerCase();
    return `${SHAPES[s.shape].name} ${s.length} en ${COLORS[s.color].name}, ${fin}`;
  };

  /* ---- Tarjeta de diseño (galería del inicio y de "Diseña tu set") ---- */
  NN.lookCard = (l, i, action) => {
    const e = NN.estimate({ ...l, look: l.name });
    return `<article class="look card lift rise" data-tag="${l.tag}">
      <div class="look-art" style="--bg:${l.bg}" aria-hidden="true">${NN.setHTML(l)}</div>
      <div class="look-body"><h3>${l.name}</h3><p class="look-meta">${l.tech} · ${e.min} min</p>
      <div class="look-foot"><strong>desde ${NN.money(e.price)}</strong>${action(i)}</div></div>
    </article>`;
  };
})();
