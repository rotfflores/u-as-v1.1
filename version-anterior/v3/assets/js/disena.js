/* Nube Nácar · diseñador de uñas y galería completa */
(() => {
  const NN = window.NN, $ = NN.$, $$ = NN.$$;
  const { SHAPES, LENGTHS, COLORS, FINISHES } = NN;
  const state = { shape: 'almendra', length: 'media', color: 'lila', finish: 'cromo', deco: null, color2: null, look: null };

  /* ---- Controles ---- */
  const shapeIcon = (k) => `<svg viewBox="0 0 100 170" aria-hidden="true"><path d="${SHAPES[k].d(152)}" fill="none" stroke="currentColor" stroke-width="9"/></svg>`;
  $('#shape-chips').innerHTML = Object.entries(SHAPES).map(([k, s]) => `<label class="chip"><input type="radio" name="shape" value="${k}"><span>${shapeIcon(k)}${s.name}</span></label>`).join('');
  $('#length-chips').innerHTML = Object.entries(LENGTHS).map(([k, s]) => `<label class="chip"><input type="radio" name="length" value="${k}"><span>${s.name}</span></label>`).join('');
  $('#swatches').innerHTML = Object.entries(COLORS).map(([k, c]) => `<label class="swatch" title="${c.name}"><input type="radio" name="color" value="${k}" aria-label="${c.name}"><span style="--c:${c.hex}"></span></label>`).join('');
  $('#finish-chips').innerHTML = Object.entries(FINISHES).map(([k, f]) => `<label class="chip"><input type="radio" name="finish" value="${k}"><span>${f.name}</span></label>`).join('');

  function render(animate) {
    const board = $('#board');
    board.innerHTML = NN.setHTML(state);
    if (animate) { board.classList.remove('pop'); void board.offsetWidth; board.classList.add('pop'); }
    for (const key of ['shape', 'length', 'color', 'finish']) {
      const input = $(`#studio input[name="${key}"][value="${state[key]}"]`);
      if (input) input.checked = true;
    }
    $('#out-shape').textContent = SHAPES[state.shape].name;
    $('#out-length').textContent = LENGTHS[state.length].name;
    $('#out-color').textContent = COLORS[state.color].name;
    $('#out-finish').textContent = state.look ? state.look : FINISHES[state.finish].name;
    $('#studio-caption').textContent = NN.describe(state);
    const e = NN.estimate(state);
    $('#est-tech').textContent = e.tech;
    $('#est-time').textContent = e.min + ' min';
    $('#est-price').textContent = NN.money(e.price);
  }
  $('#studio').addEventListener('change', (ev) => {
    const { name, value } = ev.target;
    if (!(name in state)) return;
    state[name] = value;
    if (name === 'finish' || name === 'shape') { state.deco = null; state.look = null; state.color2 = null; }
    render(true);
  });

  // "Sorpréndeme": combinación al azar
  const pick = (o) => { const k = Object.keys(o); return k[Math.floor(Math.random() * k.length)]; };
  $('#random').addEventListener('click', () => {
    Object.assign(state, { shape: pick(SHAPES), length: pick(LENGTHS), color: pick(COLORS), finish: pick(FINISHES), deco: null, color2: null, look: null });
    render(true);
    NN.say('¡Listo! ' + NN.describe(state));
  });

  /* ---- Galería ---- */
  $('#looks').innerHTML = NN.LOOKS.map((l, i) => NN.lookCard(l, i, (k) => `<button class="link-btn" type="button" data-look="${k}">Probar diseño</button>`)).join('');
  const loadLook = (i, scroll) => {
    const l = NN.LOOKS[i];
    if (!l) return;
    Object.assign(state, { shape: l.shape, length: l.length, color: l.color, finish: l.finish, deco: l.deco || null, color2: l.color2 || null, look: l.deco ? l.name.toLowerCase() : null });
    render(true);
    if (scroll) $('#disenador').scrollIntoView({ behavior: NN.reduce ? 'auto' : 'smooth' });
  };
  $('#looks').addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-look]');
    if (btn) loadLook(+btn.dataset.look, true);
  });
  $('#filters').addEventListener('click', (ev) => {
    const btn = ev.target.closest('button[data-filter]');
    if (!btn) return;
    $$('#filters button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    const f = btn.dataset.filter;
    $$('#looks .look').forEach((el) => { el.hidden = f !== 'todos' && el.dataset.tag !== f; });
  });

  /* ---- Mandar el diseño a la página de reservas ---- */
  $('#use-design').addEventListener('click', () => {
    const extras = [];
    if (state.finish === 'frances' || state.deco === 'babyboomer' || state.deco === 'micro') extras.push('x-frances');
    if (state.finish === 'cromo' || state.finish === 'glazed') extras.push('x-cromo');
    const q = new URLSearchParams({
      servicio: NN.TECH[state.length].svc,
      extras: extras.join(','),
      diseno: [state.shape, state.length, state.color, state.finish, state.deco || '-', state.color2 || '-'].join('.'),
      nota: `Diseño: ${NN.describe(state)}.`,
    });
    location.href = 'reservar.html?' + q.toString();
  });

  const fromUrl = new URLSearchParams(location.search).get('look');
  if (fromUrl !== null && NN.LOOKS[+fromUrl]) loadLook(+fromUrl, false);
  else render(false);
})();
