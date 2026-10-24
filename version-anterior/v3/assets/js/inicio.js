/* Nube Nácar · página de inicio: abanico de colores, diseños destacados y opiniones */
(() => {
  const NN = window.NN, $ = NN.$;

  const fanTips = [['lila', 'cromo'], ['fresa', 'glazed'], ['durazno', 'brillo'], ['leche', 'cromo'], ['cielo', 'brillo'], ['malva', 'mate'], ['cereza', 'brillo']];
  $('#fan').innerHTML = fanTips.map(([color, finish], i) =>
    `<div class="stick" style="--a:${-54 + i * 18}deg;--i:${i}"><div class="stick-in">${NN.nailSVG({ shape: 'almendra', length: 'media', color, finish })}</div></div>`).join('');

  const arrow = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5.5 15.5 10 11 14.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  $('#looks-teaser').innerHTML = [0, 2, 5, 6].map((i) => NN.lookCard(NN.LOOKS[i], i,
    (k) => `<a class="link-arrow" href="disena.html?look=${k}">Probar ${arrow}</a>`)).join('');

  // Distribución de 1,284 reseñas de ejemplo
  const dist = [[5, 1172], [4, 82], [3, 19], [2, 7], [1, 4]];
  const total = dist.reduce((a, [, n]) => a + n, 0);
  $('#bars').innerHTML = dist.map(([s, n]) => {
    const pct = (n / total) * 100;
    return `<div class="bar"><span>${s} ★</span><span class="bar-track"><span class="bar-fill" style="width:${pct.toFixed(1)}%"></span></span><span>${pct < 1 ? '<1' : Math.round(pct)}%</span></div>`;
  }).join('');
})();
