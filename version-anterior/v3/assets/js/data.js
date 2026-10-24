/* =====================================================================
   Nube Nácar · datos del negocio (servicios, equipo, horario, diseños)
   Edita aquí precios, horarios y nombres: todas las páginas los leen.
   ===================================================================== */
window.NN = window.NN || {};
(() => {
  const NN = window.NN;
  NN.money = (n) => '$' + n.toLocaleString('es-MX');

  /* ---- Servicios: [id, nombre, descripción, minutos, precio, "desde"] ---- */
  NN.GROUPS = [
    { g: 'Manos', items: [
      ['manicura-express', 'Manicura express', 'Limado, cutícula y esmalte tradicional', 30, 220],
      ['manicura-spa', 'Manicura spa', 'Exfoliación, mascarilla y masaje', 50, 340],
      ['gel', 'Gel semipermanente', 'Color que dura de 2 a 3 semanas', 60, 380],
      ['rubber', 'Rubber base', 'Nivela y fortalece tu uña natural', 75, 450],
      ['retiro', 'Retiro de gel o acrílico', 'Sin limar de más tu uña natural', 20, 120],
    ] },
    { g: 'Extensiones', items: [
      ['polygel', 'Polygel', 'Ligero y flexible, de largo natural a medio', 90, 620],
      ['acrilico', 'Acrílico esculpido', 'La mayor resistencia para largos XL', 120, 680],
      ['softgel', 'Soft gel con tips', 'Rápido, cómodo y fácil de retirar', 90, 590],
      ['relleno', 'Relleno', 'A las 2 o 3 semanas de tu set', 75, 450],
    ] },
    { g: 'Pies', items: [
      ['pedi-express', 'Pedicura express', 'Limado, cutícula y esmalte', 40, 280],
      ['pedi-spa', 'Pedicura spa con parafina', 'Exfoliación, parafina y masaje', 70, 460],
      ['pedi-gel', 'Gel en pies', 'Dura hasta 5 semanas', 50, 360],
    ] },
    { g: 'Arte y extras', extra: true, items: [
      ['x-frances', 'Francés o baby boomer', 'Por set completo', 20, 90],
      ['x-cromo', 'Cromo, perla o glazed', 'Por set completo', 15, 80],
      ['x-arte', 'Nail art a mano alzada', 'Por uña', 10, 25, true],
      ['x-charms', 'Pedrería y charms', 'Por pieza', 5, 15, true],
    ] },
  ];
  NN.SERVICE = {};
  NN.GROUPS.forEach((g) => g.items.forEach(([id, name, sub, min, price, from]) => {
    NN.SERVICE[id] = { id, name, sub, min, price, from: !!from, extra: !!g.extra };
  }));

  /* ---- Equipo ---- */
  NN.TEAM = [
    { id: 'valeria', name: 'Valeria Ríos', ini: 'VR', role: 'Fundadora y nail artist principal', tags: ['Acrílico esculpido', 'Francés'], years: 9, h1: '#ffe4f1', h2: '#d8c6fb' },
    { id: 'camila', name: 'Camila Ortega', ini: 'CO', role: 'Nail art a mano alzada', tags: ['Pintura a mano', 'Aura y cromo'], years: 6, h1: '#fff0dc', h2: '#f7c4ad' },
    { id: 'renata', name: 'Renata Soto', ini: 'RS', role: 'Pedicura spa', tags: ['Parafina', 'Gel en pies'], years: 7, h1: '#e6f5ff', h2: '#bfd0f8' },
    { id: 'daniela', name: 'Daniela Paz', ini: 'DP', role: 'Uña natural y polygel', tags: ['Rubber base', 'Polygel'], years: 4, h1: '#effde6', h2: '#c8e6c0' },
  ];

  /* ---- Diseños de la galería ---- */
  NN.LOOKS = [
    { name: 'Cromo perla', tag: 'efectos', tech: 'Polygel + cromo', shape: 'almendra', length: 'media', color: 'leche', finish: 'cromo', bg: 'linear-gradient(160deg,#efe8ff,#fde7f1)' },
    { name: 'Baby boomer', tag: 'minimal', tech: 'Rubber base + degradado', shape: 'bailarina', length: 'media', color: 'leche', finish: 'brillo', deco: 'babyboomer', bg: 'linear-gradient(160deg,#fbeee8,#f3e3ef)' },
    { name: 'Aura lila', tag: 'arte', tech: 'Gel + aerógrafo', shape: 'ovalada', length: 'media', color: 'lila', finish: 'brillo', deco: 'aura', color2: '#f48cc0', bg: 'linear-gradient(160deg,#e9e3ff,#ffe3f0)' },
    { name: 'Corazones', tag: 'arte', tech: 'Gel + arte a mano', shape: 'almendra', length: 'corta', color: 'nude', finish: 'brillo', deco: 'hearts', color2: '#a3133b', bg: 'linear-gradient(160deg,#fde9e3,#f8dde6)' },
    { name: 'Francés micro', tag: 'minimal', tech: 'Rubber base', shape: 'squoval', length: 'corta', color: 'leche', finish: 'brillo', deco: 'micro', bg: 'linear-gradient(160deg,#f7efea,#efe9f7)' },
    { name: 'Cat eye noche', tag: 'efectos', tech: 'Acrílico + gel magnético', shape: 'stiletto', length: 'larga', color: 'noche', finish: 'brillo', deco: 'cateye', color2: '#c9b6ff', bg: 'linear-gradient(160deg,#dcd6f5,#f3dff0)' },
    { name: 'Nubes', tag: 'arte', tech: 'Polygel + arte a mano', shape: 'ovalada', length: 'media', color: 'cielo', finish: 'brillo', deco: 'nubes', bg: 'linear-gradient(160deg,#e2ecff,#fde6ee)' },
    { name: 'Glazed fresa', tag: 'efectos', tech: 'Polygel + glazed', shape: 'almendra', length: 'media', color: 'fresa', finish: 'glazed', bg: 'linear-gradient(160deg,#ffe4ef,#f1e6ff)' },
  ];

  /* ---- Horario y disponibilidad (de ejemplo) ---- */
  NN.DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  NN.HOURS = { 0: [10, 15], 1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 21], 6: [9, 19] };
  NN.hh = (h) => String(h).padStart(2, '0') + ':00';
  NN.iso = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  NN.parseISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

  const SLOTS = ['10:00', '11:30', '13:00', '15:30', '17:00', '18:30'];
  // Horarios ocupados simulados: cambian por fecha pero siempre igual para la misma fecha
  NN.slotsFor = (dateStr) => {
    const dt = NN.parseISO(dateStr);
    const list = dt.getDay() === 0 ? SLOTS.slice(0, 3) : SLOTS;
    let h = 0; for (const ch of dateStr) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const taken = new Set([h % list.length, (h >>> 4) % list.length]);
    const isToday = dateStr === NN.iso(new Date());
    const nowH = new Date().getHours() + new Date().getMinutes() / 60 + 1;
    return list.map((s, i) => {
      const [H, M] = s.split(':').map(Number);
      return { time: s, free: !taken.has(i) && !(isToday && H + M / 60 < nowH) };
    });
  };
  NN.nextFree = () => {
    for (let k = 0; k < 14; k++) {
      const dt = new Date(); dt.setDate(dt.getDate() + k);
      const s = NN.slotsFor(NN.iso(dt)).find((x) => x.free);
      if (s) return { date: NN.iso(dt), time: s.time, k };
    }
    return null;
  };
  NN.dayLabel = (nf) => (nf.k === 0 ? 'Hoy' : nf.k === 1 ? 'Mañana' : NN.DAYS[NN.parseISO(nf.date).getDay()]);
})();
