/* Nube Nácar · carta de color interactiva (inicio e inspiración) */
(() => {
  const NN = window.NN, $ = NN.$;
  const root = $('#carta');
  if (!root) return;
  const stage = $('.carta-stage', root);
  stage.insertAdjacentHTML('beforeend', NN.trio(NN.TONES[5].hex, 'almendra'));
  const groups = [...new Set(NN.TONES.map((t) => t.group))];
  $('#swatches', root).innerHTML = groups.map((g) => `<div class="swatch-group"><h4>${g}</h4><div class="swatches">${
    NN.TONES.filter((t) => t.group === g).map((t) => `<button type="button" class="swatch" data-tone="${t.id}" style="--c:${t.hex}" aria-pressed="false" aria-label="${t.name}" title="${t.name}"></button>`).join('')}</div></div>`).join('');

  const pick = (t) => {
    stage.querySelectorAll('path.fill').forEach((p) => p.setAttribute('fill', t.hex));
    $('#tone-name', root).textContent = t.name;
    $('#tone-finish', root).textContent = t.finish;
    $('#tone-mood', root).textContent = t.mood;
    $('#tone-book', root).href = `reservar.html?tono=${t.id}`;
    root.querySelectorAll('.swatch').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tone === t.id)));
  };
  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-tone]');
    if (b) pick(NN.TONE[b.dataset.tone]);
  });
  pick(NN.TONES[5]);
})();
