/* Nube Nácar · inspiración: test "Encuentra tu set" y guía de formas */
(() => {
  const NN = window.NN, $ = NN.$, $$ = NN.$$;

  /* ---- Guía de formas ---- */
  $('#shapes').innerHTML = Object.values(NN.SHAPES).map((s) => `<div class="shape reveal">
    <svg viewBox="-4 -4 108 166" aria-hidden="true"><path d="${s.d(152)}" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>
    <h3>${s.name}</h3><p>${s.tip}</p></div>`).join('');

  /* ---- Test ---- */
  const Q = [
    { q: '¿Cómo es tu día a día?', o: [['activa', 'Manos muy ocupadas', 'Teclado, deporte, niños'], ['oficina', 'Oficina y reuniones', 'Quiero verme pulida'], ['eventos', 'Eventos y salidas', 'Me gusta lucirlas'], ['cambio', 'Cambio seguido', 'Un color nuevo cada vez']] },
    { q: '¿Qué largo te imaginas?', o: [['natural', 'Natural', 'Mi propia uña, fuerte'], ['corto', 'Corto elegante', 'Apenas sobre la yema'], ['medio', 'Medio', 'Femenino y cómodo'], ['largo', 'Largo', 'Dramático y escultural']] },
    { q: '¿Qué palabra te describe mejor?', o: [['clasica', 'Clásica', 'Lo atemporal nunca falla'], ['romantica', 'Romántica', 'Rosas, perlas y brillo'], ['atrevida', 'Atrevida', 'Color intenso y forma marcada'], ['minimal', 'Minimal', 'Menos, pero perfecto']] },
  ];
  const answers = [];
  const box = $('#quiz-box'), bars = $$('#quiz-progress span');

  function result() {
    const [dia, largo, estilo] = answers;
    let svc = { natural: 'rubber', corto: 'gel', medio: 'polygel', largo: 'acrilico' }[largo];
    if (dia === 'activa' && largo !== 'largo') svc = largo === 'medio' ? 'softgel' : 'rubber';
    if (dia === 'cambio' && (largo === 'natural' || largo === 'corto')) svc = 'gel';
    const shape = { clasica: 'squoval', romantica: 'almendra', atrevida: largo === 'largo' ? 'stiletto' : 'cuadrada', minimal: 'ovalada' }[estilo];
    const tone = NN.TONE[{ clasica: 'rosa-te', romantica: 'peonia', atrevida: 'cereza', minimal: 'porcelana' }[estilo]];
    const s = NN.SERVICE[svc];
    const nota = `Mi set ideal: ${s.name}, forma ${NN.SHAPES[shape].name.toLowerCase()}, tono ${tone.name} (${tone.finish.toLowerCase()}).`;
    const q = new URLSearchParams({ servicio: svc, tono: tone.id, nota });
    return `<div class="q-step enter">
      <p class="q-count">Tu resultado</p>
      <div class="q-result">
        <div class="q-result-art" aria-hidden="true">${NN.trio(tone.hex, shape)}</div>
        <div>
          <h3>${s.name} en <em>${tone.name}</em></h3>
          <dl>
            <div><dt>Forma</dt><dd>${NN.SHAPES[shape].name}</dd></div>
            <div><dt>Acabado</dt><dd>${tone.finish}</dd></div>
            <div><dt>Tiempo</dt><dd>${s.min} min aprox.</dd></div>
            <div><dt>Desde</dt><dd>${NN.money(s.price)}</dd></div>
          </dl>
          <div class="cta-row"><a class="btn btn-solid" href="reservar.html?${q}">Reservar este set</a><button class="q-back" type="button" data-restart>Volver a empezar</button></div>
        </div>
      </div>
    </div>`;
  }
  function render() {
    const k = answers.length;
    bars.forEach((b, i) => b.classList.toggle('on', i < k));
    if (k >= Q.length) { box.innerHTML = result(); return; }
    const step = Q[k];
    box.innerHTML = `<div class="q-step enter">
      <p class="q-count">Pregunta ${k + 1} de ${Q.length}</p>
      <h3>${step.q}</h3>
      <div class="q-options">${step.o.map(([v, t, s]) => `<button class="q-opt" type="button" data-v="${v}"><b>${t}</b><span>${s}</span></button>`).join('')}</div>
      ${k ? '<button class="q-back" type="button" data-back>← Pregunta anterior</button>' : ''}
    </div>`;
  }
  box.addEventListener('click', (ev) => {
    const opt = ev.target.closest('[data-v]');
    if (opt) { answers.push(opt.dataset.v); render(); return; }
    if (ev.target.closest('[data-back]')) { answers.pop(); render(); return; }
    if (ev.target.closest('[data-restart]')) { answers.length = 0; render(); }
  });
  render();
})();
