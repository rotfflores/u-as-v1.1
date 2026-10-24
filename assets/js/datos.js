/* =====================================================================
   Nube Nácar · datos del negocio
   Cambia aquí precios, tonos, equipo y horario: todas las páginas los leen.
   ===================================================================== */
window.NN = window.NN || {};
(() => {
  const NN = window.NN;
  NN.money = (n) => '$' + n.toLocaleString('es-MX');

  /* ---- Carta de servicios: [id, nombre, descripción, minutos, precio, "desde"] ---- */
  NN.GROUPS = [
    { id: 'manos', g: 'Manos', items: [
      ['manicura', 'Manicura atelier', 'Limado, cutícula, exfoliación y esmalte clásico', 40, 260],
      ['gel', 'Gel semipermanente', 'Color impecable de 2 a 3 semanas', 60, 380],
      ['rubber', 'Rubber base', 'Nivela y fortalece tu uña natural', 75, 450],
      ['rusa', 'Manicura rusa', 'Cutícula en seco, acabado limpio y preciso', 90, 520],
      ['retiro', 'Retiro cuidadoso', 'Sin limar de más tu uña natural', 20, 120],
    ] },
    { id: 'extensiones', g: 'Extensiones', items: [
      ['polygel', 'Polygel', 'Ligero y flexible, de natural a medio', 90, 620],
      ['softgel', 'Soft gel', 'Rápido, cómodo y fácil de retirar', 90, 590],
      ['acrilico', 'Acrílico esculpido', 'La mayor resistencia para largos XL', 120, 680],
      ['relleno', 'Relleno', 'A las 2 o 3 semanas de tu set', 75, 450],
    ] },
    { id: 'pies', g: 'Pies', items: [
      ['pedicura', 'Pedicura atelier', 'Limado, cutícula y esmalte', 45, 300],
      ['pedi-spa', 'Pedicura spa', 'Exfoliación, parafina tibia y masaje', 70, 460],
      ['pedi-gel', 'Gel en pies', 'Dura hasta 5 semanas', 50, 360],
    ] },
    { id: 'arte', g: 'Arte y extras', extra: true, items: [
      ['x-frances', 'Francés o baby boomer', 'Por set completo', 20, 90],
      ['x-cromo', 'Cromo, perla o glazed', 'Por set completo', 15, 80],
      ['x-arte', 'Arte a mano alzada', 'Por uña', 10, 25, true],
      ['x-joya', 'Joyería y perlas', 'Por pieza', 5, 15, true],
    ] },
  ];
  NN.SERVICE = {};
  NN.GROUPS.forEach((g) => g.items.forEach(([id, name, sub, min, price, from]) => {
    NN.SERVICE[id] = { id, name, sub, min, price, from: !!from, extra: !!g.extra, group: g.g };
  }));

  /* ---- Carta de color de la temporada ---- */
  NN.TONES = [
    { id: 'porcelana', name: 'Porcelana', hex: '#f1e4da', group: 'Nudes', finish: 'Glazed', mood: 'Minimal y luminosa' },
    { id: 'arena', name: 'Arena', hex: '#e2c3ae', group: 'Nudes', finish: 'Brillo', mood: 'Todos los días' },
    { id: 'rosa-te', name: 'Rosa té', hex: '#d6a197', group: 'Nudes', finish: 'Brillo o francés', mood: 'Oficina y novias' },
    { id: 'caramelo', name: 'Caramelo', hex: '#b5826a', group: 'Nudes', finish: 'Mate', mood: 'Otoño cálido' },
    { id: 'peonia', name: 'Peonía', hex: '#e6a0ad', group: 'Rosas', finish: 'Cromo perla', mood: 'Romántica' },
    { id: 'rosa-antiguo', name: 'Rosa antiguo', hex: '#b5717a', group: 'Rosas', finish: 'Brillo', mood: 'Clásica con carácter' },
    { id: 'coral', name: 'Coral suave', hex: '#e38c7b', group: 'Rosas', finish: 'Brillo', mood: 'Vacaciones' },
    { id: 'lila', name: 'Lila nube', hex: '#b7a5e2', group: 'Rosas', finish: 'Cromo perla', mood: 'Soñadora' },
    { id: 'cereza', name: 'Cereza', hex: '#7d1d2f', group: 'Profundos', finish: 'Brillo', mood: 'Noche y fiesta' },
    { id: 'ciruela', name: 'Ciruela', hex: '#4f2a3f', group: 'Profundos', finish: 'Mate', mood: 'Elegante y misteriosa' },
    { id: 'terracota', name: 'Terracota', hex: '#a65a3f', group: 'Profundos', finish: 'Brillo', mood: 'Cálida y segura' },
    { id: 'noche', name: 'Noche', hex: '#2d2a45', group: 'Profundos', finish: 'Cat eye', mood: 'Atrevida' },
  ];
  NN.TONE = Object.fromEntries(NN.TONES.map((t) => [t.id, t]));

  /* ---- Tono del día: colorea los títulos en cursiva de todo el sitio ---- */
  NN.ACCENTS = [
    { id: 'rosa', name: 'Rosa antiguo', hex: '#8f5a52' },
    { id: 'cereza', name: 'Cereza', hex: '#8e1f36' },
    { id: 'terracota', name: 'Terracota', hex: '#9a4f37' },
    { id: 'ciruela', name: 'Ciruela', hex: '#5e3550' },
    { id: 'noche', name: 'Noche', hex: '#3a3560' },
  ];

  /* ---- Equipo ---- */
  NN.TEAM = [
    { id: 'valeria', name: 'Valeria Ríos', ini: 'V', role: 'Fundadora y directora creativa', spec: 'Acrílico esculpido y francés', years: 9, tint: '#ecdccf' },
    { id: 'camila', name: 'Camila Ortega', ini: 'C', role: 'Nail artist', spec: 'Arte a mano alzada y cromo', years: 6, tint: '#efe0dd' },
    { id: 'renata', name: 'Renata Soto', ini: 'R', role: 'Especialista en pies', spec: 'Pedicura spa y parafina', years: 7, tint: '#e4e0e9' },
    { id: 'daniela', name: 'Daniela Paz', ini: 'D', role: 'Nail artist', spec: 'Manicura rusa y rubber base', years: 4, tint: '#e6e2d6' },
  ];

  /* ---- Opiniones (de ejemplo) ---- */
  NN.QUOTES = [
    ['Llevo tres semanas con el gel y no se ha levantado ni una esquina. Se nota el cuidado en cada detalle.', 'Mariana G.', 'Gel semipermanente'],
    ['Llevé una foto de cromo perla y quedó idéntico. El lugar es precioso y la atención, impecable.', 'Sofía L.', 'Polygel con cromo'],
    ['Abren el kit esterilizado frente a ti. La pedicura con parafina vale cada peso.', 'Andrea M.', 'Pedicura spa'],
    ['Se me rompió una uña al cuarto día y me la repararon sin costo, con una sonrisa.', 'Lucía R.', 'Acrílico esculpido'],
  ];

  /* ---- Horario y disponibilidad (simulada) ---- */
  NN.DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  NN.HOURS = { 0: [10, 15], 1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 21], 6: [9, 19] };
  NN.hh = (h) => String(h).padStart(2, '0') + ':00';
  NN.iso = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  NN.parseISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const SLOTS = ['10:00', '11:30', '13:00', '15:30', '17:00', '18:30'];
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

  /* ---- Formas de uña (contorno SVG; H = largo en unidades) ---- */
  NN.SHAPES = {
    almendra: { name: 'Almendra', tip: 'Alarga los dedos', d: (H) => `M10 ${H - 22}L10 60C10 34 36 9 50 3C64 9 90 34 90 60L90 ${H - 22}Q50 ${H + 8} 10 ${H - 22}Z` },
    ovalada: { name: 'Ovalada', tip: 'Suave y femenina', d: (H) => `M8 ${H - 22}L8 50C8 20 28 3 50 3C72 3 92 20 92 50L92 ${H - 22}Q50 ${H + 8} 8 ${H - 22}Z` },
    squoval: { name: 'Squoval', tip: 'La más resistente', d: (H) => `M8 ${H - 22}L8 26Q8 4 30 4L70 4Q92 4 92 26L92 ${H - 22}Q50 ${H + 8} 8 ${H - 22}Z` },
    cuadrada: { name: 'Cuadrada', tip: 'Ideal para francés', d: (H) => `M8 ${H - 22}L8 12Q8 4 16 4L84 4Q92 4 92 12L92 ${H - 22}Q50 ${H + 8} 8 ${H - 22}Z` },
    bailarina: { name: 'Bailarina', tip: 'Moderna y elegante', d: (H) => `M8 ${H - 22}L8 54L25 8Q27 4 32 4L68 4Q73 4 75 8L92 54L92 ${H - 22}Q50 ${H + 8} 8 ${H - 22}Z` },
    stiletto: { name: 'Stiletto', tip: 'Para atreverse', d: (H) => `M12 ${H - 22}L12 74C12 50 42 14 50 0C58 14 88 50 88 74L88 ${H - 22}Q50 ${H + 8} 12 ${H - 22}Z` },
  };

  /* ---- Uña pulida en SVG (carta de color y resultado del test) ---- */
  let gid = 0;
  NN.nail = (hex, shape = 'almendra', H = 152) => {
    const d = NN.SHAPES[shape].d(H), id = 'n' + (++gid);
    return `<svg class="nail" viewBox="-4 -4 108 ${H + 14}" aria-hidden="true" focusable="false"><defs>
      <linearGradient id="${id}a" x1="0" x2="1"><stop offset="0" stop-color="#1c1210" stop-opacity=".26"/><stop offset=".28" stop-color="#1c1210" stop-opacity="0"/><stop offset=".72" stop-color="#1c1210" stop-opacity="0"/><stop offset="1" stop-color="#1c1210" stop-opacity=".3"/></linearGradient>
      <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1c1210" stop-opacity=".12"/></linearGradient>
      <clipPath id="${id}c"><path d="${d}"/></clipPath></defs>
      <path class="fill" d="${d}" fill="${hex}"/>
      <g clip-path="url(#${id}c)"><rect x="-4" y="-4" width="108" height="${H + 14}" fill="url(#${id}a)"/><rect x="-4" y="-4" width="108" height="${H + 14}" fill="url(#${id}b)"/>
      <path d="M27 ${H - 40}V56Q27 32 40 20" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="7" stroke-linecap="round"/>
      <path d="M74 ${Math.round(H * .36)}V${Math.round(H * .52)}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="4" stroke-linecap="round"/></g></svg>`;
  };
  NN.trio = (hex, shape) => [['-9deg', '10%'], ['0deg', '0%'], ['9deg', '10%']]
    .map(([r, y]) => NN.nail(hex, shape).replace('class="nail"', `class="nail" style="--r:${r};--y:${y}"`)).join('');
})();
