/* Nube Nácar · servicios: la carta con pestañas */
(() => {
  const NN = window.NN, $ = NN.$, $$ = NN.$$;
  const tabs = $('#tabs'), list = $('#menu-list');
  tabs.innerHTML = NN.GROUPS.map((g, k) => `<button type="button" role="tab" id="tab-${g.id}" aria-controls="menu-list" aria-selected="${k === 0}">${g.g}</button>`).join('');
  const render = (g) => {
    list.innerHTML = g.items.map(([, name, sub, min, price, from]) => `<li class="mi">
      <div class="mi-top"><span class="mi-name">${name}</span><span class="mi-dots" aria-hidden="true"></span><span class="mi-price">${from ? 'desde ' : g.extra ? '+ ' : ''}${NN.money(price)}</span></div>
      <div class="mi-sub"><em>${sub}</em><span>${g.extra ? '+' : ''}${min} min</span></div></li>`).join('');
    list.setAttribute('aria-labelledby', 'tab-' + g.id);
    list.classList.remove('enter'); void list.offsetWidth; list.classList.add('enter');
  };
  tabs.addEventListener('click', (ev) => {
    const b = ev.target.closest('[role="tab"]'); if (!b) return;
    $$('[role="tab"]', tabs).forEach((t) => t.setAttribute('aria-selected', String(t === b)));
    render(NN.GROUPS.find((g) => 'tab-' + g.id === b.id));
  });
  tabs.addEventListener('keydown', (ev) => {
    if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
    const all = $$('[role="tab"]', tabs), k = all.indexOf(document.activeElement);
    const next = all[(k + (ev.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length];
    next.focus(); next.click();
  });
  const want = new URLSearchParams(location.search).get('carta');
  const first = NN.GROUPS.find((g) => g.id === want) || NN.GROUPS[0];
  $$('[role="tab"]', tabs).forEach((t) => t.setAttribute('aria-selected', String(t.id === 'tab-' + first.id)));
  render(first);
})();
