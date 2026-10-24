/* Nube Nácar · servicios: carta de precios generada desde data.js */
(() => {
  const NN = window.NN, $ = NN.$, G = NN.GROUPS;
  $('#menu-cols').innerHTML = [[G[0], G[1]], [G[2], G[3]]].map((col) => `<div>${col.map((g) => `
    <div class="menu-group"><h4>${g.g}</h4><ul>${g.items.map(([, name, sub, min, price, from]) => `
      <li class="mi"><div class="mi-top"><span class="mi-name">${name}</span><span class="mi-dots" aria-hidden="true"></span><span class="mi-price">${from ? 'desde ' : g.extra ? '+' : ''}${NN.money(price)}</span></div>
      <div class="mi-sub"><span>${sub}</span><span class="mi-dur">${g.extra ? '+' : ''}${min} min</span></div></li>`).join('')}</ul></div>`).join('')}</div>`).join('');
})();
