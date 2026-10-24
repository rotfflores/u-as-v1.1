/* Nube Nácar · reservas: formulario de demostración, horario y datos de contacto */
(() => {
  const NN = window.NN, $ = NN.$, $$ = NN.$$;
  const S = NN.SERVICE;
  const form = $('#booking-form'), sel = $('#f-service'), dateIn = $('#f-date'), artist = $('#f-artist');

  /* ---- Opciones ---- */
  sel.innerHTML = '<option value="">Elige un servicio</option>' + NN.GROUPS.filter((g) => !g.extra).map((g) =>
    `<optgroup label="${g.g}">${g.items.map(([id, name, , , price]) => `<option value="${id}">${name} · ${NN.money(price)}</option>`).join('')}</optgroup>`).join('');
  artist.insertAdjacentHTML('beforeend', NN.TEAM.map((m) => `<option value="${m.id}">${m.name}</option>`).join(''));
  $('#extras').innerHTML = ['x-frances', 'x-cromo'].map((id) => `<label class="chip"><input type="checkbox" name="extra" value="${id}"><span>${S[id].name} · +${NN.money(S[id].price)}</span></label>`).join('');
  dateIn.min = NN.iso(new Date());
  dateIn.value = NN.next ? NN.next.date : NN.iso(new Date());

  /* ---- Lo que llega desde otras páginas (?servicio=&extras=&artista=&nota=&diseno=) ---- */
  const q = new URLSearchParams(location.search);
  if (S[q.get('servicio')] && !S[q.get('servicio')].extra) sel.value = q.get('servicio');
  if (q.get('artista')) artist.value = q.get('artista');
  (q.get('extras') || '').split(',').forEach((id) => { const i = form.querySelector(`input[name="extra"][value="${id}"]`); if (i) i.checked = true; });
  if (q.get('nota')) $('#f-notes').value = q.get('nota').slice(0, 300);
  const d = (q.get('diseno') || '').split('.');
  if (NN.SHAPES[d[0]] && NN.LENGTHS[d[1]] && NN.COLORS[d[2]] && NN.FINISHES[d[3]]) {
    const DECOS = ['babyboomer', 'micro', 'aura', 'cateye', 'hearts', 'nubes'];
    const deco = DECOS.includes(d[4]) ? d[4] : null;
    const color2 = /^#[0-9a-f]{3,8}$/i.test(d[5] || '') ? d[5] : '#f48cc0';
    const o = { shape: d[0], length: d[1], color: d[2], finish: d[3], deco, color2 };
    $('#design-set').innerHTML = NN.setHTML(o);
    $('#design-text').textContent = NN.describe(o);
    $('#design-note').hidden = false;
  }

  /* ---- Horarios disponibles y resumen ---- */
  function renderSlots() {
    const keep = form.querySelector('input[name="slot"]:checked')?.value;
    const list = dateIn.value ? NN.slotsFor(dateIn.value) : [];
    $('#slots').innerHTML = list.map((s) => `<label class="chip"><input type="radio" name="slot" value="${s.time}" ${s.free ? '' : 'disabled'} ${s.free && s.time === keep ? 'checked' : ''}><span>${s.time}</span></label>`).join('') || '<span class="hint">Elige una fecha.</span>';
  }
  const fmtDate = (s) => NN.parseISO(s).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' });
  function renderSummary() {
    const svc = S[sel.value];
    const extras = $$('input[name="extra"]:checked', form).map((i) => S[i.value]);
    const min = (svc ? svc.min : 0) + extras.reduce((a, e) => a + e.min, 0);
    const price = (svc ? svc.price : 0) + extras.reduce((a, e) => a + e.price, 0);
    $('#s-service').textContent = svc ? [svc.name, ...extras.map((e) => e.name.split(' ')[0].toLowerCase())].join(' + ') : '—';
    $('#s-time').textContent = svc ? `${min} min aprox.` : '—';
    $('#s-artist').textContent = artist.value ? artist.options[artist.selectedIndex].text : 'Sin preferencia';
    $('#s-date').textContent = dateIn.value ? fmtDate(dateIn.value) : '—';
    $('#s-slot').textContent = form.querySelector('input[name="slot"]:checked')?.value || 'Por elegir';
    $('#s-total').textContent = NN.money(price);
  }
  const flash = () => { const s = $('#summary'); s.classList.remove('flash'); void s.offsetWidth; s.classList.add('flash'); };

  form.addEventListener('change', (ev) => {
    if (ev.target === dateIn) renderSlots();
    if (ev.target.name === 'slot') $('#slot-err').hidden = true;
    $('#done').hidden = true;
    renderSummary();
  });
  form.addEventListener('input', () => { $('#done').hidden = true; });
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const slot = form.querySelector('input[name="slot"]:checked');
    $('#slot-err').hidden = !!slot;
    if (!form.checkValidity() || !slot) {
      const bad = form.querySelector(':invalid') || $('#slots input:not(:disabled)');
      if (bad) bad.focus();
      form.reportValidity();
      return;
    }
    const name = $('#f-name').value.trim().split(' ')[0];
    $('#done-title').textContent = `¡Solicitud lista, ${name}!`;
    $('#done-text').textContent = `${$('#s-service').textContent} el ${$('#s-date').textContent} a las ${slot.value}. En el sitio real, aquí la recibiría el salón y te confirmaría por WhatsApp.`;
    $('#done').hidden = false;
    flash();
    if (matchMedia('(max-width: 920px)').matches) $('#summary').scrollIntoView({ behavior: NN.reduce ? 'auto' : 'smooth', block: 'start' });
  });

  /* ---- Horario de la semana ---- */
  const today = new Date().getDay();
  $('#hours tbody').innerHTML = [1, 2, 3, 4, 5, 6, 0].map((day) =>
    `<tr class="${day === today ? 'today' : ''}"><td>${NN.DAYS[day]}</td><td>${NN.hh(NN.HOURS[day][0])} a ${NN.hh(NN.HOURS[day][1])}</td></tr>`).join('');

  renderSlots();
  renderSummary();
  if (q.get('servicio') || q.get('artista')) flash();
})();
